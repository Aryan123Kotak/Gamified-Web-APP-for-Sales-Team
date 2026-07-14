import { useEffect, useState } from 'react';
import { useGame, rankFor } from '../store.jsx';
import { api } from '../api.js';

export default function Leaderboard() {
  const { me, content } = useGame();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('allTime');
  const [error, setError] = useState('');

  useEffect(() => {
    api('/leaderboard').then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <p style={{ color: 'var(--danger)' }}>💥 {error}</p>;
  if (!data) return <div className="spin" />;

  const rows = data[tab] || [];
  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);
  const order = [1, 0, 2]; // podium display: 2nd, 1st, 3rd
  const stepCls = ['first', 'second', 'third'];
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <>
      <div className="center">
        <h1 className="title-lg">📊 THE ARENA RANKINGS</h1>
        <p className="muted mt-1">Whole-team leaderboard. XP is earned, never given. 😤</p>
      </div>

      <div className="tab-switch mt-3" style={{ maxWidth: 380, margin: '18px auto 0' }}>
        <button className={tab === 'allTime' ? 'active' : ''} onClick={() => setTab('allTime')}>
          All-time
        </button>
        <button className={tab === 'weekly' ? 'active' : ''} onClick={() => setTab('weekly')}>
          This week
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="muted center mt-3">No XP logged this week yet — be the first! ⚡</p>
      ) : (
        <>
          <div className="podium">
            {order
              .filter((i) => top3[i])
              .map((i) => {
                const u = top3[i];
                const rk = u.xp !== undefined && tab === 'allTime' ? rankFor(content.ranks, u.xp).current : null;
                return (
                  <div key={u.id} className={`step ${stepCls[i]}`}>
                    <div className="medal">{medals[i]}</div>
                    <div className="pl-avatar">{u.avatar}</div>
                    <b className="small" style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</b>
                    <div className="small" style={{ fontWeight: 900 }}>{u.xp} XP</div>
                    {rk && <div className="small">{rk.emoji}</div>}
                  </div>
                );
              })}
          </div>

          <div className="panel">
            {rows.map((u, i) => {
              const rk = tab === 'allTime' ? rankFor(content.ranks, u.xp).current : null;
              return (
                <div key={u.id} className={`lb-row ${u.id === me.user.id ? 'me' : ''}`}>
                  <span className="pos">{i + 1}</span>
                  <span style={{ fontSize: '1.5rem' }}>{u.avatar}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <b>{u.name}</b>
                    {rk && (
                      <span className="muted small" style={{ display: 'block' }}>
                        {rk.emoji} {rk.name}
                        {u.modulesCleared !== undefined && ` · ${u.modulesCleared}/${content.totals.modules} levels`}
                        {u.streak !== undefined && u.streak > 1 && ` · 🔥${u.streak}`}
                      </span>
                    )}
                  </div>
                  <b style={{ color: 'var(--green)' }}>{u.xp} XP</b>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
