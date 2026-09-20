import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

type Dash = {
  student: {
    studentCode: string;
    name: string;
    program: string;
    batch: string;
    hostel: string;
    room: string;
    scholarship: string;
    status: string;
    attendance: number;
    performance: number;
  };
  upcoming: { academicCode: string; title: string; type: string; subject: string; sessionDate: string; startTime: string; venue: string; status: string }[];
  attendance: { attendanceDate: string; status: string; remarks: string }[];
  notifications: { title: string; message: string; type: string; publishedDate: string }[];
  payments: { paymentCode: string; category: string; amount: number; status: string }[];
  paid: number;
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Dash | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Dash>('/api/dashboard/student')
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="student-empty">Loading dashboard...</p>;
  if (error || !data) {
    return (
      <div>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Welcome, {user?.username}</h2>
        <p className="student-empty">{error || 'No student profile is linked to this login yet.'}</p>
      </div>
    );
  }

  const s = data.student;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Welcome, {s.name}</h2>
      <div className="stat-cards">
        <div className="stat-card"><div className="stat-card-label">Attendance</div><div className="stat-card-value">{s.attendance}%</div></div>
        <div className="stat-card"><div className="stat-card-label">Performance</div><div className="stat-card-value">{s.performance}%</div></div>
        <div className="stat-card"><div className="stat-card-label">Upcoming Sessions</div><div className="stat-card-value">{data.upcoming.length}</div></div>
        <div className="stat-card"><div className="stat-card-label">Fees Paid</div><div className="stat-card-value">₹{data.paid.toLocaleString('en-IN')}</div></div>
        <div className="stat-card"><div className="stat-card-label">Notifications</div><div className="stat-card-value">{data.notifications.length}</div></div>
        <div className="stat-card"><div className="stat-card-label">Status</div><div className="stat-card-value" style={{ fontSize: '1.4rem' }}>{s.status}</div></div>
      </div>

      <div className="dash-grid">
        <div className="dash-section">
          <h3>Upcoming Sessions</h3>
          {data.upcoming.length === 0 ? <p className="student-empty">No upcoming sessions.</p> : (
            <table className="dash-table">
              <thead><tr><th>Title</th><th>Type</th><th>Date</th><th>Time</th></tr></thead>
              <tbody>
                {data.upcoming.map((a) => (
                  <tr key={a.academicCode}><td>{a.title}</td><td>{a.type}</td><td>{a.sessionDate || '—'}</td><td>{a.startTime || '—'}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="dash-section">
          <h3>Recent Attendance</h3>
          {data.attendance.length === 0 ? <p className="student-empty">No attendance records yet.</p> : (
            <table className="dash-table">
              <thead><tr><th>Date</th><th>Status</th><th>Remarks</th></tr></thead>
              <tbody>
                {data.attendance.map((a) => (
                  <tr key={a.attendanceDate}><td>{a.attendanceDate}</td><td><span className={`status-badge status-${a.status.toLowerCase()}`}>{a.status}</span></td><td>{a.remarks || '—'}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="dash-section">
          <h3>Notifications</h3>
          {data.notifications.length === 0 ? <p className="student-empty">No notifications.</p> : data.notifications.map((n) => (
            <div key={n.title + n.publishedDate} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <div><strong>{n.title}</strong><div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{n.message}</div></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{n.publishedDate}</span>
            </div>
          ))}
        </div>
        <div className="dash-section">
          <h3>Student Info</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div><strong>ID:</strong> {s.studentCode}</div>
            <div><strong>Program:</strong> {s.program || '—'}</div>
            <div><strong>Batch:</strong> {s.batch || '—'}</div>
            <div><strong>Hostel:</strong> {s.hostel || '—'} / {s.room || '—'}</div>
            <div><strong>Scholarship:</strong> {s.scholarship}</div>
            <div><strong>Status:</strong> {s.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
