import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

type Dash = {
  stats: {
    classesToday: number;
    studentsActive: number;
    avgAttendance: number;
    attendanceToday: number;
    upcomingTests: number;
  };
  recentStudents: { name: string; program: string; attendance: number; performance: number; status: string }[];
  todaySessions: { title: string; type: string; startTime: string; venue: string; status: string }[];
};

const StaffDashboard = () => {
  const [data, setData] = useState<Dash | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Dash>('/api/dashboard/staff')
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="student-empty">Loading dashboard...</p>;
  if (error || !data) return <p className="student-empty">{error || 'No dashboard data.'}</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Staff Dashboard</h2>
      <div className="stat-cards">
        <div className="stat-card"><div className="stat-card-label">Today's Classes</div><div className="stat-card-value">{data.stats.classesToday}</div></div>
        <div className="stat-card"><div className="stat-card-label">Active Students</div><div className="stat-card-value">{data.stats.studentsActive}</div></div>
        <div className="stat-card"><div className="stat-card-label">Avg Attendance</div><div className="stat-card-value">{data.stats.avgAttendance}%</div></div>
        <div className="stat-card"><div className="stat-card-label">Attendance Today</div><div className="stat-card-value">{data.stats.attendanceToday}%</div></div>
        <div className="stat-card"><div className="stat-card-label">Upcoming Tests</div><div className="stat-card-value">{data.stats.upcomingTests}</div></div>
      </div>

      <div className="dash-grid">
        <div className="dash-section">
          <h3>Today's Sessions</h3>
          {data.todaySessions.length === 0 ? <p className="student-empty">No sessions scheduled today.</p> : (
            <table className="dash-table">
              <thead><tr><th>Title</th><th>Type</th><th>Time</th><th>Venue</th></tr></thead>
              <tbody>
                {data.todaySessions.map((s) => (
                  <tr key={s.title + s.startTime}><td>{s.title}</td><td>{s.type}</td><td>{s.startTime || '—'}</td><td>{s.venue || '—'}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="dash-section">
          <h3>Students</h3>
          {data.recentStudents.length === 0 ? <p className="student-empty">No students yet.</p> : (
            <table className="dash-table">
              <thead><tr><th>Name</th><th>Program</th><th>Attendance</th><th>Performance</th></tr></thead>
              <tbody>
                {data.recentStudents.map((s) => (
                  <tr key={s.name}><td>{s.name}</td><td>{s.program || '—'}</td><td>{s.attendance}%</td><td>{s.performance}%</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
