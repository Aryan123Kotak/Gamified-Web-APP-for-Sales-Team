import { useState } from 'react';
import { useGame } from '../store.jsx';
import { sfx } from '../sounds.js';

const AVATARS = ['🦊', '🦁', '🐯', '🦅', '🐺', '🦈', '🐉', '🦄', '🐼', '🤖', '👽', '🥷'];

export default function Auth() {
  const { login, register } = useGame();
  const [mode, setMode] = useState('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('🦊');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    sfx.click();
    try {
      if (mode === 'register') await register(name, email, password, avatar);
      else await login(email, password);
    } catch (err) {
      setError(err.message);
      sfx.wrong();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="panel auth-card">
        <span className="burst-emoji">⚡</span>
        <h1 className="title-xl">AI LEARNING ARENA</h1>
        <p className="muted mt-1">
          Level up from <b>AI Newcomer</b> to <b>AI Champion</b>. 23 levels · 3 stages ·
          quizzes · graded missions · a toolkit of prompt cards · team leaderboard.
        </p>
        <div className="sticker pink mt-2">MALPANI GROUP · AI TRAINING</div>

        <div className="tab-switch">
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>
            New Player
          </button>
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Log In
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <div className="field">
              <label>Player name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" required />
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@malpanigroup.com" required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} />
          </div>

          {mode === 'register' && (
            <div className="field">
              <label>Pick your avatar</label>
              <div className="avatar-picker">
                {AVATARS.map((a) => (
                  <button type="button" key={a} className={a === avatar ? 'sel' : ''} onClick={() => { setAvatar(a); sfx.click(); }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p style={{ color: 'var(--danger)', fontWeight: 700 }} className="mt-2">💥 {error}</p>}

          <button className="btn lg yellow mt-3" style={{ width: '100%' }} disabled={busy}>
            {busy ? '...' : mode === 'register' ? '🕹️ PRESS START' : '▶ CONTINUE GAME'}
          </button>
        </form>
      </div>
    </div>
  );
}
