// Browser-only backend for the static (Hostinger shared-hosting) build.
// Replicates every server endpoint against localStorage so the app runs with
// no Node server. Progress lives in the visitor's own browser.
//
// Enabled when built with VITE_LOCAL=1. Response shapes match server/index.js
// exactly, so store.jsx and all pages work unchanged.

import {
  modules,
  XP,
  publicContent,
  allPrompts,
  allMissions,
  stageBadgeMap,
  findMission,
} from './game/index.js';

const PASS_RATIO = 0.8;
const MISSION_PASS = 65;

const LS = {
  profiles: 'arena_local_profiles',
  progressPrefix: 'arena_local_progress_',
  token: 'arena_token',
};

// ---------- storage helpers ----------
const readJSON = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};
const writeJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const getProfiles = () => readJSON(LS.profiles, []);
const saveProfiles = (p) => writeJSON(LS.profiles, p);

function blankProgress() {
  return {
    lessons: {}, // { moduleId: [lessonId] }
    quizzes: {}, // { moduleId: { best, total, attempts, acedFirstTry } }
    missions: {}, // { missionId: { best, band, submission, attempts } }
    badges: [], // [badgeId]
    xp: 0,
    streak: 0,
    lastActive: null,
  };
}
const getProgress = (id) => readJSON(LS.progressPrefix + id, blankProgress());
const saveProgress = (id, p) => writeJSON(LS.progressPrefix + id, p);

// Very light obfuscation for a local-only password (not real security — there
// is no server and no shared data, so nothing sensitive leaves this browser).
const hash = (s) => btoa(unescape(encodeURIComponent('arena:' + s)));

const currentId = () => localStorage.getItem(LS.token);

// ---------- domain logic (mirrors the server) ----------
const findModule = (id) => modules.find((m) => m.id === Number(id));

function addXp(prog, amount) {
  if (amount > 0) prog.xp += amount;
}
function grant(prog, badgeId, fresh) {
  if (!prog.badges.includes(badgeId)) {
    prog.badges.push(badgeId);
    if (fresh) fresh.push(badgeId);
  }
}

function snapshot(prog) {
  const lessonsDone = prog.lessons;
  const quizResults = {};
  for (const [mid, q] of Object.entries(prog.quizzes)) {
    quizResults[mid] = { best: q.best, total: q.total, attempts: q.attempts, passed: q.best >= Math.ceil(q.total * PASS_RATIO) };
  }
  const completed = modules
    .filter((m) => {
      const done = lessonsDone[m.id] || [];
      const allLessons = m.lessons.every((l) => done.includes(l.id));
      const qr = quizResults[m.id];
      return allLessons && !!qr && qr.passed;
    })
    .map((m) => m.id);
  const unlocked = modules.filter((m) => m.id === 0 || completed.includes(m.id - 1)).map((m) => m.id);

  const missionResults = {};
  for (const [mid, r] of Object.entries(prog.missions)) {
    missionResults[mid] = { best: r.best, band: r.band, submission: r.submission, attempts: r.attempts, passed: r.best >= MISSION_PASS };
  }
  const missionsDone = Object.entries(missionResults).filter(([, v]) => v.passed).map(([id]) => id);
  const badges = prog.badges.map((badge_id) => ({ badge_id, earned_at: '' }));
  const unlockedPromptIds = allPrompts.filter((p) => completed.includes(p.moduleId)).map((p) => p.id);

  return { lessonsDone, quizResults, completed, unlocked, missionResults, missionsDone, badges, unlockedPromptIds };
}

function refreshBadges(prog, snap) {
  const fresh = [];
  for (const id of snap.completed) grant(prog, `module-${id}`, fresh);
  if (snap.completed.length >= modules.length) grant(prog, 'champion', fresh);
  if (snap.unlockedPromptIds.length >= 15) grant(prog, 'vault-15', fresh);
  if (snap.unlockedPromptIds.length >= allPrompts.length) grant(prog, 'vault-all', fresh);
  if (snap.missionsDone.length >= allMissions.length) grant(prog, 'missions-all', fresh);
  for (const [badgeId, ids] of Object.entries(stageBadgeMap)) {
    if (ids.every((id) => snap.completed.includes(id))) grant(prog, badgeId, fresh);
  }
  const perfects = Object.values(prog.quizzes).filter((q) => q.acedFirstTry).length;
  if (perfects >= 1) grant(prog, 'perfect-boss', fresh);
  if (perfects >= 5) grant(prog, 'five-perfect', fresh);
  return fresh;
}

