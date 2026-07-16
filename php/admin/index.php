<?php
// Admin panel front controller. Pages via ?p=, mutations via POST action=.
require_once __DIR__ . '/lib_admin.php';
require_once __DIR__ . '/xlsx.php';

// ------------------------------------------------------------------ POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? '';

  if ($action === 'login') {
    if (admin_attempt_login($_POST['email'] ?? '', $_POST['password'] ?? '')) redirect('?p=dashboard');
    flash('Wrong admin email or password.');
    redirect('?p=login');
  }

  // Everything below requires an admin session + CSRF.
  require_admin();
  check_csrf();

  switch ($action) {
    case 'add_user':      action_add_user(); break;
    case 'save_user':     action_save_user(); break;
    case 'reset_password':action_reset_password(); break;
    case 'delete_user':   action_delete_user(); break;
    case 'adjust_xp':     action_adjust_xp(); break;
    case 'reset_progress':action_reset_progress(); break;
    case 'set_module':    action_set_module(); break;
    case 'toggle_badge':  action_toggle_badge(); break;
    case 'save_content':  action_save_content(); break;
    default: redirect('?p=dashboard');
  }
  exit;
}

// ------------------------------------------------------------------ GET pages
$p = $_GET['p'] ?? (admin_logged_in() ? 'dashboard' : 'login');

if ($p === 'logout') { admin_logout(); redirect('?p=login'); }
if ($p === 'login')  { admin_logged_in() ? redirect('?p=dashboard') : page_login(); exit; }

require_admin();
switch ($p) {
  case 'dashboard':    page_dashboard(); break;
  case 'user':         page_user(); break;
  case 'content':      page_content(); break;
  case 'content_edit': page_content_edit(); break;
  case 'export':       do_export(); break;
  default:             page_dashboard();
}
exit;

// ============================================================ pages

function page_login(): void {
  layout_head('Sign in');
  echo '<div class="login-box card"><h1>⚡ Arena Admin</h1>';
  echo '<p class="muted">Sign in with the admin email &amp; password from your <code>config.php</code>.</p>';
  echo '<form method="post"><input type="hidden" name="action" value="login">';
  echo '<label>Email</label><input name="email" type="email" autocomplete="username" required>';
  echo '<label>Password</label><input name="password" type="password" autocomplete="current-password" required>';
  echo '<div style="margin-top:16px"><button class="btn" style="width:100%">Sign in</button></div>';
  echo '</form></div>';
  layout_foot();
}

function page_dashboard(): void {
  $q = trim($_GET['q'] ?? '');
  $sql = 'SELECT * FROM users';
  $args = [];
  if ($q !== '') { $sql .= ' WHERE name LIKE ? OR email LIKE ?'; $args = ["%$q%", "%$q%"]; }
  $sql .= ' ORDER BY xp DESC, created_at ASC';
  $stmt = db()->prepare($sql); $stmt->execute($args);
  $users = $stmt->fetchAll();

  layout_head('Users');
  echo '<h1>Users <span class="muted">(' . count($users) . ')</span></h1>';
  echo '<form method="get" class="row" style="margin:10px 0">'
    . '<input type="hidden" name="p" value="dashboard">'
    . '<input name="q" placeholder="Search name or email…" value="' . h($q) . '" style="max-width:280px">'
    . '<button class="btn ghost sm">Search</button>'
    . ($q !== '' ? ' <a class="btn ghost sm" href="?p=dashboard">Clear</a>' : '')
    . '<a class="btn sm" style="margin-left:auto" href="?p=user&id=new">+ Add user</a></form>';

  if (!$users) { echo '<p class="muted">No users yet.</p>'; layout_foot(); return; }

  echo '<table><tr><th>Player</th><th>Email</th><th>XP</th><th>Streak</th><th>Modules</th><th>Missions</th><th>Badges</th><th>Last active</th><th></th></tr>';
  foreach ($users as $u) {
    $s = user_summary((int)$u['id']);
    echo '<tr>'
      . '<td>' . h($u['avatar']) . ' <b>' . h($u['name']) . '</b></td>'
      . '<td class="muted">' . h($u['email']) . '</td>'
      . '<td><b>' . (int)$u['xp'] . '</b></td>'
      . '<td>🔥 ' . (int)$u['streak'] . '</td>'
      . '<td>' . $s['modulesCleared'] . '/' . $s['totalModules'] . '</td>'
      . '<td>' . $s['missionsDone'] . '</td>'
      . '<td>' . $s['badges'] . '</td>'
      . '<td class="muted">' . h($u['last_active'] ?: '—') . '</td>'
      . '<td><a class="btn ghost sm" href="?p=user&id=' . (int)$u['id'] . '">View</a></td>'
      . '</tr>';
  }
  echo '</table>';
  layout_foot();
}

