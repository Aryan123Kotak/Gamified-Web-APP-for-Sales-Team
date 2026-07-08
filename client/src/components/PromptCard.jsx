import { useState } from 'react';
import { sfx } from '../sounds.js';

export default function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.text);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = prompt.text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    sfx.click();
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="prompt-card">
      <div className="pc-head">
        <span className="pc-title">🃏 {prompt.title}</span>
        {prompt.rarity && <span className={`rarity ${prompt.rarity}`}>{prompt.rarity}</span>}
        <span style={{ flex: 1 }} />
        <button className="btn sm cyan copy-btn" onClick={copy}>
          {copied ? '✔ COPIED!' : '📋 COPY'}
        </button>
      </div>
      <pre>{prompt.text}</pre>
    </div>
  );
}
