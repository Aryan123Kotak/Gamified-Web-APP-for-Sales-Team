<?php
// Front controller for the JSON API. All /api/* requests are rewritten here by
// api/.htaccess. Mirrors the routes and behaviour of server/index.js.

require_once __DIR__ . '/lib.php';

send_security_headers(); // backstop in case .htaccess header rules aren't applied

// A real bcrypt hash of a random value, used to spend equal time verifying a
// password when the email is unknown — closes the login timing side-channel
// (parity with server/index.js DUMMY_HASH). Must be a valid hash so that
// password_verify actually performs the bcrypt work instead of failing fast.
define('DUMMY_HASH', '$2y$12$A8f3NjEYMOvzmGp3f.4i6OEwC1znZL4HsKcf/a0GSMVHyBQYYhZ6e');

// ---- resolve the route (everything after "/api", minus an optional index.php) ----
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$uri = rawurldecode($uri);
$pos = strpos($uri, '/api');
$route = $pos !== false ? substr($uri, $pos + 4) : $uri;
$route = preg_replace('#^/index\.php#', '', $route);
$route = '/' . trim($route, '/');
$method = $_SERVER['REQUEST_METHOD'];

try {
  dispatch($method, $route);
  fail('Not found', 404);
} catch (PDOException $e) {
  error_log('Arena DB error: ' . $e->getMessage());
  fail('Server error', 500);
}

function dispatch(string $method, string $route): void {
  $rl = config()['auth_rate_limit_max'] ?? 20;

  if ($method === 'POST' && $route === '/auth/register') { rate_limit('auth', $rl, 900); register(); return; }
  if ($method === 'POST' && $route === '/auth/login')    { rate_limit('auth', $rl, 900); login(); return; }
  if ($method === 'GET'  && $route === '/content')       { json_out(public_content()); return; }
  if ($method === 'GET'  && $route === '/me')            { me(); return; }
  if ($method === 'POST' && $route === '/lessons/complete') { lessons_complete(); return; }
  if ($method === 'POST' && $route === '/quiz/submit')   { quiz_submit(); return; }
  if ($method === 'POST' && $route === '/missions/submit') { missions_submit(); return; }
  if ($method === 'GET'  && $route === '/leaderboard')   { leaderboard(); return; }
}

// ---------------- auth ----------------

function register(): void {
  $b = read_json_body();
  $name = is_string($b['name'] ?? null) ? trim($b['name']) : '';
  $email = $b['email'] ?? null;
  $password = $b['password'] ?? null;
  $avatar = $b['avatar'] ?? null;

  if ($name === '') fail('Name is required');
  if (mb_strlen($name) > 60) fail('Name must be 60 characters or fewer');
  if (!is_string($email) || strlen($email) > 254 || !preg_match('/^\S+@\S+\.\S+$/', $email))
    fail('A valid email is required');
  if (!is_string($password) || strlen($password) < 8) fail('Password must be at least 8 characters');
  if (strlen($password) > 200) fail('Password must be 200 characters or fewer');

  $email = mb_strtolower($email);
  $exists = db()->prepare('SELECT id FROM users WHERE email = ?');
  $exists->execute([$email]);
  if ($exists->fetch()) fail('That email is already registered — log in instead', 409);

  $safeAvatar = in_array($avatar, ALLOWED_AVATARS, true) ? $avatar : '🦊';
  $hash = password_hash($password, PASSWORD_BCRYPT);
  db()->prepare('INSERT INTO users (name, email, password_hash, avatar, created_at) VALUES (?, ?, ?, ?, ?)')
    ->execute([$name, $email, $hash, $safeAvatar, now_utc()]);
  $id = (int)db()->lastInsertId();
  $user = get_user($id);
  json_out(['token' => jwt_sign(['id' => $id, 'name' => $name]), 'user' => user_public($user)]);
}

