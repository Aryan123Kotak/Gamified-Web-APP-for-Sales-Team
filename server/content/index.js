import { stage1 } from './stage1.js';
import { stage2 } from './stage2.js';
import { stage3 } from './stage3.js';

// 23 levels across 3 stages, built from the Malpani Group AI Complete Teaching Guide.
export const modules = [...stage1, ...stage2, ...stage3];

export const stages = ['AI Ready', 'Advanced Toolkit', 'Automation Builder'];

export const XP = {
  LESSON: 10,
  QUIZ_PER_CORRECT: 10,
  QUIZ_PERFECT_BONUS: 25,
  DAILY_STREAK: 5,
};

// Player ranks by total XP — themed to the learning journey.
export const ranks = [
  { xp: 0, name: 'AI Newcomer', emoji: '🌱' },
  { xp: 150, name: 'AI Aware', emoji: '👀' },
  { xp: 400, name: 'Safe AI User', emoji: '🛡️' },
  { xp: 750, name: 'Prompt Practitioner', emoji: '✍️' },
  { xp: 1150, name: 'Toolkit Explorer', emoji: '🧭' },
  { xp: 1650, name: 'Advanced Operator', emoji: '⚙️' },
  { xp: 2200, name: 'Automation Builder', emoji: '🏗️' },
  { xp: 2800, name: 'AI Champion', emoji: '🏆' },
];

// Modules belonging to each stage (for stage-completion badges).
const stageModuleIds = (name) => modules.filter((m) => m.stage === name).map((m) => m.id);

export const badgeCatalog = [
  // Achievement badges
  { id: 'first-lesson', name: 'First Step', emoji: '👣', desc: 'Complete your first lesson' },
  { id: 'perfect-boss', name: 'Perfect Score', emoji: '⚡', desc: 'Ace a Boss Quiz on the first try' },
  { id: 'five-perfect', name: 'Sharp Mind', emoji: '🔥', desc: 'Ace five Boss Quizzes on the first try' },
  { id: 'streak-3', name: 'On a Roll', emoji: '🎲', desc: 'Learn 3 days in a row' },
  { id: 'streak-7', name: 'Committed', emoji: '🌋', desc: 'Learn 7 days in a row' },
  { id: 'vault-15', name: 'Toolkit Collector', emoji: '🃏', desc: 'Unlock 15 Prompt Cards' },
  { id: 'vault-all', name: 'Toolkit Master', emoji: '💎', desc: 'Unlock every Prompt Card' },
  { id: 'missions-all', name: 'Mission Accomplished', emoji: '🎖️', desc: 'Reach Competent on every mission' },
  { id: 'stage-ai-ready', name: 'AI Ready', emoji: '✅', desc: 'Clear all of Stage 1 — AI Ready' },
  { id: 'stage-toolkit', name: 'Toolkit Complete', emoji: '🧰', desc: 'Clear all of Stage 2 — Advanced Toolkit' },
  { id: 'stage-builder', name: 'Automation Builder', emoji: '🏗️', desc: 'Clear all of Stage 3 — Automation Builder' },
  { id: 'champion', name: 'AI Champion', emoji: '🏆', desc: 'Clear all 23 levels' },
  // One badge per level
  ...modules.map((m) => ({
    id: `module-${m.id}`,
    name: m.title,
    emoji: m.emoji,
    desc: `Clear: ${m.title}`,
  })),
];

export const stageBadgeMap = {
  'stage-ai-ready': stageModuleIds('AI Ready'),
  'stage-toolkit': stageModuleIds('Advanced Toolkit'),
  'stage-builder': stageModuleIds('Automation Builder'),
};

export const allPrompts = modules.flatMap((m) =>
  m.prompts.map((p) => ({ ...p, moduleId: m.id, moduleTitle: m.title, moduleEmoji: m.emoji }))
);

export const allMissions = modules.flatMap((m) =>
  m.missions.map((mi) => ({ ...mi, moduleId: m.id, moduleTitle: m.title }))
);

export const findMission = (id) => allMissions.find((m) => m.id === id);

export function rankFor(xp) {
  let current = ranks[0];
  let next = null;
  for (const r of ranks) {
    if (xp >= r.xp) current = r;
    else { next = r; break; }
  }
  return { current, next };
}

// Public mission shape — rubric keywords are stripped (server-only), but the
// criteria labels are shown so learners know what they'll be graded on.
function publicMission(mi) {
  return {
    id: mi.id,
    title: mi.title,
    brief: mi.brief,
    submitLabel: mi.submitLabel,
    minWords: mi.minWords,
    maxXp: mi.maxXp,
    criteria: mi.rubric.map((r) => ({ id: r.id, label: r.label })),
  };
}

// Content as served to the client — quiz answers and mission keywords stripped.
export function publicContent() {
  return {
    modules: modules.map((m) => ({
      id: m.id,
      stage: m.stage,
      slug: m.slug,
      title: m.title,
      emoji: m.emoji,
      tagline: m.tagline,
      accent: m.accent,
      lessons: m.lessons,
      quizLength: m.quiz.length,
      quiz: m.quiz.map((q) => ({ q: q.q, options: q.options })),
      prompts: m.prompts,
      missions: m.missions.map(publicMission),
    })),
    stages,
    ranks,
    badges: badgeCatalog,
    xp: XP,
    passPercent: 80,
    totals: {
      modules: modules.length,
      lessons: modules.reduce((n, m) => n + m.lessons.length, 0),
      prompts: allPrompts.length,
      missions: allMissions.length,
    },
  };
}
