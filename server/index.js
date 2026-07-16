import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, JWT_SECRET } from './db.js';
import {
  modules,
  XP,
  publicContent,
  allPrompts,
  allMissions,
  badgeCatalog,
  stageBadgeMap,
  findMission,
} from './content/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Security headers. CSP allows Google Fonts and inline styles (the UI is styled
// with React inline styles); scripts are locked to same-origin and the app
// cannot be framed (clickjacking protection).
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
  })
);

// CORS: same-origin and non-browser clients (no Origin header) are always fine.
// Cross-origin browser requests are only allowed from an explicit allowlist.
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:4000'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(null, false); // no CORS headers → browser blocks the response
    },
  })
);

app.use(express.json({ limit: '32kb' }));

// Tidy response for oversized or malformed JSON bodies (4-arg = error handler).
app.use((err, _req, res, next) => {
  if (!err) return next();
  const tooLarge = err.type === 'entity.too.large';
  return res
    .status(tooLarge ? 413 : 400)
    .json({ error: tooLarge ? 'Request body too large' : 'Malformed request' });
});

const PORT = process.env.PORT || 4000;
const PASS_RATIO = 0.8; // score needed to beat a boss quiz (80%)
const MISSION_PASS = 65; // marks needed for a mission to count as "competent" / done

// Throttle auth endpoints against brute-force and mass-registration.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT_MAX) || 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts — please wait a few minutes and try again.' },
});

// A fixed bcrypt hash of a random value, used to spend the same time verifying a
// password when the email is unknown — closes the login timing side-channel.
const DUMMY_HASH = bcrypt.hashSync('unused-timing-equalizer', 10);

// ---------- helpers ----------

const findModule = (id) => modules.find((m) => m.id === Number(id));

function signToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '30d' });
}

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not logged in' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Session expired — log in again' });
  }
}

function addXp(userId, amount, reason) {
  if (amount <= 0) return;
  db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?').run(amount, userId);
  db.prepare('INSERT INTO xp_events (user_id, amount, reason) VALUES (?, ?, ?)').run(
    userId,
    amount,
    reason
  );
}

function awardBadge(userId, badgeId) {
  const r = db
    .prepare('INSERT OR IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)')
    .run(userId, badgeId);
  return r.changes > 0;
}

function lessonsDoneFor(userId) {
  const rows = db
    .prepare('SELECT module_id, lesson_id FROM lesson_progress WHERE user_id = ?')
    .all(userId);
  const map = {};
  for (const r of rows) (map[r.module_id] ||= []).push(r.lesson_id);
  return map;
}

function quizResultsFor(userId) {
  const rows = db.prepare('SELECT * FROM quiz_results WHERE user_id = ?').all(userId);
  const map = {};
  for (const r of rows) {
    map[r.module_id] = {
      best: r.best_score,
      total: r.total,
      attempts: r.attempts,
      passed: r.best_score >= Math.ceil(r.total * PASS_RATIO),
    };
  }
  return map;
}

function moduleCompleted(m, lessonsDone, quizResults) {
  const done = lessonsDone[m.id] || [];
  const allLessons = m.lessons.every((l) => done.includes(l.id));
  const quiz = quizResults[m.id];
  return allLessons && !!quiz && quiz.passed;
}

function missionResultsFor(userId) {
  const rows = db.prepare('SELECT * FROM mission_progress WHERE user_id = ?').all(userId);
  const map = {};
  for (const r of rows) {
    map[r.mission_id] = {
      best: r.best_score,
      band: r.band,
      submission: r.submission,
      attempts: r.attempts,
      passed: r.best_score >= MISSION_PASS,
    };
  }
  return map;
}

function progressSnapshot(userId) {
  const lessonsDone = lessonsDoneFor(userId);
  const quizResults = quizResultsFor(userId);
  const completed = modules.filter((m) => moduleCompleted(m, lessonsDone, quizResults)).map((m) => m.id);
  const unlocked = modules
    .filter((m) => m.id === 0 || completed.includes(m.id - 1))
    .map((m) => m.id);
  const missionResults = missionResultsFor(userId);
  const missionsDone = Object.entries(missionResults)
    .filter(([, v]) => v.passed)
    .map(([id]) => id);
  const badges = db
    .prepare('SELECT badge_id, earned_at FROM user_badges WHERE user_id = ?')
    .all(userId);
  const unlockedPromptIds = allPrompts
    .filter((p) => completed.includes(p.moduleId))
    .map((p) => p.id);
  return { lessonsDone, quizResults, completed, unlocked, missionResults, missionsDone, badges, unlockedPromptIds };
}

