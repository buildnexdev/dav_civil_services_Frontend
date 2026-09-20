import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../lib/api';
import { MENTOR_PAGES, STUDENT_PAGES, pagesForRole } from '../lib/accessPages';
import { useAuth } from './useAuth';

type AccessState = {
  studentPages: string[];
  mentorPages: string[];
  loading: boolean;
  reload: () => Promise<void>;
  allowedKeys: string[];
};

const AccessContext = createContext<AccessState | null>(null);

const allStudent = STUDENT_PAGES.map((page) => page.key);
const allMentor = MENTOR_PAGES.map((page) => page.key);

export const AccessProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [studentPages, setStudentPages] = useState<string[]>(allStudent);
  const [mentorPages, setMentorPages] = useState<string[]>(allMentor);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await api<{ studentPages: string[]; mentorPages: string[] }>('/api/settings');
      setStudentPages(data.studentPages?.length ? data.studentPages : allStudent);
      setMentorPages(data.mentorPages?.length ? data.mentorPages : allMentor);
    } catch {
      setStudentPages(allStudent);
      setMentorPages(allMentor);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    reload();
  }, [reload]);

  const allowedKeys = useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return ['*'];
    if (user.role === 'student') return studentPages;
    return mentorPages;
  }, [user, studentPages, mentorPages]);

  const value = useMemo(
    () => ({ studentPages, mentorPages, loading, reload, allowedKeys }),
    [studentPages, mentorPages, loading, reload, allowedKeys]
  );

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
};

export const useAccess = () => {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error('useAccess must be used within AccessProvider');
  return ctx;
};

export const usePortalPages = (role: 'admin' | 'student' | 'staff') => {
  const { allowedKeys } = useAccess();
  return pagesForRole(role).filter((page) => page.required || allowedKeys.includes('*') || allowedKeys.includes(page.key));
};
