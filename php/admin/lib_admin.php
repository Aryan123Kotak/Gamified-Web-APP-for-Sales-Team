<?php
// Admin panel shared helpers: session auth (config-file credentials), CSRF, and
// the HTML shell. Reuses the API's db()/content() layer so there is one source
// of truth for the data model.

require_once __DIR__ . '/../api/lib.php';   // db(), content(), modules(), all_missions(), config()...

// Harden the session cookie before starting the session: HttpOnly (JS can't read
// it), SameSite=Lax (CSRF surface), and Secure whenever the request is HTTPS
// (Hostinger terminates SSL and forwards X-Forwarded-Proto). Secure is only set
// on HTTPS so first-time setup over plain HTTP still works.
$https = (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off')
  || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
session_set_cookie_params([
  'lifetime' => 0, 'path' => '/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Lax',
]);
session_start();

// ---- auth ----

function admin_logged_in(): bool { return !empty($_SESSION['arena_admin']); }

function admin_attempt_login(string $email, string $password): bool {
  $a = config()['admin'] ?? [];
  $configuredPass = (string)($a['password'] ?? '');
  $okEmail = hash_equals(mb_strtolower((string)($a['email'] ?? '')), mb_strtolower(trim($email)));
  // Accept either a bcrypt hash (recommended) or a plaintext password in config.
  $isHash = (bool)preg_match('/^\$2[aby]\$/', $configuredPass);
  $okPass = $isHash
    ? password_verify((string)$password, $configuredPass)
    : ($configuredPass !== '' && hash_equals($configuredPass, (string)$password));
  if ($okEmail && $okPass) {
    session_regenerate_id(true);
    $_SESSION['arena_admin'] = true;
    return true;
  }
  return false;
}

function admin_logout(): void { $_SESSION = []; session_destroy(); }

function require_admin(): void {
  if (!admin_logged_in()) { header('Location: ?p=login'); exit; }
}

// ---- CSRF ----

function csrf_token(): string {
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
  return $_SESSION['csrf'];
}

function csrf_field(): string {
  return '<input type="hidden" name="csrf" value="' . h(csrf_token()) . '">';
}

function check_csrf(): void {
  if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
    http_response_code(400);
    exit('Bad CSRF token — go back and try again.');
  }
}

function redirect(string $to): void { header('Location: ' . $to); exit; }

// ---- helpers ----

function h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

function flash(?string $msg = null): ?string {
  if ($msg !== null) { $_SESSION['flash'] = $msg; return null; }
  $m = $_SESSION['flash'] ?? null; unset($_SESSION['flash']); return $m;
}

// Badge catalog lookup: id => {name, emoji, desc}
function badge_map(): array {
  static $m = null;
  if ($m !== null) return $m;
  $m = [];
  foreach (content()['badges'] as $b) $m[$b['id']] = $b;
  return $m;
}

// Aggregate summary metrics for one user (for the dashboard table).
function user_summary(int $userId): array {
  $snap = progress_snapshot($userId);
  return [
    'modulesCleared' => count($snap['completed']),
    'totalModules'   => count(modules()),
    'missionsDone'   => count($snap['missionsDone']),
    'badges'         => count($snap['badges']),
    'promptsUnlocked'=> count($snap['unlockedPromptIds']),
  ];
}

// ---- layout ----

function layout_head(string $title): void {
  send_security_headers(true); // nosniff + X-Frame-Options + CSP backstop for HTML
  $flash = flash();
  echo '<!doctype html><html lang="en"><head><meta charset="utf-8">';
  echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
  echo '<meta name="robots" content="noindex,nofollow">';
  echo '<title>' . h($title) . ' · Arena Admin</title>';
  echo '<style>' . admin_css() . '</style>';
  echo '<script src="admin.js" defer></script></head><body>';
  if (admin_logged_in()) {
    echo '<header class="topbar"><b>⚡ Arena Admin</b><nav>'
      . '<a href="?p=dashboard">Users</a>'
      . '<a href="?p=content">Content</a>'
      . '<a href="?p=export">⬇ Export Excel</a>'
      . '<a href="?p=logout" class="danger">Log out</a></nav></header>';
  }
  echo '<main class="wrap">';
  if ($flash) echo '<div class="flash">' . h($flash) . '</div>';
}

function layout_foot(): void { echo '</main></body></html>'; }

function admin_css(): string {
  return <<<CSS
  * { box-sizing: border-box; }
  body { margin:0; font: 15px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:#0f1020; color:#e9e9f2; }
  a { color:#7fe0c8; text-decoration:none; } a:hover { text-decoration:underline; }
  .topbar { display:flex; align-items:center; gap:20px; padding:12px 20px; background:#171833; border-bottom:1px solid #2a2b52; position:sticky; top:0; }
  .topbar nav { display:flex; gap:16px; margin-left:auto; }
  .topbar .danger { color:#ff8fa3; }
  .wrap { max-width:1100px; margin:0 auto; padding:24px 20px 80px; }
  h1 { font-size:1.5rem; margin:0 0 4px; } h2 { font-size:1.15rem; margin:24px 0 10px; }
  .muted { color:#9a9ab5; }
  table { width:100%; border-collapse:collapse; margin-top:12px; background:#171833; border-radius:10px; overflow:hidden; }
  th, td { text-align:left; padding:10px 12px; border-bottom:1px solid #24254a; }
  th { background:#1e1f3d; font-size:.8rem; text-transform:uppercase; letter-spacing:.03em; color:#b9b9d6; }
  tr:hover td { background:#1b1c3a; }
  .btn { display:inline-block; background:#7fe0c8; color:#0f1020; font-weight:700; padding:8px 14px; border-radius:8px; border:0; cursor:pointer; font-size:.9rem; }
  .btn:hover { filter:brightness(1.08); text-decoration:none; }
  .btn.sm { padding:5px 10px; font-size:.82rem; }
  .btn.ghost { background:transparent; color:#7fe0c8; border:1px solid #34355f; }
  .btn.danger { background:#ff6b81; color:#160c12; }
  .btn.warn { background:#ffcf6b; color:#241a06; }
  input, select, textarea { width:100%; padding:9px 11px; background:#0f1020; border:1px solid #34355f; border-radius:8px; color:#e9e9f2; font:inherit; }
  textarea { min-height:340px; font-family:ui-monospace, monospace; font-size:13px; white-space:pre; }
  label { display:block; margin:12px 0 4px; font-size:.85rem; color:#b9b9d6; }
  .card { background:#171833; border:1px solid #2a2b52; border-radius:12px; padding:18px 20px; margin:16px 0; }
  .grid { display:grid; gap:16px; } .grid.two { grid-template-columns:1fr 1fr; }
  .row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .flash { background:#1e3a2f; border:1px solid #2f6a52; color:#a8f0cf; padding:10px 14px; border-radius:8px; margin-bottom:16px; }
  .pill { display:inline-block; padding:2px 8px; border-radius:999px; font-size:.78rem; background:#26274d; margin:2px; }
  .login-box { max-width:380px; margin:8vh auto; }
  .met { color:#7fe0c8; } .miss { color:#ff8fa3; }
  code, .mono { font-family:ui-monospace, monospace; }
  .inline { display:inline; }
  @media (max-width:640px){ .grid.two{grid-template-columns:1fr;} .topbar{flex-wrap:wrap;} }
CSS;
}