function page_user(): void {
  $id = $_GET['id'] ?? '';
  if ($id === 'new') { page_add_user_form(); return; }
  $id = (int)$id;
  $stmt = db()->prepare('SELECT * FROM users WHERE id = ?'); $stmt->execute([$id]);
  $u = $stmt->fetch();
  if (!$u) { layout_head('User'); echo '<p>User not found. <a href="?p=dashboard">Back</a></p>'; layout_foot(); return; }

  $snap = progress_snapshot($id);
  $completed = $snap['completed'];
  $quizR = (array)$snap['quizResults'];
  $lessonsDone = (array)$snap['lessonsDone'];
  $missionR = (array)$snap['missionResults'];

  layout_head('User · ' . $u['name']);
  echo '<p><a href="?p=dashboard">← All users</a></p>';
  echo '<h1>' . h($u['avatar']) . ' ' . h($u['name']) . '</h1>';
  echo '<p class="muted">' . h($u['email']) . ' · <b>' . (int)$u['xp'] . ' XP</b> · 🔥 ' . (int)$u['streak']
    . '-day streak · joined ' . h($u['created_at']) . '</p>';

  echo '<div class="grid two">';

  // ---- edit profile ----
  echo '<div class="card"><h2>Profile</h2><form method="post">' . csrf_field()
    . '<input type="hidden" name="action" value="save_user"><input type="hidden" name="id" value="' . $id . '">'
    . '<label>Name</label><input name="name" value="' . h($u['name']) . '" maxlength="60" required>'
    . '<label>Email</label><input name="email" type="email" value="' . h($u['email']) . '" required>'
    . '<label>Avatar</label><select name="avatar">';
  foreach (ALLOWED_AVATARS as $av) {
    echo '<option ' . ($u['avatar'] === $av ? 'selected' : '') . '>' . $av . '</option>';
  }
  echo '</select><div style="margin-top:14px"><button class="btn">Save profile</button></div></form>';

  echo '<hr style="border-color:#2a2b52;margin:18px 0">';
  echo '<form method="post" class="row">' . csrf_field()
    . '<input type="hidden" name="action" value="reset_password"><input type="hidden" name="id" value="' . $id . '">'
    . '<input name="password" type="text" placeholder="New password (min 6)" minlength="6" required style="max-width:220px">'
    . '<button class="btn warn sm">Reset password</button></form>';
  echo '</div>';

  // ---- adjust XP / progress ----
  echo '<div class="card"><h2>Progress &amp; XP</h2>';
  echo '<form method="post" class="row" style="margin-bottom:10px">' . csrf_field()
    . '<input type="hidden" name="action" value="adjust_xp"><input type="hidden" name="id" value="' . $id . '">'
    . '<input name="delta" type="number" placeholder="e.g. 50 or -20" required style="max-width:160px">'
    . '<button class="btn sm">Adjust XP</button></form>';

  echo '<form method="post" class="row" style="margin-bottom:10px">' . csrf_field()
    . '<input type="hidden" name="action" value="set_module"><input type="hidden" name="id" value="' . $id . '">'
    . '<select name="module_id" style="max-width:260px">';
  foreach (modules() as $m) {
    $done = in_array($m['id'], $completed, true) ? ' ✓' : '';
    echo '<option value="' . $m['id'] . '">Level ' . $m['id'] . ' · ' . h($m['title']) . $done . '</option>';
  }
  echo '</select><button class="btn sm">Mark complete</button></form>';

  echo '<form method="post" onsubmit="return confirm(\'Wipe ALL progress, XP and badges for this user?\')">' . csrf_field()
    . '<input type="hidden" name="action" value="reset_progress"><input type="hidden" name="id" value="' . $id . '">'
    . '<button class="btn danger sm">Reset all progress</button></form>';
  echo '</div>';

  echo '</div>'; // end grid

  // ---- progress detail ----
  echo '<h2>Learning journey</h2><table><tr><th>Level</th><th>Lessons</th><th>Quiz</th><th>Mission</th></tr>';
  foreach (modules() as $m) {
    $ld = count($lessonsDone[$m['id']] ?? []);
    $lt = count($m['lessons']);
    $qr = $quizR[$m['id']] ?? null;
    $quizCell = $qr ? ($qr['best'] . '/' . $qr['total'] . ($qr['passed'] ? ' <span class="met">pass</span>' : ' <span class="miss">fail</span>')) : '<span class="muted">—</span>';
    $missionCell = '<span class="muted">—</span>';
    foreach ($m['missions'] as $mi) {
      $mr = $missionR[$mi['id']] ?? null;
      if ($mr) $missionCell = $mr['best'] . '/100 · ' . h($mr['band']);
    }
    $rowClass = in_array($m['id'], $completed, true) ? ' style="color:#7fe0c8"' : '';
    echo '<tr' . $rowClass . '><td><b>Lv ' . $m['id'] . '</b> ' . h($m['title']) . '</td>'
      . '<td>' . $ld . '/' . $lt . '</td><td>' . $quizCell . '</td><td>' . $missionCell . '</td></tr>';
  }
  echo '</table>';

  // ---- mission submissions ----
  echo '<h2>Mission submissions</h2>';
  $any = false;
  foreach (all_missions() as $mi) {
    $mr = $missionR[$mi['id']] ?? null;
    if (!$mr || $mr['submission'] === null) continue;
    $any = true;
    echo '<div class="card"><b>' . h($mi['title']) . '</b> <span class="pill">' . $mr['best'] . '/100 · ' . h($mr['band']) . '</span>'
      . '<p class="muted" style="white-space:pre-wrap;margin-top:8px">' . h($mr['submission']) . '</p></div>';
  }
  if (!$any) echo '<p class="muted">No mission submissions yet.</p>';

  // ---- badges ----
  echo '<h2>Badges (' . count($snap['badges']) . ')</h2><div>';
  $bmap = badge_map();
  foreach ($snap['badges'] as $b) {
    $bd = $bmap[$b['badge_id']] ?? ['emoji' => '🏅', 'name' => $b['badge_id']];
    echo '<span class="pill">' . h($bd['emoji']) . ' ' . h($bd['name']) . '</span>';
  }
  if (!$snap['badges']) echo '<span class="muted">None yet.</span>';
  echo '</div>';

  // grant/revoke a badge
  echo '<form method="post" class="row" style="margin-top:12px">' . csrf_field()
    . '<input type="hidden" name="action" value="toggle_badge"><input type="hidden" name="id" value="' . $id . '">'
    . '<select name="badge_id" style="max-width:280px">';
  foreach (content()['badges'] as $b) echo '<option value="' . h($b['id']) . '">' . h($b['emoji'] . ' ' . $b['name']) . '</option>';
  echo '</select><select name="grant" style="max-width:120px"><option value="1">Grant</option><option value="0">Revoke</option></select>'
    . '<button class="btn ghost sm">Apply</button></form>';

  // ---- XP log ----
  $ev = db()->prepare('SELECT amount, reason, created_at FROM xp_events WHERE user_id = ? ORDER BY id DESC LIMIT 100');
  $ev->execute([$id]);
  $events = $ev->fetchAll();
  echo '<h2>XP history</h2>';
  if ($events) {
    echo '<table><tr><th>When (UTC)</th><th>Reason</th><th>XP</th></tr>';
    foreach ($events as $e) echo '<tr><td class="muted">' . h($e['created_at']) . '</td><td>' . h($e['reason']) . '</td><td>' . (int)$e['amount'] . '</td></tr>';
    echo '</table>';
  } else echo '<p class="muted">No XP events.</p>';

  // ---- delete ----
  echo '<h2 style="color:#ff8fa3">Danger zone</h2>';
  echo '<form method="post" onsubmit="return confirm(\'Permanently DELETE this user and all their data?\')">' . csrf_field()
    . '<input type="hidden" name="action" value="delete_user"><input type="hidden" name="id" value="' . $id . '">'
    . '<button class="btn danger">Delete user</button></form>';

  layout_foot();
}

