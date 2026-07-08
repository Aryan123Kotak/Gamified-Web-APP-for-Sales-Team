// Derived per-module status from the /me progress payload.
export function moduleStatus(mod, progress) {
  const done = progress.lessonsDone[mod.id] || [];
  const lessonsDone = mod.lessons.filter((l) => done.includes(l.id)).length;
  const quiz = progress.quizResults[mod.id] || null;
  const unlocked = progress.unlocked.includes(mod.id);
  const completed = progress.completed.includes(mod.id);
  const bossReady = unlocked && lessonsDone === mod.lessons.length && !completed;
  return { unlocked, completed, lessonsDone, totalLessons: mod.lessons.length, quiz, bossReady };
}

// 0–3 stars from the best boss-quiz score.
export function starsFor(quiz) {
  if (!quiz) return 0;
  const ratio = quiz.best / quiz.total;
  if (ratio === 1) return 3;
  if (ratio >= 0.8) return 2;
  if (quiz.passed) return 1;
  return 0;
}

// Render **bold** spans in content text.
export function renderBold(text) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p));
}
