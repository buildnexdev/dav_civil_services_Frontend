import { useState } from 'react';
import { demoStudents } from '../../data/demoData';

const AdminStudents = () => {
  const [search, setSearch] = useState('');
  const filtered = demoStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem'}}>
        <h2 style={{color:'var(--primary)'}}>Student Management</h2>
        <div style={{display:'flex', gap:'1rem'}}>
          <input className="form-control" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} style={{maxWidth:250}} />
          <button className="btn btn-primary">+ Add Student</button>
        </div>
      </div>
      <div className="dash-section">
        <div style={{overflowX:'auto'}}><table className="dash-table">
          <thead><tr><th>ID</th><th>Name</th><th>Program</th><th>Batch</th><th>Phone</th><th>Attendance</th><th>Performance</th><th>Scholarship</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{filtered.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td><td><strong>{s.name}</strong></td><td>{s.program}</td><td>{s.batch}</td><td>{s.phone}</td>
              <td>{s.attendance}%</td><td>{s.performance}%</td><td>{s.scholarship}</td>
              <td><span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span></td>
              <td><button className="btn btn-outline btn-sm" style={{marginRight:'0.5rem'}}>View</button><button className="btn btn-outline btn-sm">Edit</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
  );
};

export default AdminStudents;
