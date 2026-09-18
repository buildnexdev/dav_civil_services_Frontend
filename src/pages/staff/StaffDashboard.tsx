import { demoStudents, demoTestResults } from '../../data/demoData';

const StaffDashboard = () => (
  <div>
    <h2 style={{marginBottom:'1.5rem', color:'var(--primary)'}}>Staff Dashboard</h2>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-card-label">Today's Classes</div><div className="stat-card-value">3</div></div>
      <div className="stat-card"><div className="stat-card-label">Total Students</div><div className="stat-card-value">{demoStudents.filter(s => s.status === 'Active').length}</div></div>
      <div className="stat-card"><div className="stat-card-label">Attendance Today</div><div className="stat-card-value">94%</div></div>
      <div className="stat-card"><div className="stat-card-label">Pending Tasks</div><div className="stat-card-value">5</div></div>
      <div className="stat-card"><div className="stat-card-label">Upcoming Tests</div><div className="stat-card-value">2</div></div>
      <div className="stat-card"><div className="stat-card-label">Mentorship</div><div className="stat-card-value">8 students</div></div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
      <div className="dash-section">
        <h3>Recent Test Results</h3>
        <table className="dash-table"><thead><tr><th>Test</th><th>Student</th><th>Marks</th><th>Rank</th></tr></thead>
          <tbody>{demoTestResults.slice(0, 8).map(t => <tr key={t.id}><td>{t.testName}</td><td>{t.studentName}</td><td>{t.marks}/{t.totalMarks}</td><td>#{t.rank}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="dash-section">
        <h3>My Students</h3>
        <table className="dash-table"><thead><tr><th>Name</th><th>Program</th><th>Attendance</th><th>Performance</th></tr></thead>
          <tbody>{demoStudents.slice(0, 8).map(s => <tr key={s.id}><td>{s.name}</td><td>{s.program}</td><td>{s.attendance}%</td><td>{s.performance}%</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  </div>
);

export default StaffDashboard;
