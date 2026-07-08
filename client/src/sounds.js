// Tiny WebAudio arcade blips — no assets needed.
let ctx = null;
const MUTE_KEY = 'arena_muted';

export const isMuted = () => localStorage.getItem(MUTE_KEY) === '1';
export const setMuted = (m) => localStorage.setItem(MUTE_KEY, m ? '1' : '0');

function beep(freq, dur = 0.12, type = 'square', gain = 0.04, when = 0) {
  if (isMuted()) return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  } catch {
    /* audio not available */
  }
}

export const sfx = {
  click: () => beep(520, 0.06, 'square', 0.03),
  correct: () => {
    beep(660, 0.1);
    beep(880, 0.14, 'square', 0.04, 0.09);
  },
  wrong: () => beep(160, 0.25, 'sawtooth', 0.05),
  xp: () => beep(980, 0.08, 'triangle', 0.05),
  levelup: () => {
    [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.15, 'square', 0.05, i * 0.11));
  },
  unlock: () => {
    beep(440, 0.1, 'triangle', 0.05);
    beep(740, 0.18, 'triangle', 0.05, 0.1);
  },
};
