import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { api, getToken, setToken, clearToken } from './api.js';
import { confetti } from './confetti.js';
import { sfx } from './sounds.js';

const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

export function rankFor(ranks, xp) {
  let current = ranks[0];
  let next = null;
  for (const r of ranks) {
    if (xp >= r.xp) current = r;
    else { next = r; break; }
  }
  return { current, next };
}

let toastId = 0;

export function GameProvider({ children }) {
  const [content, setContent] = useState(null);
  const [me, setMe] = useState(null); // { user, progress }
  const [authed, setAuthed] = useState(!!getToken());
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const prevRankRef = useRef(null);

  const pushToast = useCallback((kind, text) => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, kind, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3100);
  }, []);

  const badgeName = useCallback(
    (id) => content?.badges.find((b) => b.id === id),
    [content]
  );

  // Celebrate everything a mutation response brought back.
  const celebrate = useCallback(
    (res) => {
      if (!res) return;
      if (res.xpGained > 0) {
        pushToast('xp', `+${res.xpGained} XP`);
        sfx.xp();
      }
      for (const id of res.newBadges || []) {
        const b = badgeName(id);
        if (b) pushToast('badge', `${b.emoji} Badge unlocked: ${b.name}!`);
        sfx.unlock();
      }
      if ((res.newBadges || []).length) confetti({ count: 90 });
    },
    [pushToast, badgeName]
  );

  const refreshMe = useCallback(async () => {
    const data = await api('/me');
    setMe(data);
    if (data.daily) {
      pushToast('xp', `🔥 Day ${data.daily.streak} streak: +${data.daily.amount} XP`);
    }
    return data;
  }, [pushToast]);

  // Watch for rank-ups whenever XP changes.
  useEffect(() => {
    if (!content || !me) return;
    const { current } = rankFor(content.ranks, me.user.xp);
    if (prevRankRef.current && prevRankRef.current !== current.name) {
      pushToast('rank', `⬆️ RANK UP: ${current.emoji} ${current.name}!`);
      sfx.levelup();
      confetti({ count: 160 });
    }
    prevRankRef.current = current.name;
  }, [me, content, pushToast]);

  useEffect(() => {
    (async () => {
      try {
        const c = await api('/content');
        setContent(c);
        if (getToken()) {
          await refreshMe();
          setAuthed(true);
        }
      } catch {
        clearToken();
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshMe]);

  const login = useCallback(
    async (email, password) => {
      const res = await api('/auth/login', { method: 'POST', body: { email, password } });
      setToken(res.token);
      setAuthed(true);
      await refreshMe();
    },
    [refreshMe]
  );

  const register = useCallback(
    async (name, email, password, avatar) => {
      const res = await api('/auth/register', {
        method: 'POST',
        body: { name, email, password, avatar },
      });
      setToken(res.token);
      setAuthed(true);
      await refreshMe();
    },
    [refreshMe]
  );

  const logout = useCallback(() => {
    clearToken();
    setAuthed(false);
    setMe(null);
    prevRankRef.current = null;
  }, []);

  const applyProgress = useCallback((res) => {
    setMe((m) =>
      m
        ? {
            ...m,
            user: { ...m.user, xp: m.user.xp + (res.xpGained || 0) },
            progress: { ...m.progress, ...res.progress, badges: m.progress.badges },
          }
        : m
    );
  }, []);

  const completeLesson = useCallback(
    async (moduleId, lessonId) => {
      const res = await api('/lessons/complete', { method: 'POST', body: { moduleId, lessonId } });
      applyProgress(res);
      celebrate(res);
      return res;
    },
    [applyProgress, celebrate]
  );

  const submitQuiz = useCallback(
    async (moduleId, answers) => {
      const res = await api('/quiz/submit', { method: 'POST', body: { moduleId, answers } });
      applyProgress(res);
      return res; // Quiz page runs its own celebration sequence.
    },
    [applyProgress]
  );

  const submitMission = useCallback(
    async (missionId, submission) => {
      const res = await api('/missions/submit', {
        method: 'POST',
        body: { missionId, submission },
      });
      applyProgress(res);
      celebrate(res); // XP + badge toasts; the page shows the marks + feedback
      return res;
    },
    [applyProgress, celebrate]
  );

  const value = {
    content,
    me,
    authed,
    loading,
    toasts,
    pushToast,
    login,
    register,
    logout,
    refreshMe,
    completeLesson,
    submitQuiz,
    submitMission,
    celebrate,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