function gradeSubmission(mission, submissionRaw) {
  const submission = String(submissionRaw || '');
  const text = submission.toLowerCase();
  const words = submission.trim().split(/\s+/).filter(Boolean).length;
  const criteria = mission.rubric.map((c) => ({
    id: c.id, label: c.label, met: c.keywords.some((k) => text.includes(k.toLowerCase())), weight: c.weight || 1,
  }));
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0) || 1;
  const metWeight = criteria.reduce((s, c) => s + (c.met ? c.weight : 0), 0);
  let score = Math.round((metWeight / totalWeight) * 100);
  const minWords = mission.minWords || 40;
  let lengthNote = null;
  if (words < Math.ceil(minWords * 0.5)) { score = Math.min(score, 40); lengthNote = `Too short — aim for at least ${minWords} words to show real thinking.`; }
  else if (words < minWords) { score = Math.min(score, 75); lengthNote = `A bit short — around ${minWords}+ words would strengthen this.`; }
  const band = score >= 85 ? { level: 4, name: 'Can guide others' }
    : score >= 65 ? { level: 3, name: 'Competent' }
    : score >= 40 ? { level: 2, name: 'Developing' }
    : { level: 1, name: 'Needs support' };
  return { score, band, criteria, words, lengthNote, passed: score >= MISSION_PASS };
}

const userPublic = (p) => ({ id: p.id, name: p.name, email: p.email, avatar: p.avatar, xp: getProgress(p.id).xp, streak: getProgress(p.id).streak });
const fail = (msg) => { throw new Error(msg); };

