// PWA install plumbing. Captures the browser's install prompt as early as
// possible (before any component mounts, so it isn't missed) and exposes a tiny
// subscribe API the InstallButton uses. Also registers the service worker.

let deferredPrompt = null;
let installed =
  (typeof matchMedia !== 'undefined' && matchMedia('(display-mode: standalone)').matches) ||
  window.navigator.standalone === true;

const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // stop Chrome's mini-infobar; we drive the prompt from our button
  deferredPrompt = e;
  notify();
});

window.addEventListener('appinstalled', () => {
  installed = true;
  deferredPrompt = null;
  notify();
});

export const canPrompt = () => !!deferredPrompt;
export const isInstalled = () => installed;
export const isIOS = () =>
  /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;

export async function promptInstall() {
  if (!deferredPrompt) return 'unavailable';
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') deferredPrompt = null;
  return outcome; // 'accepted' | 'dismissed'
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(() => {/* offline support is best-effort */});
  });
}
