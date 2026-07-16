<?php
// Shared backend logic — a faithful PHP port of server/index.js + server/content.
// Same rules: 80% quiz pass, improvement-only XP, first-try-only "flawless"
// bonus, keyword-rubric mission grading, server-side badge awarding.

require_once __DIR__ . '/db.php';

const PASS_RATIO   = 0.8;   // quiz score needed to pass a level (80%)
const MISSION_PASS = 65;    // marks needed for a mission to count as "competent"

function config(): array {
  static $c = null;
  if ($c === null) $c = require __DIR__ . '/config.php';
  return $c;
}

function now_utc(): string { return gmdate('Y-m-d H:i:s'); }

function json_out($data, int $status = 200): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('X-Content-Type-Options: nosniff');
  header('Cache-Control: no-store');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function fail(string $msg, int $status = 400): void { json_out(['error' => $msg], $status); }

// ---------------- content ----------------

function content(): array {
  static $c = null;
  if ($c === null) $c = require __DIR__ . '/content.full.php';
  return $c;
}

function modules(): array { return content()['modules']; }

function find_module($id): ?array {
  foreach (modules() as $m) if ((int)$m['id'] === (int)$id) return $m;
  return null;
}

function all_prompts(): array {
  static $p = null;
  if ($p !== null) return $p;
  $p = [];
  foreach (modules() as $m) {
    foreach ($m['prompts'] as $pr) {
      $p[] = $pr + ['moduleId' => $m['id'], 'moduleTitle' => $m['title'], 'moduleEmoji' => $m['emoji']];
    }
  }
  return $p;
}

function all_missions(): array {
  static $ms = null;
  if ($ms !== null) return $ms;
  $ms = [];
  foreach (modules() as $m) {
    foreach ($m['missions'] as $mi) {
      $ms[] = $mi + ['moduleId' => $m['id'], 'moduleTitle' => $m['title']];
    }
  }
  return $ms;
}

function find_mission($id): ?array {
  foreach (all_missions() as $mi) if ($mi['id'] === $id) return $mi;
  return null;
}

// Public projection served to the browser: quiz answers + rubric keywords stripped.
function public_content(): array {
  $c = content();
  $mods = array_map(function ($m) {
    return [
      'id' => $m['id'], 'stage' => $m['stage'], 'slug' => $m['slug'], 'title' => $m['title'],
      'emoji' => $m['emoji'], 'tagline' => $m['tagline'], 'accent' => $m['accent'],
      'lessons' => $m['lessons'],
      'quizLength' => count($m['quiz']),
      'quiz' => array_map(fn($q) => ['q' => $q['q'], 'options' => $q['options']], $m['quiz']),
      'prompts' => $m['prompts'],
      'missions' => array_map('public_mission', $m['missions']),
    ];
  }, $c['modules']);

  $lessons = 0;
  foreach ($c['modules'] as $m) $lessons += count($m['lessons']);

  return [
    'modules' => $mods,
    'stages'  => $c['stages'],
    'ranks'   => $c['ranks'],
    'badges'  => $c['badges'],
    'xp'      => $c['XP'],
    'passPercent' => 80,
    'totals'  => [
      'modules'  => count($c['modules']),
      'lessons'  => $lessons,
      'prompts'  => count(all_prompts()),
      'missions' => count(all_missions()),
    ],
  ];
}

function public_mission(array $mi): array {
  return [
    'id' => $mi['id'], 'title' => $mi['title'], 'brief' => $mi['brief'],
    'submitLabel' => $mi['submitLabel'], 'minWords' => $mi['minWords'], 'maxXp' => $mi['maxXp'],
    'criteria' => array_map(fn($r) => ['id' => $r['id'], 'label' => $r['label']], $mi['rubric']),
  ];
}

// ---------------- JWT (HS256) ----------------

function auth_secret(): string {
  $cfg = config();
  if (!empty($cfg['auth_secret'])) return $cfg['auth_secret'];
  $file = __DIR__ . '/.auth-secret';
  if (!file_exists($file)) {
    file_put_contents($file, bin2hex(random_bytes(48)));
    @chmod($file, 0600);
  }
  return trim(file_get_contents($file));
}

function b64url(string $s): string { return rtrim(strtr(base64_encode($s), '+/', '-_'), '='); }
function b64url_dec(string $s): string {
  return base64_decode(strtr($s, '-_', '+/') . str_repeat('=', (4 - strlen($s) % 4) % 4));
}

function jwt_sign(array $payload): string {
  $header = b64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
  $payload['exp'] = time() + 60 * 60 * 24 * 30; // 30 days
  $body = b64url(json_encode($payload));
  $sig = b64url(hash_hmac('sha256', "$header.$body", auth_secret(), true));
  return "$header.$body.$sig";
}