function login(): void {
  $b = read_json_body();
  $email = is_string($b['email'] ?? null) ? mb_strtolower($b['email']) : '';
  $password = is_string($b['password'] ?? null) ? $b['password'] : '';

  $stmt = db()->prepare('SELECT * FROM users WHERE email = ?');
  $stmt->execute([$email]);
  $user = $stmt->fetch();

  // Always run a hash verify — against a dummy when the email is unknown — so the
  // response time doesn't reveal whether an account exists.
  $ok = password_verify($password, $user ? $user['password_hash'] : DUMMY_HASH);
  if (!$user || !$ok) fail('Wrong email or password', 401);

  json_out([
    'token' => jwt_sign(['id' => (int)$user['id'], 'name' => $user['name']]),
    'user' => user_public($user),
  ]);
}

function get_user(int $id): ?array {
  $stmt = db()->prepare('SELECT * FROM users WHERE id = ?');
  $stmt->execute([$id]);
  return $stmt->fetch() ?: null;
}

// ---------------- me (+ daily streak) ----------------

function me(): void {
  $userId = require_auth();
  $user = get_user($userId);
  if (!$user) fail('Account not found', 401);

  $today = gmdate('Y-m-d');
  $yesterday = gmdate('Y-m-d', time() - 86400);
  $daily = null;
  if ($user['last_active'] !== $today) {
    $streak = ($user['last_active'] === $yesterday) ? (int)$user['streak'] + 1 : 1;
    db()->prepare('UPDATE users SET streak = ?, last_active = ? WHERE id = ?')
      ->execute([$streak, $today, $userId]);
    $amount = content()['XP']['DAILY_STREAK'];
    add_xp($userId, $amount, 'daily-streak');
    $user['streak'] = $streak;
    $user['xp'] = (int)$user['xp'] + $amount;
    $daily = ['amount' => $amount, 'streak' => $streak];
    if ($streak >= 3) award_badge($userId, 'streak-3');
    if ($streak >= 7) award_badge($userId, 'streak-7');
  }

  $snap = progress_snapshot($userId);
  refresh_badges($userId, $snap);
  $badges = db()->prepare('SELECT badge_id, earned_at FROM user_badges WHERE user_id = ?');
  $badges->execute([$userId]);
  $snap['badges'] = $badges->fetchAll();

  json_out(['user' => user_public($user), 'progress' => $snap, 'daily' => $daily]);
}

// ---------------- lessons ----------------

function lessons_complete(): void {
  $userId = require_auth();
  $b = read_json_body();
  $mod = find_module($b['moduleId'] ?? null);
  $lessonId = $b['lessonId'] ?? null;
  if (!$mod) fail('Unknown module');
  $known = false;
  foreach ($mod['lessons'] as $l) if ($l['id'] === $lessonId) { $known = true; break; }
  if (!$known) fail('Unknown lesson');

  $snap = progress_snapshot($userId);
  if (!in_array($mod['id'], $snap['unlocked'], true))
    fail('Module is still locked — beat the previous boss first', 403);

  // Insert-if-absent.
  $has = db()->prepare('SELECT 1 FROM lesson_progress WHERE user_id = ? AND module_id = ? AND lesson_id = ?');
  $has->execute([$userId, $mod['id'], $lessonId]);
  $xpGained = 0; $newBadges = [];
  if (!$has->fetchColumn()) {
    db()->prepare('INSERT INTO lesson_progress (user_id, module_id, lesson_id, completed_at) VALUES (?, ?, ?, ?)')
      ->execute([$userId, $mod['id'], $lessonId, now_utc()]);
    $xpGained = content()['XP']['LESSON'];
    add_xp($userId, $xpGained, "lesson:{$mod['id']}/$lessonId");
    if (award_badge($userId, 'first-lesson')) $newBadges[] = 'first-lesson';
  }

  json_out(['xpGained' => $xpGained, 'newBadges' => $newBadges, 'progress' => progress_snapshot($userId)]);
}

