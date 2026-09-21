import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../lib/api';

export type Role = 'admin' | 'student' | 'staff';

interface User {
  id: number;
  username: string;
  role: Role;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string; redirect?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('dav_user');
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      if (!parsed?.token || !parsed?.role) return null;
      return parsed;
    } catch {
      return null;
    }
  });

  const login = async (username: string, password: string) => {
    try {
      const data = await api<{
        success: boolean;
        token: string;
        user: { id: number; username: string; role: Role };
      }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      const nextUser: User = {
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
        token: data.token,
      };
      setUser(nextUser);
      localStorage.setItem('dav_user', JSON.stringify(nextUser));
      const redirectMap: Record<Role, string> = { admin: '/admin', student: '/student', staff: '/staff' };
      return { success: true, redirect: redirectMap[data.user.role] };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Login failed.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dav_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
