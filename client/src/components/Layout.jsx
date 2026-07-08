import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useGame, rankFor } from '../store.jsx';
import { isMuted, setMuted } from '../sounds.js';

const NAV = [
  { to: '/', label: '🏠 Base' },
  { to: '/map', label: '🗺️ Map' },
  { to: '/missions', label: '🎖️ Missions' },
  { to: '/vault', label: '🃏 Vault' },
  { to: '/badges', label: '🏆 Badges' },
  { to: '/leaderboard', label: '📊 Ranks' },
];

export default function Layout({ children }) {
  const { me, content, toasts, logout } = useGame();
  const [muted, setMutedState] = useState(isMuted());

  if (!me || !content) return <div className="spin" />;
  const { current, next } = rankFor(content.ranks, me.user.xp);
  const span = next ? next.xp - current.xp : 1;
  const pct = next ? Math.min(100, Math.round(((me.user.xp - current.xp) / span) * 100)) : 100;

  const toggleMute = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  return (
    <>
      <header className="hud">
        <div className="hud-inner">
          <Link to="/" className="logo">⚡ AI SALES ARENA</Link>
          <span className="spacer" />
          <span className="hud-pill" title="Daily streak">
            <span className="flame">🔥</span> {me.user.streak}
          </span>
          <span className="hud-pill" style={{ color: 'var(--green)' }}>⭐ {me.user.xp} XP</span>
          <span className="hud-pill" title={`Rank: ${current.name}`}>
            {current.emoji} {current.name}
          </span>
          <span className="hud-pill">{me.user.avatar} {me.user.name.split(' ')[0]}</span>
          <button className="btn ghost sm" onClick={toggleMute} title="Toggle sound">
            {muted ? '🔇' : '🔊'}
          </button>
          <button className="btn ghost sm" onClick={logout}>Exit</button>
        </div>
        <div className="hud-inner mt-1">
          <div className="xpbar" style={{ flex: 1, height: 14 }} title={next ? `${me.user.xp - current.xp}/${span} XP to ${next.name}` : 'MAX RANK'}>
            <div className="fill" style={{ width: `${pct}%` }} />
          </div>
          {next && (
            <span className="small muted" style={{ whiteSpace: 'nowrap' }}>
              {next.xp - me.user.xp} XP → {next.emoji} {next.name}
            </span>
          )}
        </div>
      </header>

      <nav className="nav">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
            {n.label}
          </NavLink>
        ))}
      </nav>

      <main className="page">{children}</main>

      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.kind}`}>{t.text}</div>
        ))}
      </div>
    </>
  );
}
