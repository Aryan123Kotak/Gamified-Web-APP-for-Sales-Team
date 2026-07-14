import { useState } from 'react';
import { useGame } from '../store.jsx';
import { sfx } from '../sounds.js';
import { confetti } from '../confetti.js';

const BAND_STYLE = {
  'Needs support': { cls: 'danger', emoji: '🔴' },
  Developing: { cls: 'yellow', emoji: '🟡' },
  Competent: { cls: 'green', emoji: '🟢' },
  'Can guide others': { cls: 'cyan', emoji: '🌟' },
};

function MissionCard({ mi, unlocked, result, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(result?.submission || '');
  const [busy, setBusy] = useState(false);
  const [graded, setGraded] = useState(null); // fresh grade this session
  const [error, setError] = useState('');

  const best = graded ? graded.bestScore : result?.best;
  const band = graded ? graded.band.name : result?.band;
  const passed = (best || 0) >= 65;

  const submit = async () => {
    setBusy(true);
    setError('');
    sfx.click();
    try {
      const res = await onSubmit(mi.id, text);
      setGraded(res);
      if (res.passed) { sfx.correct(); if (res.score >= 85) confetti({ count: 80 }); }
      else sfx.wrong();
    } catch (e) {
      setError(e.message);
      sfx.wrong();
    } finally {
      setBusy(false);
    }
  };

  const bs = band ? BAND_STYLE[band] : null;

  return (
    <div className={`panel mission-row ${passed ? 'done acc-green' : ''}`} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
        <div className="m-check">{passed ? '✔' : unlocked ? mi.module.emoji : '🔒'}</div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div className="row" style={{ gap: 8 }}>
            <b>{mi.title}</b>
            <span className="sticker" style={{ fontSize: '0.7rem' }}>up to +{mi.maxXp} XP</span>
            {best != null && bs && (
              <span className={`sticker ${bs.cls}`} style={{ fontSize: '0.7rem' }}>{bs.emoji} {best}/100 · {band}</span>
            )}
          </div>
          <p className="muted small mt-1">{mi.brief}</p>
          <span className="small" style={{ color: 'var(--cyan)' }}>
            {mi.module.stage} · {mi.module.title}
          </span>
        </div>
        <button
          className="btn sm cyan"
          disabled={!unlocked}
          onClick={() => { setOpen((o) => !o); sfx.click(); }}
          title={unlocked ? '' : 'Clear this level first'}
        >
          {!unlocked ? 'LOCKED' : open ? 'CLOSE' : best != null ? 'IMPROVE' : 'START'}
        </button>
      </div>

      {open && unlocked && (
        <div className="mt-2" style={{ borderTop: '2px dashed var(--line)', paddingTop: 14 }}>
          <div className="callout" style={{ marginTop: 0 }}>
            <div className="co-title">📋 YOUR TASK</div>
            <div>{mi.submitLabel}</div>
          </div>
          <p className="small muted" style={{ marginTop: 8 }}>
            You'll be scored on: {mi.criteria.map((c) => c.label).join(' · ')}. Aim for {mi.minWords}+ words.
          </p>
          <textarea
            className="mission-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your submission here…"
            rows={6}
          />
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
            <span className="small muted">{text.trim().split(/\s+/).filter(Boolean).length} words</span>
            <button className="btn green" disabled={busy || text.trim().length < 10} onClick={submit}>
              {busy ? 'GRADING…' : '📤 SUBMIT FOR MARKS'}
            </button>
          </div>
          {error && <p style={{ color: 'var(--danger)', fontWeight: 700 }} className="mt-1">💥 {error}</p>}

          {graded && (
            <div className={`panel mt-2 acc-${bs ? bs.cls : 'green'}`} style={{ background: 'var(--panel-2)' }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="title-md" style={{ color: 'var(--yellow)' }}>{graded.score}/100</span>
                <span className={`sticker ${bs ? bs.cls : 'green'}`}>{bs?.emoji} {graded.band.name}</span>
              </div>
              {graded.xpGained > 0 && <div className="sticker green mt-1">+{graded.xpGained} XP earned</div>}
              {graded.lengthNote && <p className="small mt-1" style={{ color: 'var(--yellow)' }}>{graded.lengthNote}</p>}
              <div className="mt-2">
                {graded.criteria.map((c) => (
                  <div key={c.label} className="row" style={{ gap: 8, padding: '3px 0' }}>
                    <span>{c.met ? '✅' : '⬜'}</span>
                    <span className="small" style={{ color: c.met ? 'var(--green-2)' : 'var(--muted)' }}>{c.label}</span>
                  </div>
                ))}
              </div>
              <p className="small muted mt-1">
                {graded.passed
                  ? 'Competent or above — nice work! You can refine and resubmit to raise your best score.'
                  : 'Not competent yet — add the missing points above and submit again.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Missions() {
  const { me, content, submitMission } = useGame();

  const missions = content.modules.flatMap((m) =>
    m.missions.map((mi) => ({ ...mi, module: m }))
  );
  const results = me.progress.missionResults || {};
  const doneCount = me.progress.missionsDone.length;
  const unlockedModules = me.progress.unlocked;

  return (
    <>
      <div className="center">
        <h1 className="title-lg">🎖️ MISSIONS</h1>
        <p className="muted mt-1">
          Practise the skill for real, then submit your work. Each mission is graded on a rubric and
          gives marks out of 100 — XP scales with your marks.
        </p>
        <div className="sticker green mt-2">{doneCount} / {missions.length} AT COMPETENT+</div>
      </div>

      <div className="grid mt-3">
        {missions.map((mi) => (
          <MissionCard
            key={mi.id}
            mi={mi}
            unlocked={unlockedModules.includes(mi.module.id)}
            result={results[mi.id]}
            onSubmit={submitMission}
          />
        ))}
      </div>

      <p className="muted small center mt-3">
        Grading is automatic and based on the points listed in each mission. Write in your own words —
        cover every point to reach <b>Competent</b> (65+) and beyond. 💪
      </p>
    </>
  );
}
