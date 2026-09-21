import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { api } from '../../lib/api';

const COLORS = ['#2C1B12', '#5C4030', '#A8896C', '#3D7A5A', '#8A6F55', '#B42318'];

type DashboardData = {
  stats: {
    students: number;
    studentsActive: number;
    studentsGraduated: number;
    avgAttendance: number;
    avgPerformance: number;
    mentors: number;
    mentorsActive: number;
    academicsUpcoming: number;
    academicsOngoing: number;
    attendanceToday: number;
    attendanceMarkedToday: number;
    paymentsCollected: number;
    paymentsPending: number;
    alumniActive: number;
    newsActive: number;
  };
  charts: {
    byBatch: { name: string; value: number }[];
    byStudentStatus: { name: string; value: number }[];
    attendanceTrend: { date: string; present: number; absent: number; leave: number }[];
    paymentsByCategory: { name: string; value: number }[];
  };
  recentStudents: { studentCode: string; name: string; program: string; batch: string; status: string; attendance: number }[];
  recentPayments: { paymentCode: string; payerName: string; category: string; amount: number; status: string }[];
};

const rupees = (value: number) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

const EmptyChart = ({ text }: { text: string }) => (
  <p className="student-empty" style={{ padding: '3rem 1rem' }}>{text}</p>
);

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<DashboardData>('/api/dashboard/admin')
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="student-empty">Loading dashboard...</p>;
  if (error || !data) return <p className="student-empty">{error || 'No dashboard data.'}</p>;

  const { stats, charts } = data;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Admin Dashboard</h2>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card-label">Total Students</div>
          <div className="stat-card-value">{stats.students}</div>
          <div className="stat-card-change positive">{stats.studentsActive} active</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Mentors</div>
          <div className="stat-card-value">{stats.mentors}</div>
          <div className="stat-card-change positive">{stats.mentorsActive} active</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Upcoming Sessions</div>
          <div className="stat-card-value">{stats.academicsUpcoming}</div>
          <div className="stat-card-change">{stats.academicsOngoing} ongoing</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Avg Attendance</div>
          <div className="stat-card-value">{stats.avgAttendance}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Today's Attendance</div>
          <div className="stat-card-value">{stats.attendanceToday}%</div>
          <div className="stat-card-change">{stats.attendanceMarkedToday} marked today</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Fees Collected</div>
          <div className="stat-card-value">{rupees(stats.paymentsCollected)}</div>
          <div className="stat-card-change">{stats.paymentsPending} pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Alumni</div>
          <div className="stat-card-value">{stats.alumniActive}</div>
          <div className="stat-card-change positive">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active News</div>
          <div className="stat-card-value">{stats.newsActive}</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-section">
          <h3>Students by Batch</h3>
          {charts.byBatch.length === 0 ? <EmptyChart text="No students yet." /> : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={charts.byBatch}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DCD2" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" name="Students" fill="#5C4030" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="dash-section">
          <h3>Student Status</h3>
          {charts.byStudentStatus.length === 0 ? <EmptyChart text="No students yet." /> : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={charts.byStudentStatus} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name" label>
                  {charts.byStudentStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="dash-section">
          <h3>Fees by Category</h3>
          {charts.paymentsByCategory.length === 0 ? <EmptyChart text="No completed payments yet." /> : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={charts.paymentsByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DCD2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => rupees(Number(value) || 0)} />
                <Bar dataKey="value" name="Collected" fill="#3D7A5A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="dash-section">
          <h3>Attendance (14 days)</h3>
          {charts.attendanceTrend.length === 0 ? <EmptyChart text="No attendance marked yet." /> : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={charts.attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DCD2" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#3D7A5A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#B42318" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leave" fill="#A8896C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="dash-section">
          <h3>Recent Students</h3>
          {data.recentStudents.length === 0 ? <EmptyChart text="No students yet." /> : (
            <div style={{ overflowX: 'auto' }}>
              <table className="dash-table">
                <thead><tr><th>ID</th><th>Name</th><th>Batch</th><th>Attendance</th><th>Status</th></tr></thead>
                <tbody>
                  {data.recentStudents.map((s) => (
                    <tr key={s.studentCode}>
                      <td>{s.studentCode}</td>
                      <td><strong>{s.name}</strong></td>
                      <td>{s.batch || '—'}</td>
                      <td>{s.attendance}%</td>
                      <td><span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="dash-section">
          <h3>Recent Payments</h3>
          {data.recentPayments.length === 0 ? <EmptyChart text="No payments yet." /> : (
            <div style={{ overflowX: 'auto' }}>
              <table className="dash-table">
                <thead><tr><th>ID</th><th>Payer</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {data.recentPayments.map((p) => (
                    <tr key={p.paymentCode}>
                      <td>{p.paymentCode}</td>
                      <td>{p.payerName}</td>
                      <td>{p.category}</td>
                      <td>{rupees(p.amount)}</td>
                      <td><span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