// Award any badges implied by the current progress state. Returns newly earned badge ids.
function refreshBadges(userId, snap) {
  const fresh = [];
  const grant = (id) => {
    if (awardBadge(userId, id)) fresh.push(id);
  };

  for (const id of snap.completed) grant(`module-${id}`);
  if (snap.completed.length >= modules.length) grant('champion');
  if (snap.unlockedPromptIds.length >= 15) grant('vault-15');
  if (snap.unlockedPromptIds.length >= allPrompts.length) grant('vault-all');
  if (snap.missionsDone.length >= allMissions.length) grant('missions-all');

  // Stage-completion badges — every module in a stage cleared.
  for (const [badgeId, moduleIds] of Object.entries(stageBadgeMap)) {
    if (moduleIds.every((id) => snap.completed.includes(id))) grant(badgeId);
  }

  const perfects = db
    .prepare('SELECT COUNT(*) AS n FROM quiz_results WHERE user_id = ? AND aced_first_try = 1')
    .get(userId).n;
  if (perfects >= 1) grant('perfect-boss');
  if (perfects >= 5) grant('five-perfect');

  return fresh;
}

// ---------- mission auto-grading ----------
// Rubric criteria are keyword-matched against the learner's submission.
// Returns marks 0–100, a 4-point band, and per-criterion feedback.
function gradeSubmission(mission, submissionRaw) {
  const submission = String(submissionRaw || '');
  const text = submission.toLowerCase();
  const words = submission.trim().split(/\s+/).filter(Boolean).length;

  const criteria = mission.rubric.map((c) => {
    const hit = c.keywords.some((k) => text.includes(k.toLowerCase()));
    return { id: c.id, label: c.label, met: hit, weight: c.weight || 1 };
  });

  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0) || 1;
  const metWeight = criteria.reduce((s, c) => s + (c.met ? c.weight : 0), 0);
  let score = Math.round((metWeight / totalWeight) * 100);

  // Effort gate: a submission well under the asked length is capped, because
  // a few keywords alone are not a genuine attempt.
  const minWords = mission.minWords || 40;
  let lengthNote = null;
  if (words < Math.ceil(minWords * 0.5)) {
    score = Math.min(score, 40);
    lengthNote = `Too short — aim for at least ${minWords} words to show real thinking.`;
  } else if (words < minWords) {
    score = Math.min(score, 75);
    lengthNote = `A bit short — around ${minWords}+ words would strengthen this.`;
  }

  const band =
    score >= 85 ? { level: 4, name: 'Can guide others' }
    : score >= 65 ? { level: 3, name: 'Competent' }
    : score >= 40 ? { level: 2, name: 'Developing' }
    : { level: 1, name: 'Needs support' };

  return { score, band, criteria, words, lengthNote, passed: score >= MISSION_PASS };
}

function userPublic(u) {
  return { id: u.id, name: u.name, email: u.email, avatar: u.avatar, xp: u.xp, streak: u.streak };
}

// ---------- auth ----------

const ALLOWED_AVATARS = new Set([
  '🦊', '🦁', '🐯', '🦅', '🐺', '🦈', '🐉', '🦄', '🐼', '🐱', '🤖', '👽', '🥷',
]);

app.post('/api/auth/register', authLimiter, (req, res) => {
  const { name, email, password, avatar } = req.body || {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  if (!cleanName) return res.status(400).json({ error: 'Name is required' });
  if (cleanName.length > 60)
    return res.status(400).json({ error: 'Name must be 60 characters or fewer' });
  if (!email || typeof email !== 'string' || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email))
    return res.status(400).json({ error: 'A valid email is required' });
  if (typeof password !== 'string' || password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  if (password.length > 200)
    return res.status(400).json({ error: 'Password must be 200 characters or fewer' });

  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (exists) return res.status(409).json({ error: 'That email is already registered — log in instead' });

  const safeAvatar = ALLOWED_AVATARS.has(avatar) ? avatar : '🦊';
  const hash = bcrypt.hashSync(password, 10);
  const r = db
    .prepare('INSERT INTO users (name, email, password_hash, avatar) VALUES (?, ?, ?, ?)')
    .run(cleanName, email.toLowerCase(), hash, safeAvatar);
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(r.lastInsertRowid);
  res.json({ token: signToken(user), user: userPublic(user) });
});

app.post('/api/auth/login', authLimiter, (req, res) => {
  const { email, password } = req.body || {};
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get((email || '').toLowerCase());
  // Always run a bcrypt comparison — against a dummy hash when the email is
  // unknown — so the response time doesn't reveal whether an account exists.
  const ok = bcrypt.compareSync(
    typeof password === 'string' ? password : '',
    user ? user.password_hash : DUMMY_HASH
  );
  if (!user || !ok) return res.status(401).json({ error: 'Wrong email or password' });
  res.json({ token: signToken(user), user: userPublic(user) });
});

// ---------- content ----------

app.get('/api/content', (_req, res) => {
  res.json(publicContent());
});

// ---------- me (also applies the daily streak) ----------

app.get('/api/me', auth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(401).json({ error: 'Account not found' });

  // Daily streak: first request of a new day bumps it (yesterday keeps the chain).
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let daily = null;
  if (user.last_active !== today) {
    const streak = user.last_active === yesterday ? user.streak + 1 : 1;
    db.prepare('UPDATE users SET streak = ?, last_active = ? WHERE id = ?').run(
      streak,
      today,
      user.id
    );
    addXp(user.id, XP.DAILY_STREAK, 'daily-streak');
    user.streak = streak;
    user.xp += XP.DAILY_STREAK;
    daily = { amount: XP.DAILY_STREAK, streak };
    if (streak >= 3) awardBadge(user.id, 'streak-3');
    if (streak >= 7) awardBadge(user.id, 'streak-7');
  }

  const snap = progressSnapshot(user.id);
  refreshBadges(user.id, snap);
  const badges = db
    .prepare('SELECT badge_id, earned_at FROM user_badges WHERE user_id = ?')
    .all(user.id);

  res.json({ user: userPublic(user), progress: { ...snap, badges }, daily });
});

