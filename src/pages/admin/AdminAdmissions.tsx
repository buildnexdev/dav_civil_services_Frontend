import { useState } from 'react';
import { demoApplications } from '../../data/demoData';

const AdminAdmissions = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const filtered = statusFilter ? demoApplications.filter(a => a.status === statusFilter) : demoApplications;
  const statuses = [...new Set(demoApplications.map(a => a.status))];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem'}}>
        <h2 style={{color:'var(--primary)'}}>Admission Management</h2>
        <select className="form-control" style={{maxWidth:200}} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>{statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="stat-cards">
        <div className="stat-card"><div className="stat-card-label">Total</div><div className="stat-card-value">{demoApplications.length}</div></div>
        <div className="stat-card"><div className="stat-card-label">Pending</div><div className="stat-card-value">{demoApplications.filter(a => ['Submitted', 'Under Review'].includes(a.status)).length}</div></div>
        <div className="stat-card"><div className="stat-card-label">Selected</div><div className="stat-card-value">{demoApplications.filter(a => a.status === 'Selected').length}</div></div>
        <div className="stat-card"><div className="stat-card-label">Rejected</div><div className="stat-card-value">{demoApplications.filter(a => a.status === 'Rejected').length}</div></div>
      </div>
      <div className="dash-section">
        <div style={{overflowX:'auto'}}><table className="dash-table">
          <thead><tr><th>App ID</th><th>Name</th><th>Program</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{filtered.map(a => (
            <tr key={a.id}><td>{a.id}</td><td><strong>{a.name}</strong></td><td>{a.program}</td><td>{a.date}</td>
              <td><span className={`status-badge status-${a.status.toLowerCase().replace(/\s/g, '-')}`}>{a.status}</span></td>
              <td><button className="btn btn-outline btn-sm" style={{marginRight:'0.5rem'}}>View</button><button className="btn btn-primary btn-sm">Update</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
  );
};

export default AdminAdmissions;
