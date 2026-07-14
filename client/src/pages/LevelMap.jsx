import { Link } from 'react-router-dom';
import { useGame } from '../store.jsx';
import { moduleStatus, starsFor } from '../helpers.jsx';

const STAGE_META = {
  'AI Ready': { n: 'STAGE 1', emoji: '🟢', tag: 'Foundations, safe use, prompting & verification' },
  'Advanced Toolkit': { n: 'STAGE 2', emoji: '🔵', tag: 'Projects, Vision, Research, Context, Connectors & MCP' },
  'Automation Builder': { n: 'STAGE 3', emoji: '🟣', tag: 'Select, map, build, secure & measure a safe workflow' },
};

export default function LevelMap() {
  const { me, content } = useGame();
  let lastStage = null;

  return (
    <>
      <div className="center">
        <h1 className="title-lg">🗺️ THE LEARNING JOURNEY</h1>
        <p className="muted mt-1">
          {content.totals.modules} levels across 3 stages. Clear each level (all lessons + an 80% quiz)
          to unlock the next.
        </p>
      </div>

      <div className="map-track">
        {content.modules.map((m) => {
          const s = moduleStatus(m, me.progress);
          const stars = starsFor(s.quiz);
          const showStage = m.stage !== lastStage;
          lastStage = m.stage;
          const meta = STAGE_META[m.stage];
          const cls = [
            'map-node',
            !s.unlocked && 'locked',
            s.completed && 'done',
            s.bossReady && 'boss-ready',
          ]
            .filter(Boolean)
            .join(' ');

          const inner = (
            <div className={`panel ${s.completed ? 'acc-green' : s.bossReady ? 'acc-pink' : ''}`}>
              <div className="mod-emoji">{s.unlocked ? m.emoji : '🔒'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="row" style={{ gap: 8 }}>
                  <span className="game-font" style={{ fontSize: '1.1rem', color: s.completed ? 'var(--green)' : 'var(--yellow)' }}>
                    {m.id === 22 ? 'FINAL LEVEL' : `LEVEL ${m.id}`}
                  </span>
                  {s.completed && <span className="stars">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>}
                  {s.bossReady && <span className="sticker pink" style={{ fontSize: '0.72rem' }}>QUIZ READY!</span>}
                </div>
                <b style={{ display: 'block' }}>{m.title}</b>
                <span className="muted small">
                  {s.unlocked
                    ? `${s.lessonsDone}/${s.totalLessons} lessons${s.quiz ? ` · best ${s.quiz.best}/${s.quiz.total}` : ''}`
                    : `Clear Level ${m.id - 1} to unlock`}
                </span>
              </div>
              {s.unlocked && <span style={{ fontSize: '1.4rem' }}>{s.completed ? '✅' : '▶'}</span>}
            </div>
          );

          return (
            <div key={m.id}>
              {showStage && meta && (
                <div className="stage-banner">
                  <span className="game-font">{meta.emoji} {meta.n} · {m.stage}</span>
                  <span className="small muted">{meta.tag}</span>
                </div>
              )}
              {s.unlocked ? (
                <Link to={`/module/${m.id}`} className={cls}>{inner}</Link>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
