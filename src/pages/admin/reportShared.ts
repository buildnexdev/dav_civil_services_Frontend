import { useCallback, useEffect, useState } from 'react';
import { api } from '../../lib/api';

export const REPORT_MODULES = [
  { id: 'students', label: 'Students', statuses: ['Active', 'Inactive', 'Graduated'] },
  { id: 'mentors', label: 'Mentors', statuses: ['Active', 'Inactive'] },
  { id: 'academics', label: 'Academics', statuses: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'] },
  { id: 'attendance', label: 'Attendance', statuses: ['Present', 'Absent', 'Leave'] },
  { id: 'alumni', label: 'Alumni', statuses: ['Active', 'Inactive'] },
  { id: 'gallery', label: 'Gallery', statuses: ['Active', 'Inactive'] },
  { id: 'news', label: 'News', statuses: ['Active', 'Inactive'] },
  { id: 'notifications', label: 'Notifications', statuses: ['Active', 'Inactive'] },
  { id: 'payments', label: 'Payments', statuses: ['Created', 'Pending', 'Completed', 'Failed'] }
] as const;

export type ReportModuleId = (typeof REPORT_MODULES)[number]['id'];

export type ReportFilters = {
  search: string;
  status: string;
  batch: string;
  extra: string;
  from: string;
  to: string;
};

export const emptyFilters = (): ReportFilters => ({
  search: '',
  status: '',
  batch: '',
  extra: '',
  from: '',
  to: ''
});

export type ReportPayload = {
  module: ReportModuleId;
  label: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string | number>[];
  summary: {
    total: number;
    collected?: number;
    pendingAmount?: number;
    avgAttendance?: number;
    active?: number;
    present?: number;
  };
  charts: {
    byStatus: { name: string; value: number }[];
    byGroup: { name: string; value: number }[];
    byTrend: { name: string; value: number }[];
  };
  meta: {
    groupLabel: string;
    extraLabel: string;
    trendLabel: string;
    statuses: string[];
    batches: string[];
    extras: string[];
    hasBatch: boolean;
    hasExtra: boolean;
    money: boolean;
  };
};

export function reportQuery(module: string, filters: ReportFilters) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set('search', filters.search.trim());
  if (filters.status) params.set('status', filters.status);
  if (filters.batch) params.set('batch', filters.batch);
  if (filters.extra) params.set('extra', filters.extra);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);
  const qs = params.toString();
  return `/api/reports/${module}${qs ? `?${qs}` : ''}`;
}

export function useReport(module: ReportModuleId, filters: ReportFilters) {
  const [data, setData] = useState<ReportPayload | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const payload = await api<ReportPayload>(reportQuery(module, filters));
      setData(payload);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : 'Failed to load report.');
    } finally {
      setLoading(false);
    }
  }, [module, filters]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, error, loading, reload: load };
}

export const rupees = (value: number) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