// ---------- endpoint router ----------
export async function localApi(path, { method = 'GET', body } = {}) {
  const b = body || {};

  if (path === '/content') return publicContent();

  if (path === '/auth/register' && method === 'POST') {
    const name = (b.name || '').trim();
    if (!name) fail('Name is required');
    if (name.length > 60) fail('Name must be 60 characters or fewer');
    if (!b.email || !/^\S+@\S+\.\S+$/.test(b.email)) fail('A valid email is required');
    if (!b.password || b.password.length < 6) fail('Password must be at least 6 characters');
    const profiles = getProfiles();
    const email = b.email.toLowerCase();
    if (profiles.some((p) => p.email === email)) fail('That email is already registered on this device — log in instead');
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 6);
    const profile = { id, name, email, avatar: b.avatar || '🦊', pass: hash(b.password) };
    profiles.push(profile);
    saveProfiles(profiles);
    saveProgress(id, blankProgress());
    localStorage.setItem(LS.token, id);
    return { token: id, user: userPublic(profile) };
  }

  if (path === '/auth/login' && method === 'POST') {
    const profiles = getProfiles();
    const profile = profiles.find((p) => p.email === (b.email || '').toLowerCase());
    if (!profile || profile.pass !== hash(b.password || '')) fail('Wrong email or password (this device)');
    localStorage.setItem(LS.token, profile.id);
    return { token: profile.id, user: userPublic(profile) };
  }

  // ---- everything below needs a "logged-in" local profile ----
  const id = currentId();
  const profiles = getProfiles();
  const profile = profiles.find((p) => p.id === id);
  if (!profile) fail('Not logged in');
  const prog = getProgress(id);

  if (path === '/me') {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let daily = null;
    if (prog.lastActive !== today) {
      prog.streak = prog.lastActive === yesterday ? prog.streak + 1 : 1;
      prog.lastActive = today;
      addXp(prog, XP.DAILY_STREAK);
      daily = { amount: XP.DAILY_STREAK, streak: prog.streak };
      if (prog.streak >= 3) grant(prog, 'streak-3');
      if (prog.streak >= 7) grant(prog, 'streak-7');
    }
    const snap = snapshot(prog);
    refreshBadges(prog, snap);
    saveProgress(id, prog);
    return { user: userPublic(profile), progress: { ...snap, badges: prog.badges.map((badge_id) => ({ badge_id, earned_at: '' })) }, daily };
  }

  if (path === '/lessons/complete' && method === 'POST') {
    const mod = findModule(b.moduleId);
    if (!mod || !mod.lessons.some((l) => l.id === b.lessonId)) fail('Unknown lesson');
    const snap = snapshot(prog);
    if (!snap.unlocked.includes(mod.id)) fail('Level is still locked');
    const done = prog.lessons[mod.id] || (prog.lessons[mod.id] = []);
    let xpGained = 0;
    const newBadges = [];
    if (!done.includes(b.lessonId)) {
      done.push(b.lessonId);
      xpGained = XP.LESSON;
      addXp(prog, xpGained);
      grant(prog, 'first-lesson', newBadges);
    }
    const after = snapshot(prog);
    saveProgress(id, prog);
    return { xpGained, newBadges, progress: after };
  }

  if (path === '/quiz/submit' && method === 'POST') {
    const mod = findModule(b.moduleId);
    if (!mod) fail('Unknown module');
    const answers = b.answers;
    if (!Array.isArray(answers) || answers.length !== mod.quiz.length) fail('Answer every question before submitting');
    const snap = snapshot(prog);
    if (!snap.unlocked.includes(mod.id)) fail('Level is still locked');
    const done = prog.lessons[mod.id] || [];
    if (!mod.lessons.every((l) => done.includes(l.id))) fail('Finish all lessons first');

    const results = mod.quiz.map((q, i) => ({ yourAnswer: answers[i], correct: q.correct, isCorrect: Number(answers[i]) === q.correct, explain: q.explain }));
    const score = results.filter((r) => r.isCorrect).length;
    const total = mod.quiz.length;
    const passed = score >= Math.ceil(total * PASS_RATIO);
    const prev = prog.quizzes[mod.id];
    const prevBest = prev ? prev.best : 0;
    const acedFirstTry = !prev && score === total;
    let xpGained = 0;
    if (score > prevBest) xpGained += (score - prevBest) * XP.QUIZ_PER_CORRECT;
    if (acedFirstTry) xpGained += XP.QUIZ_PERFECT_BONUS;
    prog.quizzes[mod.id] = {
      best: Math.max(prevBest, score), total,
      attempts: (prev ? prev.attempts : 0) + 1,
      acedFirstTry: prev ? prev.acedFirstTry : acedFirstTry,
    };
    addXp(prog, xpGained);
    const after = snapshot(prog);
    const newBadges = refreshBadges(prog, after);
    const wasCompleted = snap.completed.includes(mod.id);
    const moduleCompleted = after.completed.includes(mod.id) && !wasCompleted;
    saveProgress(id, prog);
    return {
      score, total, passed, perfect: acedFirstTry, scoredFull: score === total,
      xpGained, results, newBadges, moduleCompleted,
      unlockedPrompts: moduleCompleted ? mod.prompts : [], progress: after,
    };
  }

  if (path === '/missions/submit' && method === 'POST') {
    const mission = findMission(b.missionId);
    if (!mission) fail('Unknown mission');
    if (typeof b.submission !== 'string' || b.submission.trim().length < 10) fail('Please write your submission before submitting.');
    if (b.submission.length > 8000) fail('Submission is too long (keep it under 8000 characters).');
    const snap = snapshot(prog);
    if (!snap.unlocked.includes(mission.moduleId)) fail("Unlock this mission's level first.");
    const graded = gradeSubmission(mission, b.submission);
    const prev = prog.missions[mission.id];
    const prevBest = prev ? prev.best : 0;
    let xpGained = 0;
    if (graded.score > prevBest) xpGained = Math.round((mission.maxXp * (graded.score - prevBest)) / 100);
    const keepScore = Math.max(prevBest, graded.score);
    prog.missions[mission.id] = {
      best: keepScore,
      band: graded.score >= prevBest ? graded.band.name : prev.band,
      submission: graded.score >= prevBest ? b.submission : prev.submission,
      attempts: (prev ? prev.attempts : 0) + 1,
    };
    addXp(prog, xpGained);
    const after = snapshot(prog);
    const newBadges = refreshBadges(prog, after);
    saveProgress(id, prog);
    return {
      score: graded.score, band: graded.band, criteria: graded.criteria, lengthNote: graded.lengthNote,
      passed: graded.passed, bestScore: keepScore, xpGained, maxXp: mission.maxXp, newBadges, progress: after,
    };
  }

  if (path === '/leaderboard') {
    // Local-only: everyone who has a profile in THIS browser.
    const rows = profiles
      .map((p) => {
        const pr = getProgress(p.id);
        const snap = snapshot(pr);
        return { id: p.id, name: p.name, avatar: p.avatar, xp: pr.xp, streak: pr.streak, modulesCleared: snap.completed.length };
      })
      .sort((a, b2) => b2.xp - a.xp)
      .slice(0, 50);
    const myRank = rows.findIndex((u) => u.id === id) + 1 || null;
    return { allTime: rows, weekly: rows, myRank };
  }

  fail('Unknown request');
}
