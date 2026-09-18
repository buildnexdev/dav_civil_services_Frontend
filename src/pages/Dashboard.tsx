import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page animate-fade-in">
      <div className="container">
        <header className="dashboard-header">
          <h1>Welcome, <span className="text-gradient">Student User</span></h1>
          <p>Your Academic Dashboard & Progress Tracker</p>
        </header>

        <div className="dashboard-grid">
          <div className="dash-card glass-panel">
            <h3>Attendance</h3>
            <div className="stat-value text-gradient">92%</div>
            <p className="text-muted">Current Month</p>
          </div>
          
          <div className="dash-card glass-panel">
            <h3>Upcoming Tests</h3>
            <div className="stat-value">3</div>
            <p className="text-muted">Next: GS Paper 1 Mock (Sunday)</p>
          </div>

          <div className="dash-card glass-panel">
            <h3>Scholarship Status</h3>
            <div className="stat-value" style={{color: 'var(--accent)'}}>Active</div>
            <p className="text-muted">Merit-based Tier 1</p>
          </div>
        </div>

        <section className="dash-section glass-panel mt-4">
          <h2>Recent Announcements</h2>
          <ul className="announcement-list">
            <li><strong>New Schedule:</strong> Ethics classes by Dr. Sharma rescheduled to 4 PM.</li>
            <li><strong>Library Update:</strong> New editions of Yojana and Kurukshetra magazines are now available.</li>
            <li><strong>Mentorship:</strong> Book your 1-on-1 session for next week via the portal.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