function page_add_user_form(): void {
  layout_head('Add user');
  echo '<p><a href="?p=dashboard">← All users</a></p><h1>Add user</h1>';
  echo '<div class="card" style="max-width:480px"><form method="post">' . csrf_field()
    . '<input type="hidden" name="action" value="add_user">'
    . '<label>Name</label><input name="name" maxlength="60" required>'
    . '<label>Email</label><input name="email" type="email" required>'
    . '<label>Password (min 6)</label><input name="password" type="text" minlength="6" required>'
    . '<label>Avatar</label><select name="avatar">';
  foreach (ALLOWED_AVATARS as $av) echo '<option>' . $av . '</option>';
  echo '</select><div style="margin-top:16px"><button class="btn">Create user</button></div></form></div>';
  layout_foot();
}

function page_content(): void {
  layout_head('Content');
  echo '<h1>Learning content</h1>';
  echo '<p class="muted">Edit levels, lessons, quizzes and missions. Changes save to the live site immediately. '
    . 'The canonical source stays in <code>server/content/*.js</code> — keep them in sync if you also redeploy the code.</p>';
  echo '<table><tr><th>Level</th><th>Stage</th><th>Lessons</th><th>Quiz</th><th>Prompts</th><th>Missions</th><th></th></tr>';
  foreach (modules() as $m) {
    echo '<tr><td>' . h($m['emoji']) . ' <b>Lv ' . $m['id'] . '</b> ' . h($m['title']) . '</td>'
      . '<td class="muted">' . h($m['stage']) . '</td>'
      . '<td>' . count($m['lessons']) . '</td><td>' . count($m['quiz']) . '</td>'
      . '<td>' . count($m['prompts']) . '</td><td>' . count($m['missions']) . '</td>'
      . '<td><a class="btn ghost sm" href="?p=content_edit&id=' . $m['id'] . '">Edit</a></td></tr>';
  }
  echo '</table>';
  layout_foot();
}

