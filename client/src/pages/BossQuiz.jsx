import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGame } from '../store.jsx';
import { moduleStatus } from '../helpers.jsx';
import PromptCard from '../components/PromptCard.jsx';
import { confetti } from '../confetti.js';
import { sfx } from '../sounds.js';

export default function BossQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { me, content, submitQuiz, pushToast, refreshMe } = useGame();

  const mod = content.modules.find((m) => m.id === Number(id));
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [revealed, setRevealed] = useState(0); // questions replayed on result screen
  const [busy, setBusy] = useState(false);
  const [bossHitAnim, setBossHitAnim] = useState(false);

  if (!mod) return <p className="muted">Module not found.</p>;
  const s = moduleStatus(mod, me.progress);
  if (!s.unlocked || s.lessonsDone < s.totalLessons) {
    return (
      <div className="panel center" style={{ padding: 40 }}>
        <div style={{ fontSize: '3rem' }}>⚔️🔒</div>
        <p className="muted mt-2">Finish all lessons in this module first.</p>
        <Link to={`/module/${mod.id}`} className="btn mt-2">Back to module</Link>
      </div>
    );
  }

  const questions = mod.quiz;
  const total = questions.length;

  const lockIn = async () => {
    const nextAnswers = [...answers, selected];
    setSelected(null);
    sfx.click();
    if (nextAnswers.length < total) {
      setAnswers(nextAnswers);
      setQIndex(qIndex + 1);
      return;
    }
    // Final answer — send the whole fight to the server for grading.
    setBusy(true);
    try {
      const res = await submitQuiz(mod.id, nextAnswers);
      setResult(res);
      setAnswers(nextAnswers);
      // Replay the fight: reveal answers one by one.
      res.results.forEach((r, i) => {
        setTimeout(() => {
          setRevealed(i + 1);
          if (r.isCorrect) {
            sfx.correct();
            setBossHitAnim(true);
            setTimeout(() => setBossHitAnim(false), 460);
          } else {
            sfx.wrong();
          }
          if (i === res.results.length - 1) {
            setTimeout(() => {
              if (res.perfect) { confetti({ count: 200 }); sfx.levelup(); }
              else if (res.passed) { confetti({ count: 120 }); sfx.unlock(); }
              for (const b of res.newBadges) {
                const badge = content.badges.find((x) => x.id === b);
                if (badge) pushToast('badge', `${badge.emoji} Badge unlocked: ${badge.name}!`);
              }
              if (res.xpGained > 0) pushToast('xp', `+${res.xpGained} XP`);
              refreshMe();
            }, 500);
          }
        }, 650 * (i + 1));
      });
    } catch (e) {
      pushToast('error', e.message);
    } finally {
      setBusy(false);
    }
  };

  // ---------- result screen ----------
  if (result) {
    const bossHp = total - result.results.slice(0, revealed).filter((r) => r.isCorrect).length;
    const finished = revealed === total;
    return (
      <>
        <div className="panel center">
          <div className="boss-head" style={{ justifyContent: 'center' }}>
            <div className={`boss-emoji ${bossHitAnim ? 'hit' : ''}`}>{bossHp === 0 ? '💀' : mod.emoji}</div>
            <div style={{ flex: 1, maxWidth: 420 }}>
              <div className="game-font" style={{ color: 'var(--pink-2)' }}>BOSS HP</div>
              <div className="xpbar boss">
                <div className="fill" style={{ width: `${(bossHp / total) * 100}%` }} />
              </div>
            </div>
          </div>

          {finished && (
            <div className="mt-3">
              <div className="big-score">{result.score}/{result.total}</div>
              <h2 className="title-md mt-1">
                {result.perfect
                  ? '⚡ FLAWLESS VICTORY!'
                  : result.passed
                    ? '🎉 BOSS DEFEATED!'
                    : '💥 THE BOSS SURVIVES…'}
              </h2>
              {result.xpGained > 0 && (
                <div className="sticker green mt-2">+{result.xpGained} XP EARNED</div>
              )}
              {!result.passed && (
                <p className="muted mt-2">You need {Math.ceil(result.total * 0.8)}/{result.total} (80%) to win. Re-read the lessons and strike again!</p>
              )}
            </div>
          )}
        </div>

        <div className="panel mt-3">
          <h3 className="title-md">Battle log</h3>
          {result.results.slice(0, revealed).map((r, i) => (
            <div key={i} className="result-line">
              <span className="mark">{r.isCorrect ? '💥' : '🛡️'}</span>
              <div>
                <b>{questions[i].q}</b>
                <div className="small" style={{ color: r.isCorrect ? 'var(--green)' : 'var(--danger)' }}>
                  {r.isCorrect ? 'HIT! ' : `MISS — correct: "${questions[i].options[r.correct]}". `}
                  <span className="muted">{r.explain}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {finished && result.unlockedPrompts.length > 0 && (
          <div className="panel mt-3 acc-yellow">
            <h3 className="title-md" style={{ color: 'var(--yellow)' }}>🃏 NEW PROMPT CARDS UNLOCKED!</h3>
            {result.unlockedPrompts.map((p) => <PromptCard key={p.id} prompt={p} />)}
          </div>
        )}

        {finished && (
          <div className="row mt-3" style={{ justifyContent: 'center' }}>
            {result.passed ? (
              mod.id < 22 ? (
                <button className="btn lg green" onClick={() => navigate(`/module/${mod.id + 1}`)}>
                  NEXT LEVEL →
                </button>
              ) : (
                <Link className="btn lg yellow" to="/badges">👑 CLAIM YOUR CROWN</Link>
              )
            ) : (
              <>
                <Link className="btn ghost" to={`/module/${mod.id}`}>Re-read lessons</Link>
                <button
                  className="btn"
                  onClick={() => { setResult(null); setAnswers([]); setQIndex(0); setRevealed(0); }}
                >
                  ⚔️ FIGHT AGAIN
                </button>
              </>
            )}
          </div>
        )}
      </>
    );
  }

  // ---------- fight screen ----------
  const q = questions[qIndex];
  return (
    <>
      <div className="panel">
        <div className="boss-head">
          <div className="boss-emoji">{mod.emoji}</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span className="game-font" style={{ color: 'var(--pink-2)', fontSize: '1.1rem' }}>
              {mod.id === 22 ? '👑 FINAL CHALLENGE' : `CHALLENGE — ${mod.stage}`}
            </span>
            <h1 className="title-md" style={{ color: '#fff' }}>{mod.title}</h1>
            <div className="row mt-1">
              <div className="xpbar boss" style={{ flex: 1, height: 16 }}>
                <div className="fill" style={{ width: '100%' }} />
              </div>
              <b className="small">HP {total}/{total}</b>
            </div>
          </div>
        </div>
      </div>

      <div className="panel mt-3">
        <span className="sticker cyan">QUESTION {qIndex + 1} / {total}</span>
        <h2 style={{ fontSize: '1.25rem', marginTop: 12 }}>{q.q}</h2>
        <div className="mt-1">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${selected === i ? 'sel' : ''}`}
              onClick={() => { setSelected(i); sfx.click(); }}
            >
              <b className="game-font" style={{ marginRight: 8 }}>{'ABCD'[i]}</b> {opt}
            </button>
          ))}
        </div>
        <div className="row mt-3" style={{ justifyContent: 'flex-end' }}>
          <button className="btn lg" disabled={selected === null || busy} onClick={lockIn}>
            {qIndex + 1 === total ? '⚔️ FINAL STRIKE!' : 'LOCK IN →'}
          </button>
        </div>
      </div>
    </>
  );
}
