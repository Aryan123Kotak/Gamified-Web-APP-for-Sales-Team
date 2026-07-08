import { modulesA } from './modules-a.js';
import { modulesB } from './modules-b.js';

export const modules = [...modulesA, ...modulesB];

export const XP = {
  LESSON: 10,
  QUIZ_PER_CORRECT: 10,
  QUIZ_PERFECT_BONUS: 25,
  DAILY_STREAK: 5,
};

// Player ranks by total XP
export const ranks = [
  { xp: 0, name: 'AI Rookie', emoji: '🐣' },
  { xp: 120, name: 'Prompt Apprentice', emoji: '✏️' },
  { xp: 300, name: 'Framework Fighter', emoji: '🥋' },
  { xp: 550, name: 'Connector Cadet', emoji: '🔌' },
  { xp: 850, name: 'Automation Operator', emoji: '🤖' },
  { xp: 1200, name: 'Lead Hunter', emoji: '🎯' },
  { xp: 1600, name: 'Deal Closer', emoji: '💼' },
  { xp: 2000, name: '10× Seller', emoji: '👑' },
];

export const badgeCatalog = [
  // Special achievement badges
  { id: 'first-lesson', name: 'First Blood', emoji: '🩸', desc: 'Complete your first lesson' },
  { id: 'perfect-boss', name: 'Flawless Victory', emoji: '⚡', desc: 'Score 100% on any Boss Quiz' },
  { id: 'five-perfect', name: 'Boss Slayer', emoji: '🔥', desc: 'Score 100% on five Boss Quizzes' },
  { id: 'streak-3', name: 'On a Roll', emoji: '🎲', desc: 'Play 3 days in a row' },
  { id: 'streak-7', name: 'Unstoppable', emoji: '🌋', desc: 'Play 7 days in a row' },
  { id: 'vault-15', name: 'Card Collector', emoji: '🃏', desc: 'Unlock 15 Prompt Cards' },
  { id: 'vault-all', name: 'Vault Master', emoji: '💎', desc: 'Unlock every Prompt Card' },
  { id: 'missions-all', name: 'Field Commander', emoji: '🎖️', desc: 'Complete every real-world mission' },
  { id: 'halfway', name: 'Halfway Hero', emoji: '🛡️', desc: 'Clear 8 modules' },
  { id: 'champion', name: 'Arena Champion', emoji: '🏆', desc: 'Clear all 16 modules' },
  // One badge per module, earned by clearing it (all lessons + boss beaten)
  ...modules.map((m) => ({
    id: `module-${m.id}`,
    name: m.title,
    emoji: m.emoji,
    desc: `Clear Module ${m.id}: ${m.title}`,
  })),
];

export const allPrompts = modules.flatMap((m) =>
  m.prompts.map((p) => ({ ...p, moduleId: m.id, moduleTitle: m.title, moduleEmoji: m.emoji }))
);

export const allMissions = modules.flatMap((m) =>
  m.missions.map((mi) => ({ ...mi, moduleId: m.id, moduleTitle: m.title }))
);

export function rankFor(xp) {
  let current = ranks[0];
  let next = null;
  for (const r of ranks) {
    if (xp >= r.xp) current = r;
    else { next = r; break; }
  }
  return { current, next };
}

// Content as served to the client — quiz answers and explanations stripped.
export function publicContent() {
  return {
    modules: modules.map((m) => ({
      id: m.id,
      slug: m.slug,
      title: m.title,
      emoji: m.emoji,
      tagline: m.tagline,
      accent: m.accent,
      lessons: m.lessons,
      quizLength: m.quiz.length,
      quiz: m.quiz.map((q) => ({ q: q.q, options: q.options })),
      prompts: m.prompts,
      missions: m.missions,
    })),
    ranks,
    badges: badgeCatalog,
    xp: XP,
    totals: {
      modules: modules.length,
      lessons: modules.reduce((n, m) => n + m.lessons.length, 0),
      prompts: allPrompts.length,
      missions: allMissions.length,
    },
  };
}
