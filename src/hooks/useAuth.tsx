import { createContext, useContext, useState, ReactNode } from 'react';
import { demoUsers } from '../data/demoData';

type Role = 'admin' | 'student' | 'staff';

interface User {
  username: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { success: boolean; error?: string; redirect?: string };
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
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username: string, password: string) => {
    const found = demoUsers.find(u => u.username === username && u.password === password);
    if (!found) return { success: false, error: 'Invalid username or password.' };
    const u = { username: found.username, role: found.role };
    setUser(u);
    localStorage.setItem('dav_user', JSON.stringify(u));
    const redirectMap: Record<Role, string> = { admin: '/admin', student: '/student', staff: '/staff' };
    return { success: true, redirect: redirectMap[found.role] };
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