function jwt_verify(string $token): ?array {
  $parts = explode('.', $token);
  if (count($parts) !== 3) return null;
  [$h, $b, $sig] = $parts;
  $expected = b64url(hash_hmac('sha256', "$h.$b", auth_secret(), true));
  if (!hash_equals($expected, $sig)) return null;
  $payload = json_decode(b64url_dec($b), true);
  if (!is_array($payload) || ($payload['exp'] ?? 0) < time()) return null;
  return $payload;
}

// Require a valid bearer token; returns the user id or sends 401.
function require_auth(): int {
  $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '');
  if (stripos($hdr, 'Bearer ') !== 0) fail('Not logged in', 401);
  $payload = jwt_verify(substr($hdr, 7));
  if (!$payload) fail('Session expired — log in again', 401);
  return (int)$payload['id'];
}

// ---------------- XP / badges ----------------

function add_xp(int $userId, int $amount, string $reason): void {
  if ($amount <= 0) return;
  db()->prepare('UPDATE users SET xp = xp + ? WHERE id = ?')->execute([$amount, $userId]);
  db()->prepare('INSERT INTO xp_events (user_id, amount, reason, created_at) VALUES (?, ?, ?, ?)')
    ->execute([$userId, $amount, $reason, now_utc()]);
}

// Insert-if-absent badge. Returns true if newly granted.
function award_badge(int $userId, string $badgeId): bool {
  $exists = db()->prepare('SELECT 1 FROM user_badges WHERE user_id = ? AND badge_id = ?');
  $exists->execute([$userId, $badgeId]);
  if ($exists->fetchColumn()) return false;
  db()->prepare('INSERT INTO user_badges (user_id, badge_id, earned_at) VALUES (?, ?, ?)')
    ->execute([$userId, $badgeId, now_utc()]);
  return true;
}

// ---------------- progress ----------------

function lessons_done_for(int $userId): array {
  $rows = db()->prepare('SELECT module_id, lesson_id FROM lesson_progress WHERE user_id = ?');
  $rows->execute([$userId]);
  $map = [];
  foreach ($rows as $r) $map[(int)$r['module_id']][] = $r['lesson_id'];
  return $map;
}

function quiz_results_for(int $userId): array {
  $rows = db()->prepare('SELECT * FROM quiz_results WHERE user_id = ?');
  $rows->execute([$userId]);
  $map = [];
  foreach ($rows as $r) {
    $total = (int)$r['total'];
    $map[(int)$r['module_id']] = [
      'best' => (int)$r['best_score'], 'total' => $total, 'attempts' => (int)$r['attempts'],
      'passed' => (int)$r['best_score'] >= (int)ceil($total * PASS_RATIO),
    ];
  }
  return $map;
}

function module_completed(array $m, array $lessonsDone, array $quizResults): bool {
  $done = $lessonsDone[$m['id']] ?? [];
  foreach ($m['lessons'] as $l) if (!in_array($l['id'], $done, true)) return false;
  $q = $quizResults[$m['id']] ?? null;
  return $q && $q['passed'];
}

function mission_results_for(int $userId): array {
  $rows = db()->prepare('SELECT * FROM mission_progress WHERE user_id = ?');
  $rows->execute([$userId]);
  $map = [];
  foreach ($rows as $r) {
    $map[$r['mission_id']] = [
      'best' => (int)$r['best_score'], 'band' => $r['band'], 'submission' => $r['submission'],
      'attempts' => (int)$r['attempts'], 'passed' => (int)$r['best_score'] >= MISSION_PASS,
    ];
  }
  return $map;
}

function progress_snapshot(int $userId): array {
  $lessonsDone = lessons_done_for($userId);
  $quizResults = quiz_results_for($userId);
  $completed = [];
  foreach (modules() as $m) if (module_completed($m, $lessonsDone, $quizResults)) $completed[] = $m['id'];

  $unlocked = [];
  foreach (modules() as $m) {
    if ($m['id'] === 0 || in_array($m['id'] - 1, $completed, true)) $unlocked[] = $m['id'];
  }

  $missionResults = mission_results_for($userId);
  $missionsDone = [];
  foreach ($missionResults as $id => $v) if ($v['passed']) $missionsDone[] = $id;

  $badges = db()->prepare('SELECT badge_id, earned_at FROM user_badges WHERE user_id = ?');
  $badges->execute([$userId]);
  $badges = $badges->fetchAll();

  $unlockedPromptIds = [];
  foreach (all_prompts() as $p) if (in_array($p['moduleId'], $completed, true)) $unlockedPromptIds[] = $p['id'];

  return [
    'lessonsDone' => (object)$lessonsDone,
    'quizResults' => (object)$quizResults,
    'completed' => $completed,
    'unlocked' => $unlocked,
    'missionResults' => (object)$missionResults,
    'missionsDone' => $missionsDone,
    'badges' => $badges,
    'unlockedPromptIds' => $unlockedPromptIds,
  ];
}