function page_content_edit(): void {
  $id = (int)($_GET['id'] ?? -1);
  $mod = find_module($id);
  if (!$mod) { layout_head('Edit'); echo '<p>Level not found.</p>'; layout_foot(); return; }

  $deep = [
    'lessons' => $mod['lessons'], 'quiz' => $mod['quiz'],
    'prompts' => $mod['prompts'], 'missions' => $mod['missions'],
  ];
  $json = json_encode($deep, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

  layout_head('Edit Level ' . $id);
  echo '<p><a href="?p=content">← All content</a></p><h1>Edit Level ' . $id . '</h1>';
  echo '<form method="post">' . csrf_field()
    . '<input type="hidden" name="action" value="save_content"><input type="hidden" name="id" value="' . $id . '">';
  echo '<div class="grid two">';
  echo '<div><label>Title</label><input name="title" value="' . h($mod['title']) . '" maxlength="120" required></div>';
  echo '<div><label>Emoji</label><input name="emoji" value="' . h($mod['emoji']) . '" maxlength="8"></div>';
  echo '<div><label>Stage</label><input name="stage" value="' . h($mod['stage']) . '"></div>';
  echo '<div><label>Accent</label><input name="accent" value="' . h($mod['accent']) . '"></div>';
  echo '</div>';
  echo '<label>Tagline</label><input name="tagline" value="' . h($mod['tagline']) . '">';
  echo '<label>Lessons · Quiz · Prompts · Missions (JSON)</label>';
  echo '<p class="muted" style="font-size:.82rem">Quiz items: <code>{"q","options":[…],"correct":0-based index,"explain"}</code>. '
    . 'Missions: <code>{"id","title","brief","submitLabel","minWords","maxXp","rubric":[{"id","label","keywords":[…],"weight"}]}</code>. '
    . 'Keep lesson/mission <code>id</code>s stable so existing progress still matches.</p>';
  echo '<textarea name="deep" spellcheck="false">' . h($json) . '</textarea>';
  echo '<div style="margin-top:14px" class="row"><button class="btn">Save content</button>'
    . '<a class="btn ghost" href="?p=content_edit&id=' . $id . '">Reset</a></div></form>';
  layout_foot();
}

// ============================================================ actions

function post_int(string $k): int { return (int)($_POST[$k] ?? 0); }

function action_add_user(): void {
  $name = trim($_POST['name'] ?? '');
  $email = mb_strtolower(trim($_POST['email'] ?? ''));
  $password = $_POST['password'] ?? '';
  $avatar = $_POST['avatar'] ?? '🦊';
  if ($name === '' || mb_strlen($name) > 60) { flash('Name required (≤60 chars).'); redirect('?p=user&id=new'); }
  if (!preg_match('/^\S+@\S+\.\S+$/', $email)) { flash('Valid email required.'); redirect('?p=user&id=new'); }
  if (strlen($password) < 6) { flash('Password must be ≥6 characters.'); redirect('?p=user&id=new'); }
  $ex = db()->prepare('SELECT id FROM users WHERE email = ?'); $ex->execute([$email]);
  if ($ex->fetch()) { flash('That email is already registered.'); redirect('?p=user&id=new'); }
  if (!in_array($avatar, ALLOWED_AVATARS, true)) $avatar = '🦊';
  db()->prepare('INSERT INTO users (name, email, password_hash, avatar, created_at) VALUES (?,?,?,?,?)')
    ->execute([$name, $email, password_hash($password, PASSWORD_BCRYPT), $avatar, now_utc()]);
  flash('User created.');
  redirect('?p=user&id=' . db()->lastInsertId());
}

function action_save_user(): void {
  $id = post_int('id');
  $name = trim($_POST['name'] ?? '');
  $email = mb_strtolower(trim($_POST['email'] ?? ''));
  $avatar = $_POST['avatar'] ?? '🦊';
  if ($name === '' || mb_strlen($name) > 60) { flash('Name required (≤60 chars).'); redirect('?p=user&id=' . $id); }
  if (!preg_match('/^\S+@\S+\.\S+$/', $email)) { flash('Valid email required.'); redirect('?p=user&id=' . $id); }
  $ex = db()->prepare('SELECT id FROM users WHERE email = ? AND id <> ?'); $ex->execute([$email, $id]);
  if ($ex->fetch()) { flash('Another account already uses that email.'); redirect('?p=user&id=' . $id); }
  if (!in_array($avatar, ALLOWED_AVATARS, true)) $avatar = '🦊';
  db()->prepare('UPDATE users SET name=?, email=?, avatar=? WHERE id=?')->execute([$name, $email, $avatar, $id]);
  flash('Profile saved.');
  redirect('?p=user&id=' . $id);
}

function action_reset_password(): void {
  $id = post_int('id');
  $pw = $_POST['password'] ?? '';
  if (strlen($pw) < 6) { flash('Password must be ≥6 characters.'); redirect('?p=user&id=' . $id); }
  db()->prepare('UPDATE users SET password_hash=? WHERE id=?')->execute([password_hash($pw, PASSWORD_BCRYPT), $id]);
  flash('Password reset.');
  redirect('?p=user&id=' . $id);
}

function action_delete_user(): void {
  $id = post_int('id');
  foreach (['lesson_progress','quiz_results','mission_progress','user_badges','xp_events'] as $t) {
    db()->prepare("DELETE FROM $t WHERE user_id = ?")->execute([$id]);
  }
  db()->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);
  flash('User deleted.');
  redirect('?p=dashboard');
}

