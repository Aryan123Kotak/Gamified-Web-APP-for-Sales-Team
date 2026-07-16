<?php
// ---------------------------------------------------------------------------
// AI Learning Arena — backend configuration
// ---------------------------------------------------------------------------
// COPY this file to  config.php  and fill in your values. config.php is git-
// ignored and is NEVER served to the browser (a direct hit executes PHP and
// returns nothing), so your database password and admin login stay private.
//
// On Hostinger: create a MySQL database + user in hPanel → Databases, then paste
// the name / user / password below.
// ---------------------------------------------------------------------------

return [
  // ----- Database (MySQL on Hostinger shared hosting) -----
  'db' => [
    'driver' => 'mysql',          // 'mysql' for production, 'sqlite' only for local testing
    'host'   => 'localhost',      // Hostinger MySQL host (usually 'localhost')
    'name'   => 'CHANGE_ME_db',   // database name
    'user'   => 'CHANGE_ME_user', // database user
    'pass'   => 'CHANGE_ME_pass', // database password
    // For local sqlite testing instead of MySQL, set driver to 'sqlite' and:
    'sqlite_path' => __DIR__ . '/data/arena.sqlite',
  ],

  // ----- Admin panel login (you control this) -----
  // Log in at /admin/ with these. Change them any time by editing this file.
  'admin' => [
    'email'    => 'admin@example.com',
    'password' => 'change-this-admin-password',
  ],

  // ----- Auth token signing secret -----
  // Leave '' to auto-generate & persist one next to this file (api/.auth-secret).
  // Or paste your own long random string (recommended for multi-server setups).
  'auth_secret' => '',

  // ----- Abuse protection -----
  'auth_rate_limit_max' => 20,    // max login/register attempts per IP per 15 min
];