// Award any badges implied by current progress. Returns newly earned ids.
function refresh_badges(int $userId, array $snap): array {
  $c = content();
  $fresh = [];
  $grant = function (string $id) use ($userId, &$fresh) {
    if (award_badge($userId, $id)) $fresh[] = $id;
  };

  $completed = $snap['completed'];
  foreach ($completed as $id) $grant("module-$id");
  if (count($completed) >= count(modules())) $grant('champion');
  if (count($snap['unlockedPromptIds']) >= 15) $grant('vault-15');
  if (count($snap['unlockedPromptIds']) >= count(all_prompts())) $grant('vault-all');
  if (count($snap['missionsDone']) >= count(all_missions())) $grant('missions-all');

  foreach ($c['stageBadgeMap'] as $badgeId => $moduleIds) {
    $all = true;
    foreach ($moduleIds as $id) if (!in_array($id, $completed, true)) { $all = false; break; }
    if ($all) $grant($badgeId);
  }

  $stmt = db()->prepare('SELECT COUNT(*) FROM quiz_results WHERE user_id = ? AND aced_first_try = 1');
  $stmt->execute([$userId]);
  $perfects = (int)$stmt->fetchColumn();
  if ($perfects >= 1) $grant('perfect-boss');
  if ($perfects >= 5) $grant('five-perfect');

  return $fresh;
}

// ---------------- mission grading ----------------

function grade_submission(array $mission, string $submissionRaw): array {
  $submission = (string)$submissionRaw;
  $text = mb_strtolower($submission);
  $words = count(array_filter(preg_split('/\s+/', trim($submission))));

  $criteria = array_map(function ($c) use ($text) {
    $hit = false;
    foreach ($c['keywords'] as $k) {
      if ($k !== '' && mb_strpos($text, mb_strtolower($k)) !== false) { $hit = true; break; }
    }
    return ['id' => $c['id'], 'label' => $c['label'], 'met' => $hit, 'weight' => $c['weight'] ?? 1];
  }, $mission['rubric']);

  $totalWeight = 0; $metWeight = 0;
  foreach ($criteria as $c) { $totalWeight += $c['weight']; if ($c['met']) $metWeight += $c['weight']; }
  if ($totalWeight === 0) $totalWeight = 1;
  $score = (int)round(($metWeight / $totalWeight) * 100);

  $minWords = $mission['minWords'] ?? 40;
  $lengthNote = null;
  if ($words < (int)ceil($minWords * 0.5)) {
    $score = min($score, 40);
    $lengthNote = "Too short — aim for at least $minWords words to show real thinking.";
  } elseif ($words < $minWords) {
    $score = min($score, 75);
    $lengthNote = "A bit short — around {$minWords}+ words would strengthen this.";
  }

  if ($score >= 85)      $band = ['level' => 4, 'name' => 'Can guide others'];
  elseif ($score >= 65)  $band = ['level' => 3, 'name' => 'Competent'];
  elseif ($score >= 40)  $band = ['level' => 2, 'name' => 'Developing'];
  else                   $band = ['level' => 1, 'name' => 'Needs support'];

  return [
    'score' => $score, 'band' => $band, 'criteria' => $criteria,
    'words' => $words, 'lengthNote' => $lengthNote, 'passed' => $score >= MISSION_PASS,
  ];
}

// ---------------- misc ----------------

function user_public(array $u): array {
  return [
    'id' => (int)$u['id'], 'name' => $u['name'], 'email' => $u['email'],
    'avatar' => $u['avatar'], 'xp' => (int)$u['xp'], 'streak' => (int)$u['streak'],
  ];
}

const ALLOWED_AVATARS = ['🦊','🦁','🐯','🦅','🐺','🦈','🐉','🦄','🐼','🤖','👽','🥷'];

function read_json_body(): array {
  $raw = file_get_contents('php://input');
  if (strlen($raw) > 32 * 1024) fail('Request body too large', 413);
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

// Best-effort per-IP rate limiter (file-based sliding window). Fails open if the
// directory isn't writable, so a hosting quirk can never lock people out.
function rate_limit(string $bucket, int $max, int $windowSec): void {
  $dir = __DIR__ . '/.ratelimit';
  if (!is_dir($dir)) @mkdir($dir, 0775, true);
  if (!is_writable($dir)) return;
  $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
  $file = $dir . '/' . md5($bucket . '|' . $ip) . '.json';
  $now = time();
  $hits = is_file($file) ? (json_decode(file_get_contents($file), true) ?: []) : [];
  $hits = array_values(array_filter($hits, fn($t) => $t > $now - $windowSec));
  if (count($hits) >= $max) {
    fail('Too many attempts — please wait a few minutes and try again.', 429);
  }
  $hits[] = $now;
  file_put_contents($file, json_encode($hits), LOCK_EX);
}
