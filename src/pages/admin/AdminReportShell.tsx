import type { FormEvent, ReactNode } from 'react';
import { REPORT_MODULES, rupees, type ReportFilters, type ReportPayload, type ReportModuleId } from './reportShared';
import './AdminReports.css';
import './AdminStudents.css';

type Props = {
  title: string;
  subtitle: string;
  module: ReportModuleId;
  filters: ReportFilters;
  data: ReportPayload | null;
  loading: boolean;
  error: string;
  onModule: (id: ReportModuleId) => void;
  onFilters: (next: ReportFilters) => void;
  onApply: (e: FormEvent) => void;
  onReset: () => void;
  extraActions?: ReactNode;
  children: ReactNode;
};

const AdminReportShell = ({
  title,
  subtitle,
  module,
  filters,
  data,
  loading,
  error,
  onModule,
  onFilters,
  onApply,
  onReset,
  extraActions,
  children
}: Props) => {
  const meta = data?.meta;
  const current = REPORT_MODULES.find((item) => item.id === module);
  const statuses = meta?.statuses?.length ? meta.statuses : [...(current?.statuses || [])];
  const set = (key: keyof ReportFilters, value: string) => onFilters({ ...filters, [key]: value });

  return (
    <div className="report-page">
      <div className="student-page-header">
        <div>
          <h2>{title}</h2>
          <p className="report-subtitle">{subtitle}</p>
        </div>
        {extraActions}
      </div>

      <div className="report-tabs">
        {REPORT_MODULES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`report-tab${module === item.id ? ' active' : ''}`}
            onClick={() => onModule(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form className="report-filters" onSubmit={onApply}>
        <label>
          Search
          <input className="form-control" value={filters.search} onChange={(e) => set('search', e.target.value)} placeholder="Name, ID..." />
        </label>
        <label>
          Status
          <select className="form-control" value={filters.status} onChange={(e) => set('status', e.target.value)}>
            <option value="">All</option>
            {(statuses).map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </label>
        {meta?.hasBatch && (
          <label>
            Batch
            <select className="form-control" value={filters.batch} onChange={(e) => set('batch', e.target.value)}>
              <option value="">All</option>
              {meta.batches.map((batch) => <option key={batch} value={batch}>{batch}</option>)}
            </select>
          </label>
        )}
        {meta?.hasExtra && (
          <label>
            {meta.extraLabel}
            <select className="form-control" value={filters.extra} onChange={(e) => set('extra', e.target.value)}>
              <option value="">All</option>
              {meta.extras.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        )}
        <label>
          From
          <input className="form-control" type="date" value={filters.from} onChange={(e) => set('from', e.target.value)} />
        </label>
        <label>
          To
          <input className="form-control" type="date" value={filters.to} onChange={(e) => set('to', e.target.value)} />
        </label>
        <div className="report-filter-actions">
          <button type="submit" className="btn btn-primary">Apply</button>
          <button type="button" className="btn btn-outline" onClick={onReset}>Reset</button>
        </div>
      </form>

      {error && <div className="student-banner error">{error}</div>}

      {loading ? (
        <p className="student-empty">Loading {title.toLowerCase()}...</p>
      ) : data ? (
        <>
          <div className="stat-cards report-stats">
            <div className="stat-card">
              <div className="stat-card-label">Records</div>
              <div className="stat-card-value">{data.summary.total}</div>
            </div>
            {data.summary.active != null && (
              <div className="stat-card">
                <div className="stat-card-label">Active</div>
                <div className="stat-card-value">{data.summary.active}</div>
              </div>
            )}
            {data.summary.avgAttendance != null && (
              <div className="stat-card">
                <div className="stat-card-label">Avg Attendance</div>
                <div className="stat-card-value">{data.summary.avgAttendance}%</div>
              </div>
            )}
            {data.summary.present != null && (
              <div className="stat-card">
                <div className="stat-card-label">Present</div>
                <div className="stat-card-value">{data.summary.present}</div>
              </div>
            )}
            {data.summary.collected != null && (
              <div className="stat-card">
                <div className="stat-card-label">Collected</div>
                <div className="stat-card-value">{rupees(data.summary.collected)}</div>
              </div>
            )}
            {data.summary.pendingAmount != null && (
              <div className="stat-card">
                <div className="stat-card-label">Pending amount</div>
                <div className="stat-card-value">{rupees(data.summary.pendingAmount)}</div>
              </div>
            )}
          </div>
          {children}
        </>
      ) : null}
    </div>
  );
};

export default AdminReportShell;
