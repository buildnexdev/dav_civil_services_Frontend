import { useState } from 'react';
import type { FormEvent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import AdminReportShell from './AdminReportShell';
import { emptyFilters, rupees, useReport, type ReportFilters, type ReportModuleId } from './reportShared';

const COLORS = ['#2C1B12', '#5C4030', '#A8896C', '#3D7A5A', '#8A6F55', '#B42318'];

const EmptyChart = ({ text }: { text: string }) => (
  <p className="student-empty" style={{ padding: '3rem 1rem' }}>{text}</p>
);

const AdminAnalytics = () => {
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

  const money = Boolean(data?.meta.money);
  const tick = (value: number) => (money ? rupees(value) : value);

  return (
    <AdminReportShell
      title="Analytics"
      subtitle="The same filtered module data, shown as charts."
      module={module}
      filters={draft}
      data={data}
      loading={loading}
      error={error}
      onModule={changeModule}
      onFilters={setDraft}
      onApply={onApply}
      onReset={onReset}
    >
      {data && (
        <div className="dash-grid">
          <div className="dash-section">
            <h3>By status</h3>
            {data.charts.byStatus.length === 0 ? <EmptyChart text="No status data." /> : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={data.charts.byStatus} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name" label>
                    {data.charts.byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="dash-section">
            <h3>{data.meta.groupLabel}</h3>
            {data.charts.byGroup.length === 0 ? <EmptyChart text="No grouped data." /> : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.charts.byGroup}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DCD2" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => tick(Number(value) || 0)} />
                  <Bar dataKey="value" name={money ? 'Amount' : 'Count'} fill="#5C4030" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="dash-section" style={{ gridColumn: '1 / -1' }}>
            <h3>{data.meta.trendLabel}</h3>
            {data.charts.byTrend.length === 0 ? <EmptyChart text="No trend data yet." /> : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.charts.byTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DCD2" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => tick(Number(value) || 0)} />
                  <Bar dataKey="value" name={money ? 'Amount' : 'Count'} fill="#3D7A5A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </AdminReportShell>
  );
};

export default AdminAnalytics;
