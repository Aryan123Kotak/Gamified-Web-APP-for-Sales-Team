import { useState } from 'react';
import { useGame } from '../store.jsx';
import { sfx } from '../sounds.js';

export default function Missions() {
  const { me, content, completeMission, pushToast } = useGame();
  const [busyId, setBusyId] = useState(null);

  const missions = content.modules.flatMap((m) =>
    m.missions.map((mi) => ({ ...mi, module: m }))
  );
  const done = me.progress.missionsDone;
  const unlockedModules = me.progress.unlocked;

  const mark = async (id) => {
    setBusyId(id);
    sfx.click();
    try {
      await completeMission(id);
    } catch (e) {
      pushToast('error', e.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <div className="center">
        <h1 className="title-lg">🎖️ REAL-WORLD MISSIONS</h1>
        <p className="muted mt-1">
          These happen at your actual desk, not in the app. Do the thing, then claim the XP — this is where the 10× lives.
        </p>
        <div className="sticker green mt-2">{done.length} / {missions.length} COMPLETE</div>
      </div>

      <div className="grid mt-3">
        {missions.map((mi) => {
          const isDone = done.includes(mi.id);
          const unlocked = unlockedModules.includes(mi.module.id);
          return (
            <div key={mi.id} className={`panel mission-row ${isDone ? 'done acc-green' : ''}`}>
              <div className="m-check">{isDone ? '✔' : unlocked ? mi.module.emoji : '🔒'}</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div className="row" style={{ gap: 8 }}>
                  <b>{mi.title}</b>
                  <span className="sticker" style={{ fontSize: '0.7rem' }}>+{mi.xp} XP</span>
                </div>
                <p className="muted small mt-1">{mi.desc}</p>
                <span className="small" style={{ color: 'var(--cyan)' }}>
                  From Module {mi.module.id}: {mi.module.title}
                </span>
              </div>
              {!isDone && (
                <button
                  className="btn green sm"
                  disabled={!unlocked || busyId === mi.id}
                  onClick={() => mark(mi.id)}
                  title={unlocked ? 'Mark as done in real life' : `Unlock Module ${mi.module.id} first`}
                >
                  {unlocked ? '✔ I DID IT' : 'LOCKED'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="muted small center mt-3">
        Honour system, sales champ — only claim a mission you actually completed. Your future pipeline is watching. 👀
      </p>
    </>
  );
}
