<?php
// Dev router for `php -S` — emulates the Apache rewrite rules so we can smoke-test
// the API and admin panel locally. NOT used in production (Apache uses .htaccess).
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// API: everything under /api goes through the front controller.
if (strpos($path, '/api') === 0) {
  $_SERVER['SCRIPT_NAME'] = '/api/index.php';
  require __DIR__ . '/../php/api/index.php';
  return true;
}

// Admin: serve real files (e.g. admin.js) directly, otherwise the front controller.
if (strpos($path, '/admin') === 0) {
  $rel = substr($path, strlen('/admin')) ?: '/';
  $file = __DIR__ . '/../php/admin' . $rel;
  if ($rel !== '/' && is_file($file) && !str_ends_with($file, '.php')) {
    $types = ['js' => 'application/javascript', 'css' => 'text/css', 'png' => 'image/png', 'svg' => 'image/svg+xml'];
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
    readfile($file);
    return true;
  }
  require __DIR__ . '/../php/admin/index.php';
  return true;
}

return false;
