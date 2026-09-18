import { demoStudents, demoTestResults, demoNotifications, demoStudyMaterials } from '../../data/demoData';

const student = demoStudents[0]; // Demo: logged in as first student
const myTests = demoTestResults.filter(t => t.studentId === student.id);

const StudentDashboard = () => (
  <div>
    <h2 style={{marginBottom:'1.5rem', color:'var(--primary)'}}>Welcome, {student.name}</h2>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-card-label">Attendance</div><div className="stat-card-value">{student.attendance}%</div></div>
      <div className="stat-card"><div className="stat-card-label">Avg Score</div><div className="stat-card-value">{student.performance}%</div></div>
      <div className="stat-card"><div className="stat-card-label">Rank</div><div className="stat-card-value">#3</div></div>
      <div className="stat-card"><div className="stat-card-label">Upcoming Tests</div><div className="stat-card-value">2</div></div>
      <div className="stat-card"><div className="stat-card-label">Assignments</div><div className="stat-card-value">3</div></div>
      <div className="stat-card"><div className="stat-card-label">Notifications</div><div className="stat-card-value">{demoNotifications.filter(n => !n.read).length}</div></div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
      <div className="dash-section">
        <h3>Recent Test Results</h3>
        <table className="dash-table"><thead><tr><th>Test</th><th>Subject</th><th>Marks</th><th>Rank</th></tr></thead>
          <tbody>{myTests.map(t => <tr key={t.id}><td>{t.testName}</td><td>{t.subject}</td><td>{t.marks}/{t.totalMarks}</td><td>#{t.rank}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="dash-section">
        <h3>Recent Study Materials</h3>
        <table className="dash-table"><thead><tr><th>Title</th><th>Subject</th><th>Type</th></tr></thead>
          <tbody>{demoStudyMaterials.slice(0, 6).map(m => <tr key={m.id}><td>{m.title}</td><td>{m.subject}</td><td><span className="badge badge-primary">{m.type}</span></td></tr>)}</tbody>
        </table>
      </div>
      <div className="dash-section">
        <h3>Notifications</h3>
        {demoNotifications.map(n => (
          <div key={n.id} style={{padding:'0.75rem 0', borderBottom:'1px solid var(--border-color)', display:'flex', justifyContent:'space-between'}}>
            <div><strong>{n.title}</strong><div style={{fontSize:'0.85rem', color:'var(--text-muted)'}}>{n.message}</div></div>
            <span style={{fontSize:'0.75rem', color:'var(--text-muted)', whiteSpace:'nowrap'}}>{n.date}</span>
          </div>
        ))}
      </div>
      <div className="dash-section">
        <h3>Student Info</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', fontSize:'0.9rem'}}>
          <div><strong>ID:</strong> {student.id}</div><div><strong>Program:</strong> {student.program}</div>
          <div><strong>Batch:</strong> {student.batch}</div><div><strong>Hostel:</strong> {student.hostel} / {student.room}</div>
          <div><strong>Scholarship:</strong> {student.scholarship}</div><div><strong>Status:</strong> {student.status}</div>
        </div>
      </div>
    </div>
  </div>
);

export default StudentDashboard;
