import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGame, rankFor } from '../store.jsx';
import { moduleStatus } from '../helpers.jsx';
import { api } from '../api.js';
import PromptCard from '../components/PromptCard.jsx';

export default function Dashboard() {
  const { me, content } = useGame();
  const [top, setTop] = useState(null);

  useEffect(() => {
    api('/leaderboard').then((d) => setTop(d.allTime.slice(0, 3))).catch(() => {});
  }, [me.user.xp]);

  const { current, next } = rankFor(content.ranks, me.user.xp);
  const progress = me.progress;
  const statuses = content.modules.map((m) => ({ m, s: moduleStatus(m, progress) }));
  const nextUp =
    statuses.find(({ s }) => s.unlocked && !s.completed)?.m ??
    statuses[statuses.length - 1].m;
  const nextStatus = statuses.find(({ m }) => m.id === nextUp.id).s;

  // Prompt of the day: rotates daily through unlocked cards.
  const unlockedPrompts = content.modules
    .flatMap((m) => m.prompts)
    .filter((p) => progress.unlockedPromptIds.includes(p.id));
  const dayIndex = Math.floor(Date.now() / 86400000);
  const potd = unlockedPrompts.length
    ? unlockedPrompts[dayIndex % unlockedPrompts.length]
    : null;

  const stats = [
    { num: `${progress.completed.length}/${content.totals.modules}`, lbl: 'Modules cleared' },
    { num: `${progress.unlockedPromptIds.length}/${content.totals.prompts}`, lbl: 'Prompt cards' },
    { num: `${progress.missionsDone.length}/${content.totals.missions}`, lbl: 'Missions done' },
    { num: `${progress.badges.length}/${content.badges.length}`, lbl: 'Badges earned' },
  ];

  return (
    <>
      <div className="panel player-card">
        <div className="player-avatar">{me.user.avatar}</div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 className="title-lg">Hey {me.user.name.split(' ')[0]}!</h1>
          <div className="row mt-1">
            <span className="sticker">{current.emoji} {current.name}</span>
            <span className="sticker green">🔥 {me.user.streak}-day streak</span>
          </div>
          {next && (
            <p className="muted small mt-2">
              {next.xp - me.user.xp} XP until you become <b style={{ color: 'var(--yellow)' }}>{next.emoji} {next.name}</b>
            </p>
          )}
        </div>
        <Link to={`/module/${nextUp.id}`} className="btn lg green">
          {nextStatus.bossReady ? `⚔️ TAKE QUIZ · LEVEL ${nextUp.id}` : `▶ PLAY LEVEL ${nextUp.id}`}
        </Link>
      </div>

      <div className="grid cols-4 mt-3">
        {stats.map((s) => (
          <div key={s.lbl} className="panel stat-tile">
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="grid cols-2 mt-3">
        <div className="panel">
          <h2 className="title-md">🗓️ Prompt of the day</h2>
          {potd ? (
            <PromptCard prompt={potd} />
          ) : (
            <p className="muted mt-2">
              Clear <b>Level 3</b> to unlock your first Prompt Card — then a fresh one appears here every day.
            </p>
          )}
          <Link to="/vault" className="btn sm ghost mt-1">Open the Vault →</Link>
        </div>

        <div className="panel">
          <h2 className="title-md">🏆 Top of the arena</h2>
          {top === null ? (
            <p className="muted mt-2">Loading…</p>
          ) : (
            top.map((u, i) => (
              <div key={u.id} className={`lb-row ${u.id === me.user.id ? 'me' : ''}`}>
                <span className="pos">{['🥇', '🥈', '🥉'][i]}</span>
                <span style={{ fontSize: '1.4rem' }}>{u.avatar}</span>
                <b style={{ flex: 1 }}>{u.name}</b>
                <span style={{ color: 'var(--green)', fontWeight: 800 }}>{u.xp} XP</span>
              </div>
            ))
          )}
          <Link to="/leaderboard" className="btn sm ghost mt-2">Full leaderboard →</Link>
        </div>
      </div>

      <div className="panel mt-3" style={{ borderColor: 'var(--yellow)' }}>
        <div className="row">
          <span style={{ fontSize: '2rem' }}>🎖️</span>
          <div style={{ flex: 1 }}>
            <h2 className="title-md" style={{ color: 'var(--yellow)' }}>Graded missions</h2>
            <p className="muted small">
              Practise each skill for real, then submit your work. Every mission is marked out of 100 on a
              rubric — reach <b>Competent</b> (65+) to earn the badge. XP scales with your marks.
            </p>
          </div>
          <Link to="/missions" className="btn yellow sm">View missions</Link>
        </div>
      </div>
    </>
  );
}
