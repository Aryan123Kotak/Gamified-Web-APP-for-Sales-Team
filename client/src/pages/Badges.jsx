import { useGame, rankFor } from '../store.jsx';

export default function Badges() {
  const { me, content } = useGame();
  const earned = new Set(me.progress.badges.map((b) => b.badge_id));
  const { current } = rankFor(content.ranks, me.user.xp);

  const specials = content.badges.filter((b) => !b.id.startsWith('module-'));
  const moduleBadges = content.badges.filter((b) => b.id.startsWith('module-'));

  return (
    <>
      <div className="panel center">
        <div style={{ fontSize: '3.4rem' }}>{me.user.avatar}</div>
        <h1 className="title-lg">{me.user.name}</h1>
        <div className="row mt-1" style={{ justifyContent: 'center' }}>
          <span className="sticker">{current.emoji} {current.name}</span>
          <span className="sticker green">⭐ {me.user.xp} XP</span>
          <span className="sticker cyan">🏆 {earned.size}/{content.badges.length} badges</span>
        </div>
        <div className="row mt-3" style={{ justifyContent: 'center', gap: 6 }}>
          {content.ranks.map((r) => (
            <span
              key={r.name}
              className="hud-pill"
              style={{
                opacity: me.user.xp >= r.xp ? 1 : 0.35,
                borderColor: current.name === r.name ? 'var(--pink)' : 'var(--ink)',
              }}
              title={`${r.xp} XP`}
            >
              {r.emoji} {r.name}
            </span>
          ))}
        </div>
      </div>

      <h2 className="title-md mt-4">⚡ Achievements</h2>
      <div className="badge-grid">
        {specials.map((b) => (
          <div key={b.id} className={`badge-tile ${earned.has(b.id) ? 'earned' : 'locked'}`}>
            <span className="b-emoji">{b.emoji}</span>
            <div className="b-name">{b.name}</div>
            <div className="muted small">{b.desc}</div>
          </div>
        ))}
      </div>

      <h2 className="title-md mt-4">🗺️ Module badges</h2>
      <div className="badge-grid">
        {moduleBadges.map((b) => (
          <div key={b.id} className={`badge-tile ${earned.has(b.id) ? 'earned' : 'locked'}`}>
            <span className="b-emoji">{b.emoji}</span>
            <div className="b-name">{b.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
