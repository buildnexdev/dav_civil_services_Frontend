import { useState } from 'react';
import type { FormEvent } from 'react';
import AdminReportShell from './AdminReportShell';
import { emptyFilters, rupees, useReport, type ReportFilters, type ReportModuleId } from './reportShared';

const cellValue = (key: string, value: string | number, money: boolean) => {
  if (key === 'status') {
    return <span className={`status-badge status-${String(value).toLowerCase()}`}>{value}</span>;
  }
  if (key === 'amount' || (money && key === 'value')) {
    return rupees(Number(value));
  }
  return value === '' || value == null ? '—' : String(value);
};

const AdminReports = () => {
  const [module, setModule] = useState<ReportModuleId>('students');
  const [draft, setDraft] = useState<ReportFilters>(emptyFilters());
  const [applied, setApplied] = useState<ReportFilters>(emptyFilters());
  const { data, error, loading } = useReport(module, applied);

  const changeModule = (id: ReportModuleId) => {
    setModule(id);
    const next = emptyFilters();
    setDraft(next);
    setApplied(next);
  };

  const onApply = (e: FormEvent) => {
    e.preventDefault();
    setApplied({ ...draft });
  };

  const onReset = () => {
    const next = emptyFilters();
    setDraft(next);
    setApplied(next);
  };

  return (
    <AdminReportShell
      title="Reports"
      subtitle="Filtered records from every admin module."
      module={module}
      filters={draft}
      data={data}
      loading={loading}
      error={error}
      onModule={changeModule}
      onFilters={setDraft}
      onApply={onApply}
      onReset={onReset}
      extraActions={<button type="button" className="btn btn-outline" onClick={() => window.print()}>Print</button>}
    >
      {data && (
        <div className="dash-section report-print">
          <h3>{data.label} report</h3>
          {data.rows.length === 0 ? (
            <p className="student-empty">No records match these filters.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="dash-table">
                <thead>
                  <tr>{data.columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr>
                </thead>
                <tbody>
                  {data.rows.map((row, index) => (
                    <tr key={`${row.id}-${index}`}>
                      {data.columns.map((col) => (
                        <td key={col.key}>{cellValue(col.key, row[col.key], data.meta.money)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </AdminReportShell>
  );
};

export default AdminReports;
