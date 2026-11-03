const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, { body, ...options } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  list: () => request('/tasks'),
  create: (body) => request('/tasks', { method: 'POST', body }),
  update: (id, body) => request(`/tasks/${id}`, { method: 'PATCH', body }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};