function action_adjust_xp(): void {
  $id = post_int('id');
  $delta = (int)($_POST['delta'] ?? 0);
  if ($delta !== 0) {
    db()->prepare('UPDATE users SET xp = CASE WHEN xp + ? < 0 THEN 0 ELSE xp + ? END WHERE id = ?')
      ->execute([$delta, $delta, $id]);
    db()->prepare('INSERT INTO xp_events (user_id, amount, reason, created_at) VALUES (?,?,?,?)')
      ->execute([$id, $delta, 'admin-adjust', now_utc()]);
  }
  flash('XP adjusted by ' . $delta . '.');
  redirect('?p=user&id=' . $id);
}

function action_reset_progress(): void {
  $id = post_int('id');
  foreach (['lesson_progress','quiz_results','mission_progress','user_badges','xp_events'] as $t) {
    db()->prepare("DELETE FROM $t WHERE user_id = ?")->execute([$id]);
  }
  db()->prepare('UPDATE users SET xp=0, streak=0, last_active=NULL WHERE id=?')->execute([$id]);
  flash('Progress reset.');
  redirect('?p=user&id=' . $id);
}

function action_set_module(): void {
  $id = post_int('id');
  $mid = post_int('module_id');
  $mod = find_module($mid);
  if ($mod) {
    foreach ($mod['lessons'] as $l) {
      $has = db()->prepare('SELECT 1 FROM lesson_progress WHERE user_id=? AND module_id=? AND lesson_id=?');
      $has->execute([$id, $mid, $l['id']]);
      if (!$has->fetchColumn())
        db()->prepare('INSERT INTO lesson_progress (user_id,module_id,lesson_id,completed_at) VALUES (?,?,?,?)')
          ->execute([$id, $mid, $l['id'], now_utc()]);
    }
    $total = count($mod['quiz']);
    $has = db()->prepare('SELECT 1 FROM quiz_results WHERE user_id=? AND module_id=?');
    $has->execute([$id, $mid]);
    if ($has->fetchColumn())
      db()->prepare('UPDATE quiz_results SET best_score=?, total=?, updated_at=? WHERE user_id=? AND module_id=?')
        ->execute([$total, $total, now_utc(), $id, $mid]);
    else
      db()->prepare('INSERT INTO quiz_results (user_id,module_id,best_score,total,attempts,aced_first_try,updated_at) VALUES (?,?,?,?,1,0,?)')
        ->execute([$id, $mid, $total, $total, now_utc()]);
    refresh_badges($id, progress_snapshot($id));
  }
  flash('Level ' . $mid . ' marked complete.');
  redirect('?p=user&id=' . $id);
}

