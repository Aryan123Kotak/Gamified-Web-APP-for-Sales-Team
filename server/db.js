import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

export const db = new Database(path.join(dataDir, 'arena.sqlite'));
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🦊',
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_active TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id INTEGER NOT NULL,
  module_id INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, module_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS quiz_results (
  user_id INTEGER NOT NULL,
  module_id INTEGER NOT NULL,
  best_score INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  aced_first_try INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, module_id)
);

CREATE TABLE IF NOT EXISTS mission_progress (
  user_id INTEGER NOT NULL,
  mission_id TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, mission_id)
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id INTEGER NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS xp_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_xp_events_user_time ON xp_events (user_id, created_at);
`);

// Migration: add aced_first_try to databases created before this column existed.
const quizCols = db.prepare(`PRAGMA table_info(quiz_results)`).all();
if (!quizCols.some((c) => c.name === 'aced_first_try')) {
  db.exec('ALTER TABLE quiz_results ADD COLUMN aced_first_try INTEGER NOT NULL DEFAULT 0');
}

// JWT secret: env var wins; otherwise generate once and persist alongside the DB.
const secretFile = path.join(dataDir, 'jwt-secret');
export const JWT_SECRET =
  process.env.JWT_SECRET ||
  (() => {
    if (!fs.existsSync(secretFile)) {
      fs.writeFileSync(secretFile, crypto.randomBytes(48).toString('hex'), { mode: 0o600 });
    }
    return fs.readFileSync(secretFile, 'utf8').trim();
  })();