// ---------------- boss quiz ----------------

function quiz_submit(): void {
  $userId = require_auth();
  $b = read_json_body();
  $mod = find_module($b['moduleId'] ?? null);
  $answers = $b['answers'] ?? null;
  if (!$mod) fail('Unknown module');
  if (!is_array($answers) || count($answers) !== count($mod['quiz']))
    fail('Answer every question before submitting');

  $snap = progress_snapshot($userId);
  if (!in_array($mod['id'], $snap['unlocked'], true)) fail('Module is still locked', 403);
  $done = (array)($snap['lessonsDone']->{$mod['id']} ?? []);
  foreach ($mod['lessons'] as $l)
    if (!in_array($l['id'], $done, true)) fail('Finish all lessons before challenging the boss', 403);

  $results = [];
  foreach ($mod['quiz'] as $i => $q) {
    $results[] = [
      'yourAnswer' => $answers[$i],
      'correct' => $q['correct'],
      'isCorrect' => (int)$answers[$i] === (int)$q['correct'],
      'explain' => $q['explain'],
    ];
  }
  $score = count(array_filter($results, fn($r) => $r['isCorrect']));
  $total = count($mod['quiz']);
  $passed = $score >= (int)ceil($total * PASS_RATIO);

  $stmt = db()->prepare('SELECT * FROM quiz_results WHERE user_id = ? AND module_id = ?');
  $stmt->execute([$userId, $mod['id']]);
  $prev = $stmt->fetch();
  $prevBest = $prev ? (int)$prev['best_score'] : 0;

  // "Flawless" ace only counts on the very first attempt (answers are revealed on
  // submit, so this stops fail→read→resubmit farming).
  $acedFirstTry = !$prev && $score === $total;

  $xp = content()['XP'];
  $xpGained = 0;
  if ($score > $prevBest) $xpGained += ($score - $prevBest) * $xp['QUIZ_PER_CORRECT'];
  if ($acedFirstTry) $xpGained += $xp['QUIZ_PERFECT_BONUS'];

  if ($prev) {
    db()->prepare('UPDATE quiz_results SET best_score = ?, attempts = attempts + 1, updated_at = ?
      WHERE user_id = ? AND module_id = ?')
      ->execute([max($prevBest, $score), now_utc(), $userId, $mod['id']]);
  } else {
    db()->prepare('INSERT INTO quiz_results (user_id, module_id, best_score, total, attempts, aced_first_try, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?)')
      ->execute([$userId, $mod['id'], $score, $total, $acedFirstTry ? 1 : 0, now_utc()]);
  }
  if ($xpGained) add_xp($userId, $xpGained, "quiz:{$mod['id']}");

  $after = progress_snapshot($userId);
  $newBadges = refresh_badges($userId, $after);
  $moduleNowCompleted = in_array($mod['id'], $after['completed'], true) && !in_array($mod['id'], $snap['completed'], true);

  json_out([
    'score' => $score, 'total' => $total, 'passed' => $passed,
    'perfect' => $acedFirstTry, 'scoredFull' => $score === $total,
    'xpGained' => $xpGained, 'results' => $results, 'newBadges' => $newBadges,
    'moduleCompleted' => $moduleNowCompleted,
    'unlockedPrompts' => $moduleNowCompleted ? $mod['prompts'] : [],
    'progress' => $after,
  ]);
}

// ---------------- missions ----------------

function missions_submit(): void {
  $userId = require_auth();
  $b = read_json_body();
  $missionId = $b['missionId'] ?? null;
  $submission = $b['submission'] ?? null;
  $mission = find_mission($missionId);
  if (!$mission) fail('Unknown mission');
  if (!is_string($submission) || mb_strlen(trim($submission)) < 10)
    fail('Please write your submission before submitting.');
  if (strlen($submission) > 8000) fail('Submission is too long (keep it under 8000 characters).');

  $snap = progress_snapshot($userId);
  if (!in_array($mission['moduleId'], $snap['unlocked'], true)) fail("Unlock this mission's level first.", 403);

  $graded = grade_submission($mission, $submission);

  $stmt = db()->prepare('SELECT * FROM mission_progress WHERE user_id = ? AND mission_id = ?');
  $stmt->execute([$userId, $missionId]);
  $prev = $stmt->fetch();
  $prevBest = $prev ? (int)$prev['best_score'] : 0;

  $xpGained = 0;
  if ($graded['score'] > $prevBest) {
    $gainedMarks = $graded['score'] - $prevBest;
    $xpGained = (int)round(($mission['maxXp'] * $gainedMarks) / 100);
  }

  $keepScore = max($prevBest, $graded['score']);
  $storeBand = $graded['score'] >= $prevBest ? $graded['band']['name'] : $prev['band'];
  $storeSubmission = $graded['score'] >= $prevBest ? $submission : $prev['submission'];

  if ($prev) {
    db()->prepare('UPDATE mission_progress SET best_score = ?, band = ?, submission = ?,
      attempts = attempts + 1, completed_at = ? WHERE user_id = ? AND mission_id = ?')
      ->execute([$keepScore, $storeBand, $storeSubmission, now_utc(), $userId, $missionId]);
  } else {
    db()->prepare('INSERT INTO mission_progress (user_id, mission_id, best_score, band, submission, attempts, completed_at)
      VALUES (?, ?, ?, ?, ?, 1, ?)')
      ->execute([$userId, $missionId, $graded['score'], $graded['band']['name'], $submission, now_utc()]);
  }
  if ($xpGained) add_xp($userId, $xpGained, "mission:$missionId");

  $after = progress_snapshot($userId);
  $newBadges = refresh_badges($userId, $after);

  json_out([
    'score' => $graded['score'], 'band' => $graded['band'], 'criteria' => $graded['criteria'],
    'lengthNote' => $graded['lengthNote'], 'passed' => $graded['passed'], 'bestScore' => $keepScore,
    'xpGained' => $xpGained, 'maxXp' => $mission['maxXp'], 'newBadges' => $newBadges, 'progress' => $after,
  ]);
}

// ---------------- leaderboard ----------------

function leaderboard(): void {
  $userId = require_auth();

  $allTime = db()->query(
    "SELECT u.id, u.name, u.avatar, u.xp, u.streak,
       (SELECT COUNT(*) FROM user_badges b WHERE b.user_id = u.id AND b.badge_id LIKE 'module-%') AS modulesCleared
     FROM users u ORDER BY u.xp DESC, u.created_at ASC LIMIT 50"
  )->fetchAll();

  $cutoff = gmdate('Y-m-d H:i:s', time() - 7 * 86400);
  $weeklyStmt = db()->prepare(
    "SELECT u.id, u.name, u.avatar, COALESCE(SUM(e.amount), 0) AS xp
     FROM users u JOIN xp_events e ON e.user_id = u.id AND e.created_at >= ?
     GROUP BY u.id, u.name, u.avatar ORDER BY xp DESC LIMIT 50"
  );
  $weeklyStmt->execute([$cutoff]);
  $weekly = $weeklyStmt->fetchAll();

  $myRank = null;
  foreach ($allTime as $i => $u) if ((int)$u['id'] === $userId) { $myRank = $i + 1; break; }

  // Normalise numeric types for the client.
  $num = function ($rows) {
    return array_map(function ($r) {
      $r['id'] = (int)$r['id']; $r['xp'] = (int)$r['xp'];
      if (isset($r['streak'])) $r['streak'] = (int)$r['streak'];
      if (isset($r['modulesCleared'])) $r['modulesCleared'] = (int)$r['modulesCleared'];
      return $r;
    }, $rows);
  };

  json_out(['allTime' => $num($allTime), 'weekly' => $num($weekly), 'myRank' => $myRank]);
}