function action_toggle_badge(): void {
  $id = post_int('id');
  $badgeId = $_POST['badge_id'] ?? '';
  $grant = ($_POST['grant'] ?? '1') === '1';
  if ($grant) award_badge($id, $badgeId);
  else db()->prepare('DELETE FROM user_badges WHERE user_id=? AND badge_id=?')->execute([$id, $badgeId]);
  flash(($grant ? 'Granted' : 'Revoked') . ' badge.');
  redirect('?p=user&id=' . $id);
}

function action_save_content(): void {
  $id = post_int('id');
  $deep = json_decode($_POST['deep'] ?? '', true);
  if (!is_array($deep) || json_last_error() !== JSON_ERROR_NONE) {
    flash('Content not saved — the JSON is invalid: ' . json_last_error_msg());
    redirect('?p=content_edit&id=' . $id);
  }
  foreach (['lessons', 'quiz', 'prompts', 'missions'] as $k) {
    if (!array_key_exists($k, $deep) || !is_array($deep[$k])) {
      flash("Content not saved — missing or invalid \"$k\" array.");
      redirect('?p=content_edit&id=' . $id);
    }
  }
  foreach ($deep['quiz'] as $qi => $q) {
    if (!isset($q['q'], $q['options'], $q['correct']) || !is_array($q['options'])
      || !is_int($q['correct']) || $q['correct'] < 0 || $q['correct'] >= count($q['options'])) {
      flash('Content not saved — quiz item #' . ($qi + 1) . ' needs q, options[], and a valid 0-based correct index.');
      redirect('?p=content_edit&id=' . $id);
    }
  }

  $c = content();
  foreach ($c['modules'] as $i => $m) {
    if ((int)$m['id'] === $id) {
      $c['modules'][$i] = array_merge($m, [
        'title' => trim($_POST['title'] ?? $m['title']),
        'emoji' => trim($_POST['emoji'] ?? $m['emoji']),
        'stage' => trim($_POST['stage'] ?? $m['stage']),
        'accent' => trim($_POST['accent'] ?? $m['accent']),
        'tagline' => trim($_POST['tagline'] ?? $m['tagline']),
        'lessons' => $deep['lessons'], 'quiz' => $deep['quiz'],
        'prompts' => $deep['prompts'], 'missions' => $deep['missions'],
      ]);
      break;
    }
  }
  $c = rebuild_derived($c);
  if (write_content($c)) flash('Content saved to the live site.');
  else flash('Could not write content.full.php — check file permissions on the server.');
  redirect('?p=content_edit&id=' . $id);
}

// Recompute per-module badges + stage badge map so they track edited module data.
function rebuild_derived(array $c): array {
  $achievement = array_values(array_filter($c['badges'], fn($b) => strpos($b['id'], 'module-') !== 0));
  $moduleBadges = array_map(fn($m) => [
    'id' => 'module-' . $m['id'], 'name' => $m['title'], 'emoji' => $m['emoji'], 'desc' => 'Clear: ' . $m['title'],
  ], $c['modules']);
  $c['badges'] = array_merge($achievement, $moduleBadges);

  $stages = ['stage-ai-ready' => 'AI Ready', 'stage-toolkit' => 'Advanced Toolkit', 'stage-builder' => 'Automation Builder'];
  $map = [];
  foreach ($stages as $bid => $stageName) {
    $ids = [];
    foreach ($c['modules'] as $m) if ($m['stage'] === $stageName) $ids[] = $m['id'];
    $map[$bid] = $ids;
  }
  $c['stageBadgeMap'] = $map;
  return $c;
}

