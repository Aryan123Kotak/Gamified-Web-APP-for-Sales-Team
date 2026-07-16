<?php
// Database connection + schema bootstrap. Supports MySQL (production) and
// SQLite (local testing) from the same code — the only place the two drivers
// differ is the CREATE TABLE dialect below. Everywhere else we pass timestamps
// from PHP (UTC) and check-then-insert instead of using dialect-specific upserts.

function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;

  $cfg = require __DIR__ . '/config.php';
  $d = $cfg['db'];

  if (($d['driver'] ?? 'mysql') === 'sqlite') {
    @mkdir(dirname($d['sqlite_path']), 0775, true);
    $pdo = new PDO('sqlite:' . $d['sqlite_path']);
    $pdo->exec('PRAGMA journal_mode = WAL');
    $pdo->exec('PRAGMA foreign_keys = ON');
    // Wait up to 5s for a lock instead of erroring immediately under concurrency.
    $pdo->exec('PRAGMA busy_timeout = 5000');
  } else {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $d['host'], $d['name']);
    $pdo = new PDO($dsn, $d['user'], $d['pass']);
  }
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

  init_schema($pdo);
  return $pdo;
}

function init_schema(PDO $pdo): void {
  $sqlite = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'sqlite';
  $autoId = $sqlite ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'INT AUTO_INCREMENT PRIMARY KEY';
  $eng    = $sqlite ? '' : ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4';

  $pdo->exec("CREATE TABLE IF NOT EXISTS users (
    id $autoId,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(16) NOT NULL DEFAULT '🦊',
    xp INT NOT NULL DEFAULT 0,
    streak INT NOT NULL DEFAULT 0,
    last_active VARCHAR(10) NULL,
    created_at VARCHAR(19) NOT NULL
  )$eng");

  $pdo->exec("CREATE TABLE IF NOT EXISTS lesson_progress (
    user_id INT NOT NULL,
    module_id INT NOT NULL,
    lesson_id VARCHAR(32) NOT NULL,
    completed_at VARCHAR(19) NOT NULL,
    PRIMARY KEY (user_id, module_id, lesson_id)
  )$eng");

  $pdo->exec("CREATE TABLE IF NOT EXISTS quiz_results (
    user_id INT NOT NULL,
    module_id INT NOT NULL,
    best_score INT NOT NULL DEFAULT 0,
    total INT NOT NULL,
    attempts INT NOT NULL DEFAULT 0,
    aced_first_try INT NOT NULL DEFAULT 0,
    updated_at VARCHAR(19) NOT NULL,
    PRIMARY KEY (user_id, module_id)
  )$eng");

  $pdo->exec("CREATE TABLE IF NOT EXISTS mission_progress (
    user_id INT NOT NULL,
    mission_id VARCHAR(64) NOT NULL,
    best_score INT NOT NULL DEFAULT 0,
    band VARCHAR(32) NULL,
    submission TEXT NULL,
    attempts INT NOT NULL DEFAULT 0,
    completed_at VARCHAR(19) NOT NULL,
    PRIMARY KEY (user_id, mission_id)
  )$eng");

  $pdo->exec("CREATE TABLE IF NOT EXISTS user_badges (
    user_id INT NOT NULL,
    badge_id VARCHAR(64) NOT NULL,
    earned_at VARCHAR(19) NOT NULL,
    PRIMARY KEY (user_id, badge_id)
  )$eng");

  $pdo->exec("CREATE TABLE IF NOT EXISTS xp_events (
    id $autoId,
    user_id INT NOT NULL,
    amount INT NOT NULL,
    reason VARCHAR(128) NOT NULL,
    created_at VARCHAR(19) NOT NULL
  )$eng");

  // Index name is global in some engines; IF NOT EXISTS keeps re-runs safe.
  try {
    $pdo->exec('CREATE INDEX idx_xp_events_user_time ON xp_events (user_id, created_at)');
  } catch (PDOException $e) { /* already exists */ }
}
