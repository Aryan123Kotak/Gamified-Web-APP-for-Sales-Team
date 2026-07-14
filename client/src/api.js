const TOKEN_KEY = 'arena_token';

// Static build (Hostinger shared hosting): VITE_LOCAL=1 routes every call to the
// in-browser localStorage engine instead of a Node server. Using the inlined env
// var directly lets the normal (server) build dead-code-eliminate the local engine
// and its bundled content — so quiz answers are never shipped in that build.
export const LOCAL_MODE =
  import.meta.env.VITE_LOCAL === '1' || import.meta.env.VITE_LOCAL === 'true';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

let _localApi = null;
async function callLocal(path, opts) {
  if (!_localApi) _localApi = (await import('./localApi.js')).localApi;
  return _localApi(path, opts);
}

export async function api(path, { method = 'GET', body } = {}) {
  if (import.meta.env.VITE_LOCAL === '1' || import.meta.env.VITE_LOCAL === 'true') {
    return callLocal(path, { method, body });
  }

  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body */
  }
  if (!res.ok) {
    if (res.status === 401 && token) clearToken();
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}