// ---------- lessons ----------

app.post('/api/lessons/complete', auth, (req, res) => {
  const { moduleId, lessonId } = req.body || {};
  const mod = findModule(moduleId);
  if (!mod) return res.status(400).json({ error: 'Unknown module' });
  if (!mod.lessons.some((l) => l.id === lessonId))
    return res.status(400).json({ error: 'Unknown lesson' });

  const snap = progressSnapshot(req.userId);
  if (!snap.unlocked.includes(mod.id))
    return res.status(403).json({ error: 'Module is still locked — beat the previous boss first' });

  const r = db
    .prepare(
      'INSERT OR IGNORE INTO lesson_progress (user_id, module_id, lesson_id) VALUES (?, ?, ?)'
    )
    .run(req.userId, mod.id, lessonId);

  let xpGained = 0;
  const newBadges = [];
  if (r.changes > 0) {
    xpGained = XP.LESSON;
    addXp(req.userId, xpGained, `lesson:${mod.id}/${lessonId}`);
    if (awardBadge(req.userId, 'first-lesson')) newBadges.push('first-lesson');
  }

  const after = progressSnapshot(req.userId);
  res.json({ xpGained, newBadges, progress: after });
});

// ---------- boss quiz ----------

app.post('/api/quiz/submit', auth, (req, res) => {
  const { moduleId, answers } = req.body || {};
  const mod = findModule(moduleId);
  if (!mod) return res.status(400).json({ error: 'Unknown module' });
  if (!Array.isArray(answers) || answers.length !== mod.quiz.length)
    return res.status(400).json({ error: 'Answer every question before submitting' });

  const snap = progressSnapshot(req.userId);
  if (!snap.unlocked.includes(mod.id))
    return res.status(403).json({ error: 'Module is still locked' });
  const done = snap.lessonsDone[mod.id] || [];
  if (!mod.lessons.every((l) => done.includes(l.id)))
    return res.status(403).json({ error: 'Finish all lessons before challenging the boss' });

  const results = mod.quiz.map((q, i) => ({
    yourAnswer: answers[i],
    correct: q.correct,
    isCorrect: Number(answers[i]) === q.correct,
    explain: q.explain,
  }));
  const score = results.filter((r) => r.isCorrect).length;
  const total = mod.quiz.length;
  const passed = score >= Math.ceil(total * PASS_RATIO);

  const prev = db
    .prepare('SELECT * FROM quiz_results WHERE user_id = ? AND module_id = ?')
    .get(req.userId, mod.id);
  const prevBest = prev ? prev.best_score : 0;

  // A "flawless" ace only counts on the very first attempt at a module's quiz.
  // The submit response reveals correct answers (for learning), so without this
  // a player could fail once, read the answers, resubmit, and farm the perfect
  // bonus + badge. Improvement XP still accrues on retakes up to the honest max.
  const acedFirstTry = !prev && score === total;

  let xpGained = 0;
  if (score > prevBest) xpGained += (score - prevBest) * XP.QUIZ_PER_CORRECT;
  if (acedFirstTry) xpGained += XP.QUIZ_PERFECT_BONUS;

  if (prev) {
    db.prepare(
      `UPDATE quiz_results SET best_score = MAX(best_score, ?), attempts = attempts + 1,
       updated_at = datetime('now') WHERE user_id = ? AND module_id = ?`
    ).run(score, req.userId, mod.id);
  } else {
    db.prepare(
      `INSERT INTO quiz_results (user_id, module_id, best_score, total, attempts, aced_first_try)
       VALUES (?, ?, ?, ?, 1, ?)`
    ).run(req.userId, mod.id, score, total, acedFirstTry ? 1 : 0);
  }
  if (xpGained) addXp(req.userId, xpGained, `quiz:${mod.id}`);

  const after = progressSnapshot(req.userId);
  const newBadges = refreshBadges(req.userId, after);
  const moduleNowCompleted = after.completed.includes(mod.id) && !snap.completed.includes(mod.id);
  const unlockedPrompts = moduleNowCompleted ? mod.prompts : [];

  res.json({
    score,
    total,
    passed,
    perfect: acedFirstTry, // "flawless" is reserved for a first-attempt ace
    scoredFull: score === total, // this attempt got every question right
    xpGained,
    results,
    newBadges,
    moduleCompleted: moduleNowCompleted,
    unlockedPrompts,
    progress: after,
  });
});

