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

// Admin: serve real files, otherwise the admin front controller.
if (strpos($path, '/admin') === 0) {
  $rel = substr($path, strlen('/admin')) ?: '/';
  $file = __DIR__ . '/../php/admin' . $rel;
  if ($rel !== '/' && is_file($file)) return false; // let the server serve static asset
  require __DIR__ . '/../php/admin/index.php';
  return true;
}

return false;
