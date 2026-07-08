import { useState } from 'react';
import { useGame } from '../store.jsx';
import PromptCard from '../components/PromptCard.jsx';
import { sfx } from '../sounds.js';

export default function Vault() {
  const { me, content } = useGame();
  const [open, setOpen] = useState(null);

  const unlockedIds = me.progress.unlockedPromptIds;
  const cards = content.modules.flatMap((m) =>
    m.prompts.map((p) => ({ ...p, module: m }))
  );
  const unlockedCount = cards.filter((c) => unlockedIds.includes(c.id)).length;

  return (
    <>
      <div className="center">
        <h1 className="title-lg">🃏 THE PROMPT VAULT</h1>
        <p className="muted mt-1">
          Every copy-paste prompt from the playbook, as collectible cards. Clear a module's boss to claim its cards.
        </p>
        <div className="sticker yellow mt-2" style={{ background: 'var(--yellow)' }}>
          {unlockedCount} / {cards.length} COLLECTED
        </div>
      </div>

      <div className="vault-grid">
        {cards.map((c) => {
          const unlocked = unlockedIds.includes(c.id);
          return unlocked ? (
            <div
              key={c.id}
              className={`vault-card ${c.rarity}`}
              onClick={() => { setOpen(c); sfx.click(); }}
            >
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.5rem' }}>{c.module.emoji}</span>
                <span className={`rarity ${c.rarity}`}>{c.rarity}</span>
              </div>
              <div className="vc-title">{c.title}</div>
              <p className="muted small" style={{ flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {c.text}
              </p>
              <span className="small" style={{ color: 'var(--cyan)', fontWeight: 800 }}>TAP TO OPEN ▸</span>
            </div>
          ) : (
            <div key={c.id} className="vault-card locked center">
              <span className="q">???</span>
              <div className="vc-title muted">Locked card</div>
              <span className="small muted">Clear {c.module.emoji} Module {c.module.id} to unlock</span>
            </div>
          );
        })}
      </div>

      {open && (
        <div className="modal-back" onClick={() => setOpen(null)}>
          <div className="panel modal" onClick={(e) => e.stopPropagation()}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="sticker cyan">{open.module.emoji} MODULE {open.module.id}</span>
              <button className="btn ghost sm" onClick={() => setOpen(null)}>✕</button>
            </div>
            <PromptCard prompt={open} />
            <p className="muted small">
              💡 Paste this into your Sales Cockpit Project so it inherits your context automatically.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
