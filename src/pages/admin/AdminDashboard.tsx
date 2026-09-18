import { demoStudents, demoApplications, demoFaculty, demoScholarshipApps, performanceData } from '../../data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const COLORS = ['#1E3A8A', '#2563EB', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444'];
const appStatusData = [
  { name: 'Submitted', value: demoApplications.filter(a => a.status === 'Submitted').length },
  { name: 'Under Review', value: demoApplications.filter(a => a.status === 'Under Review').length },
  { name: 'Selected', value: demoApplications.filter(a => a.status === 'Selected').length },
  { name: 'Rejected', value: demoApplications.filter(a => a.status === 'Rejected').length },
];

const AdminDashboard = () => (
  <div>
    <h2 style={{marginBottom:'1.5rem', color:'var(--primary)'}}>Admin Dashboard</h2>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-card-label">Total Students</div><div className="stat-card-value">{demoStudents.length}</div><div className="stat-card-change positive">Active</div></div>
      <div className="stat-card"><div className="stat-card-label">Applications</div><div className="stat-card-value">{demoApplications.length}</div><div className="stat-card-change positive">+5 this week</div></div>
      <div className="stat-card"><div className="stat-card-label">Faculty</div><div className="stat-card-value">{demoFaculty.length}</div></div>
      <div className="stat-card"><div className="stat-card-label">Scholarships</div><div className="stat-card-value">{demoScholarshipApps.filter(s => s.status === 'Approved').length}</div><div className="stat-card-change positive">Approved</div></div>
      <div className="stat-card"><div className="stat-card-label">Avg Attendance</div><div className="stat-card-value">91%</div></div>
      <div className="stat-card"><div className="stat-card-label">Pending Apps</div><div className="stat-card-value">{demoApplications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length}</div></div>
      <div className="stat-card"><div className="stat-card-label">Revenue (Demo)</div><div className="stat-card-value">₹25L</div></div>
      <div className="stat-card"><div className="stat-card-label">Success Rate</div><div className="stat-card-value">7.2%</div></div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
      <div className="dash-section">
        <h3>Enrollment Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={performanceData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis /><Tooltip /><Bar dataKey="enrolled" fill="#2563EB" radius={[4,4,0,0]} /><Bar dataKey="selected" fill="#10B981" radius={[4,4,0,0]} /></BarChart>
        </ResponsiveContainer>
      </div>
      <div className="dash-section">
        <h3>Application Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart><Pie data={appStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>{appStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart>
        </ResponsiveContainer>
      </div>
      <div className="dash-section">
        <h3>Performance Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={performanceData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="prelims" stroke="#2563EB" strokeWidth={2} /><Line type="monotone" dataKey="mains" stroke="#F59E0B" strokeWidth={2} /><Line type="monotone" dataKey="selected" stroke="#10B981" strokeWidth={2} /></LineChart>
        </ResponsiveContainer>
      </div>
      <div className="dash-section">
        <h3>Recent Applications</h3>
        <div style={{overflowX:'auto'}}><table className="dash-table">
          <thead><tr><th>ID</th><th>Name</th><th>Program</th><th>Status</th></tr></thead>
          <tbody>{demoApplications.slice(0, 6).map(a => (
            <tr key={a.id}><td>{a.id}</td><td>{a.name}</td><td>{a.program}</td><td><span className={`status-badge status-${a.status.toLowerCase().replace(/\s/g, '-')}`}>{a.status}</span></td></tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
