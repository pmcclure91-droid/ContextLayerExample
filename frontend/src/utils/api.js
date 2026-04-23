const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function getToken() {
  return localStorage.getItem('token');
}

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }

  return res.status === 204 ? null : res.json();
}

export const fetchTasks  = ()            => request('GET',    '/api/tasks');
export const createTask  = (data)        => request('POST',   '/api/tasks', data);
export const updateTask  = (id, changes) => request('PATCH',  `/api/tasks/${id}`, changes);
export const deleteTask  = (id)          => request('DELETE', `/api/tasks/${id}`);
export const login       = (creds)       => request('POST',   '/api/users/login', creds);
export const register    = (data)        => request('POST',   '/api/users/register', data);