function write_content(array $c): bool {
  $file = __DIR__ . '/../api/content.full.php';
  $json = json_encode($c, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  $php = "<?php\n// AUTO-GENERATED — last edited via the admin panel.\n// Canonical source: server/content/*.js (keep in sync if you redeploy code).\n"
    . "return json_decode(<<<'ARENA_CONTENT_JSON'\n" . $json . "\nARENA_CONTENT_JSON, true);\n";
  return file_put_contents($file, $php, LOCK_EX) !== false;
}

// ============================================================ export

function do_export(): void {
  $users = db()->query('SELECT * FROM users ORDER BY xp DESC')->fetchAll();
  $xlsx = new Xlsx();

  // Users summary
  $rows = [['ID', 'Name', 'Email', 'Avatar', 'XP', 'Streak', 'Modules cleared', 'Missions done', 'Badges', 'Prompts', 'Last active', 'Joined']];
  foreach ($users as $u) {
    $s = user_summary((int)$u['id']);
    $rows[] = [(int)$u['id'], $u['name'], $u['email'], $u['avatar'], (int)$u['xp'], (int)$u['streak'],
      $s['modulesCleared'], $s['missionsDone'], $s['badges'], $s['promptsUnlocked'], $u['last_active'] ?: '', $u['created_at']];
  }
  $xlsx->addSheet('Users', $rows);

  // Quiz results
  $rows = [['User ID', 'Name', 'Level', 'Best score', 'Total', 'Attempts', 'Aced first try', 'Updated']];
  $qr = db()->query('SELECT q.*, u.name FROM quiz_results q JOIN users u ON u.id=q.user_id ORDER BY q.user_id, q.module_id')->fetchAll();
  foreach ($qr as $r) $rows[] = [(int)$r['user_id'], $r['name'], (int)$r['module_id'], (int)$r['best_score'], (int)$r['total'], (int)$r['attempts'], (int)$r['aced_first_try'], $r['updated_at']];
  $xlsx->addSheet('Quiz Results', $rows);

  // Missions (with submissions)
  $rows = [['User ID', 'Name', 'Mission', 'Best score', 'Band', 'Attempts', 'Submission', 'Completed']];
  $mr = db()->query('SELECT m.*, u.name FROM mission_progress m JOIN users u ON u.id=m.user_id ORDER BY m.user_id')->fetchAll();
  foreach ($mr as $r) $rows[] = [(int)$r['user_id'], $r['name'], $r['mission_id'], (int)$r['best_score'], $r['band'] ?: '', (int)$r['attempts'], $r['submission'] ?: '', $r['completed_at']];
  $xlsx->addSheet('Missions', $rows);

  // Lessons completed
  $rows = [['User ID', 'Name', 'Level', 'Lesson', 'Completed']];
  $lp = db()->query('SELECT l.*, u.name FROM lesson_progress l JOIN users u ON u.id=l.user_id ORDER BY l.user_id, l.module_id')->fetchAll();
  foreach ($lp as $r) $rows[] = [(int)$r['user_id'], $r['name'], (int)$r['module_id'], $r['lesson_id'], $r['completed_at']];
  $xlsx->addSheet('Lessons', $rows);

  // Badges
  $rows = [['User ID', 'Name', 'Badge', 'Earned']];
  $bmap = badge_map();
  $ub = db()->query('SELECT b.*, u.name FROM user_badges b JOIN users u ON u.id=b.user_id ORDER BY b.user_id')->fetchAll();
  foreach ($ub as $r) {
    $bn = $bmap[$r['badge_id']]['name'] ?? $r['badge_id'];
    $rows[] = [(int)$r['user_id'], $r['name'], $bn, $r['earned_at']];
  }
  $xlsx->addSheet('Badges', $rows);

  // XP events
  $rows = [['User ID', 'Name', 'Amount', 'Reason', 'When (UTC)']];
  $xe = db()->query('SELECT e.*, u.name FROM xp_events e JOIN users u ON u.id=e.user_id ORDER BY e.id DESC LIMIT 5000')->fetchAll();
  foreach ($xe as $r) $rows[] = [(int)$r['user_id'], $r['name'], (int)$r['amount'], $r['reason'], $r['created_at']];
  $xlsx->addSheet('XP Events', $rows);

  $xlsx->download('arena-users-' . gmdate('Ymd-Hi') . '.xlsx');
}
