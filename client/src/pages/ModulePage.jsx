import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../store.jsx';
import { moduleStatus } from '../helpers.jsx';
import LessonBlocks from '../components/LessonBlocks.jsx';
import { sfx } from '../sounds.js';

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { me, content, completeLesson, pushToast } = useGame();
  const [openLesson, setOpenLesson] = useState(null);
  const [busy, setBusy] = useState(false);

  const mod = content.modules.find((m) => m.id === Number(id));
  if (!mod) return <p className="muted">Module not found.</p>;
  const s = moduleStatus(mod, me.progress);

  if (!s.unlocked) {
    return (
      <div className="panel center" style={{ padding: 40 }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <h1 className="title-lg">LOCKED</h1>
        <p className="muted mt-1">Clear Level {mod.id - 1} to unlock this one.</p>
        <Link className="btn mt-3" to={`/module/${mod.id - 1}`}>Go to Level {mod.id - 1}</Link>
      </div>
    );
  }

  const doneIds = me.progress.lessonsDone[mod.id] || [];
  const lesson = mod.lessons.find((l) => l.id === openLesson);

  const markDone = async (lessonId) => {
    setBusy(true);
    try {
      await completeLesson(mod.id, lessonId);
      setOpenLesson(null);
    } catch (e) {
      pushToast('error', e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className={`panel ${s.completed ? 'acc-green' : ''}`}>
        <div className="row">
          <div className="mod-emoji" style={{ width: 76, height: 76, fontSize: '2.6rem' }}>{mod.emoji}</div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <span className="game-font" style={{ color: 'var(--pink-2)', fontSize: '1.05rem' }}>
              {mod.id === 22 ? '👑 FINAL LEVEL' : `${mod.stage} · LEVEL ${mod.id}`}
            </span>
            <h1 className="title-lg">{mod.title}</h1>
            <p className="muted">{mod.tagline}</p>
          </div>
          {s.completed && <span className="sticker green">CLEARED ✔</span>}
        </div>
        <div className="row mt-2">
          <div className="xpbar" style={{ flex: 1 }}>
            <div className="fill" style={{ width: `${(s.lessonsDone / s.totalLessons) * 100}%` }} />
          </div>
          <b>{s.lessonsDone}/{s.totalLessons}</b>
        </div>
      </div>

      <div className="grid mt-3">
        {mod.lessons.map((l, i) => {
          const done = doneIds.includes(l.id);
          return (
            <div
              key={l.id}
              className={`panel lesson-row ${done ? 'done acc-green' : ''}`}
              onClick={() => { setOpenLesson(l.id); sfx.click(); }}
            >
              <div className="check">{done ? '✔' : i + 1}</div>
              <div style={{ flex: 1 }}>
                <b>{l.title}</b>
                {!done && <span className="muted small" style={{ display: 'block' }}>+{content.xp.LESSON} XP</span>}
              </div>
              <span className="game-font" style={{ color: 'var(--cyan)' }}>READ ▶</span>
            </div>
          );
        })}
      </div>

      <div className="panel mt-3 center" style={{ borderColor: 'var(--pink)' }}>
        {s.completed ? (
          <>
            <h2 className="title-md">Level cleared — best {s.quiz.best}/{s.quiz.total} 🎉</h2>
            <div className="row mt-2" style={{ justifyContent: 'center' }}>
              <button className="btn ghost" onClick={() => navigate(`/module/${mod.id}/boss`)}>
                🔁 Retake for a perfect score
              </button>
              {mod.id < 22 && (
                <Link className="btn green" to={`/module/${mod.id + 1}`}>Next level →</Link>
              )}
            </div>
          </>
        ) : s.bossReady ? (
          <>
            <h2 className="title-md" style={{ color: 'var(--pink-2)' }}>THE QUIZ AWAITS…</h2>
            <p className="muted small mt-1">{mod.quizLength} questions · need 80% to pass · +{content.xp.QUIZ_PER_CORRECT} XP each · flawless first try +{content.xp.QUIZ_PERFECT_BONUS} bonus</p>
            <button className="btn lg mt-2" onClick={() => { sfx.click(); navigate(`/module/${mod.id}/boss`); }}>
              ⚔️ TAKE THE QUIZ
            </button>
          </>
        ) : (
          <p className="muted">Finish all {s.totalLessons} lessons to unlock the quiz ⚔️</p>
        )}
      </div>

      {lesson && (
        <div className="modal-back" onClick={() => setOpenLesson(null)}>
          <div className="panel modal" onClick={(e) => e.stopPropagation()}>
            <span className="sticker cyan">LESSON {mod.lessons.findIndex((l) => l.id === lesson.id) + 1}</span>
            <h2 className="title-md mt-2" style={{ color: '#fff' }}>{lesson.title}</h2>
            <LessonBlocks body={lesson.body} module={mod} />
            <div className="row mt-2" style={{ justifyContent: 'flex-end' }}>
              <button className="btn ghost sm" onClick={() => setOpenLesson(null)}>Close</button>
              {!doneIds.includes(lesson.id) && (
                <button className="btn green" disabled={busy} onClick={() => markDone(lesson.id)}>
                  ✔ GOT IT (+{content.xp.LESSON} XP)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
