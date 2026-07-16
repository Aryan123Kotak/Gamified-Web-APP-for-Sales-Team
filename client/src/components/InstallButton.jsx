import { useEffect, useReducer, useState } from 'react';
import { canPrompt, isInstalled, isIOS, promptInstall, subscribe } from '../pwa.js';

// A top-of-app "Install app" button. Uses the native install prompt when the
// browser offers one; otherwise opens a short how-to (iOS Safari, or browsers
// that don't fire the prompt) so the button is always useful.
export default function InstallButton({ className = 'btn ghost sm' }) {
  const [, force] = useReducer((x) => x + 1, 0);
  const [help, setHelp] = useState(false);
  useEffect(() => subscribe(force), []);

  if (isInstalled()) return null; // already installed → nothing to do

  const onClick = async () => {
    if (canPrompt()) {
      const outcome = await promptInstall();
      if (outcome !== 'accepted') setHelp(false);
      return;
    }
    setHelp(true); // iOS / not-yet-eligible → show manual steps
  };

  return (
    <>
      <button className={className} onClick={onClick} title="Install this app on your device">
        ⬇️ Install app
      </button>
      {help && <InstallHelp onClose={() => setHelp(false)} />}
    </>
  );
}

function InstallHelp({ onClose }) {
  const ios = isIOS();
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal panel" onClick={(e) => e.stopPropagation()}>
        <h2 className="title-md">⬇️ Install AI Learning Arena</h2>
        {ios ? (
          <ol className="muted" style={{ lineHeight: 1.9, paddingLeft: 18 }}>
            <li>Tap the <b>Share</b> button <span aria-hidden>􀈂</span> at the bottom of Safari.</li>
            <li>Scroll down and tap <b>Add to Home Screen</b>.</li>
            <li>Tap <b>Add</b> — the app appears on your home screen.</li>
          </ol>
        ) : (
          <ol className="muted" style={{ lineHeight: 1.9, paddingLeft: 18 }}>
            <li>Open your browser menu (⋮ or the install icon in the address bar).</li>
            <li>Choose <b>Install app</b> / <b>Add to Home screen</b>.</li>
            <li>Confirm — it opens in its own window like a native app.</li>
          </ol>
        )}
        <p className="small muted mt-2">
          Your progress is saved to your account, so it syncs across every device you log in on.
        </p>
        <button className="btn sm mt-2" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
