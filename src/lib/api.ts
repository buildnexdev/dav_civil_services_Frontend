const API_BASE = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:5000' : '');

export { API_BASE };

export function fileUrl(path?: string | null, version?: string | number | null) {
  if (!path) return '';
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  if (!version) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}v=${encodeURIComponent(String(version))}`;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getToken() {
  const stored = localStorage.getItem('dav_user');
  if (!stored) return null;
  try {
    return JSON.parse(stored).token as string | undefined;
  } catch {
    return null;
  }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new ApiError('Cannot reach the server. Please start the backend and try again.', 0);
  }

  const data = await res.json().catch(() => ({}));

  if (res.status === 401 && !path.includes('/api/auth/login')) {
    localStorage.removeItem('dav_user');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  if (!res.ok) {
    throw new ApiError(data.error || 'Request failed.', res.status);
  }

  return data as T;
}
