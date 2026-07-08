import { Link } from 'react-router-dom';
import { useGame } from '../store.jsx';
import { moduleStatus, starsFor } from '../helpers.jsx';

export default function LevelMap() {
  const { me, content } = useGame();

  return (
    <>
      <div className="center">
        <h1 className="title-lg">🗺️ THE CAMPAIGN MAP</h1>
        <p className="muted mt-1">16 modules. Beat each boss to unlock the next. The crown awaits.</p>
      </div>

      <div className="map-track">
        {content.modules.map((m) => {
          const s = moduleStatus(m, me.progress);
          const stars = starsFor(s.quiz);
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
                  <span className="game-font" style={{ fontSize: '1.15rem', color: s.completed ? 'var(--green)' : 'var(--yellow)' }}>
                    {m.id === 15 ? 'FINAL BOSS' : `MODULE ${m.id}`}
                  </span>
                  {s.completed && <span className="stars">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>}
                  {s.bossReady && <span className="sticker pink" style={{ fontSize: '0.75rem' }}>BOSS READY!</span>}
                </div>
                <b style={{ display: 'block' }}>{m.title}</b>
                <span className="muted small">
                  {s.unlocked
                    ? `${s.lessonsDone}/${s.totalLessons} lessons${s.quiz ? ` · best ${s.quiz.best}/${s.quiz.total}` : ''}`
                    : `Beat Module ${m.id - 1} to unlock`}
                </span>
              </div>
              {s.unlocked && <span style={{ fontSize: '1.4rem' }}>{s.completed ? '✅' : '▶'}</span>}
            </div>
          );

          return s.unlocked ? (
            <Link key={m.id} to={`/module/${m.id}`} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={m.id} className={cls}>{inner}</div>
          );
        })}
      </div>
    </>
  );
}