// ---------- missions (submission-graded) ----------

app.post('/api/missions/submit', auth, (req, res) => {
  const { missionId, submission } = req.body || {};
  const mission = findMission(missionId);
  if (!mission) return res.status(400).json({ error: 'Unknown mission' });
  if (typeof submission !== 'string' || submission.trim().length < 10)
    return res.status(400).json({ error: 'Please write your submission before submitting.' });
  if (submission.length > 8000)
    return res.status(400).json({ error: 'Submission is too long (keep it under 8000 characters).' });

  const snap = progressSnapshot(req.userId);
  if (!snap.unlocked.includes(mission.moduleId))
    return res.status(403).json({ error: "Unlock this mission's level first." });

  const graded = gradeSubmission(mission, submission);

  const prev = db
    .prepare('SELECT * FROM mission_progress WHERE user_id = ? AND mission_id = ?')
    .get(req.userId, missionId);
  const prevBest = prev ? prev.best_score : 0;

  // XP is scaled by marks and only paid for improving your best — no farming.
  let xpGained = 0;
  if (graded.score > prevBest) {
    const gainedMarks = graded.score - prevBest;
    xpGained = Math.round((mission.maxXp * gainedMarks) / 100);
  }

  const keepScore = Math.max(prevBest, graded.score);
  // Store the submission + band of whichever attempt scored highest.
  const storeBand = graded.score >= prevBest ? graded.band.name : prev.band;
  const storeSubmission = graded.score >= prevBest ? submission : prev.submission;

  if (prev) {
    db.prepare(
      `UPDATE mission_progress SET best_score = ?, band = ?, submission = ?,
       attempts = attempts + 1, completed_at = datetime('now')
       WHERE user_id = ? AND mission_id = ?`
    ).run(keepScore, storeBand, storeSubmission, req.userId, missionId);
  } else {
    db.prepare(
      `INSERT INTO mission_progress (user_id, mission_id, best_score, band, submission, attempts)
       VALUES (?, ?, ?, ?, ?, 1)`
    ).run(req.userId, missionId, graded.score, graded.band.name, submission);
  }
  if (xpGained) addXp(req.userId, xpGained, `mission:${missionId}`);

  const after = progressSnapshot(req.userId);
  const newBadges = refreshBadges(req.userId, after);

  res.json({
    score: graded.score,
    band: graded.band,
    criteria: graded.criteria, // [{ label, met }]
    lengthNote: graded.lengthNote,
    passed: graded.passed,
    bestScore: keepScore,
    xpGained,
    maxXp: mission.maxXp,
    newBadges,
    progress: after,
  });
});

// ---------- leaderboard ----------

app.get('/api/leaderboard', auth, (req, res) => {
  const allTime = db
    .prepare(
      `SELECT u.id, u.name, u.avatar, u.xp, u.streak,
        (SELECT COUNT(*) FROM user_badges b WHERE b.user_id = u.id AND b.badge_id LIKE 'module-%') AS modulesCleared
       FROM users u ORDER BY u.xp DESC, u.created_at ASC LIMIT 50`
    )
    .all();

  const weekly = db
    .prepare(
      `SELECT u.id, u.name, u.avatar, COALESCE(SUM(e.amount), 0) AS xp
       FROM users u
       JOIN xp_events e ON e.user_id = u.id AND e.created_at >= datetime('now', '-7 day')
       GROUP BY u.id ORDER BY xp DESC LIMIT 50`
    )
    .all();

  const myRank = allTime.findIndex((u) => u.id === req.userId) + 1 || null;
  res.json({ allTime, weekly, myRank });
});

// ---------- static client (production) ----------

const dist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(dist));
app.get(/^\/(?!api\/).*/, (_req, res, next) => {
  res.sendFile(path.join(dist, 'index.html'), (err) => err && next());
});

app.listen(PORT, () => {
  console.log(`⚡ AI Sales Arena server running on http://localhost:${PORT}`);
});
