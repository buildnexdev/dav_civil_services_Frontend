import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import './AdminStudents.css';

type Application = {
  id: number;
  applicationCode: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  state: string;
  tenth: number | '';
  twelfth: number | '';
  degree: string;
  university: string;
  percentage: number | '';
  gradYear: number | '';
  program: string;
  status: string;
  remarks: string;
  createdAt: string;
};

const STATUSES = [
  'Submitted',
  'Under Review',
  'Documents Verified',
  'Exam Scheduled',
  'Shortlisted',
  'Interview',
  'Selected',
  'Rejected'
];

const AdminAdmissions = () => {
  const [items, setItems] = useState<Application[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, selected: 0, rejected: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [viewing, setViewing] = useState<Application | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [remarks, setRemarks] = useState('');

  const load = useCallback(async (query = '', status = '') => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('search', query.trim());
      if (status) params.set('status', status);
      const qs = params.toString();
      const data = await api<{ applications: Application[]; stats: typeof stats }>(`/api/applications${qs ? `?${qs}` : ''}`);
      setItems(data.applications);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    load(search, statusFilter);
  };

  const openView = (item: Application) => {
    setError('');
    setViewing(item);
    setEditStatus(item.status);
    setRemarks(item.remarks || '');
  };

  const handleStatusSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!viewing) return;
    setSaving(true);
    setError('');
    try {
      const data = await api<{ application: Application }>(`/api/applications/${viewing.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: editStatus, remarks })
      });
      setItems((prev) => prev.map((item) => (item.id === data.application.id ? data.application : item)));
      setViewing(data.application);
      setNotice(`${data.application.applicationCode} updated to ${data.application.status}.`);
      await load(search, statusFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update status.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Application) => {
    if (!window.confirm(`Delete application ${item.applicationCode} (${item.name})?`)) return;
    try {
      await api(`/api/applications/${item.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((row) => row.id !== item.id));
      setNotice(`${item.applicationCode} deleted.`);
      if (viewing?.id === item.id) setViewing(null);
      await load(search, statusFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete application.');
    }
  };

  const badge = (status: string) => `status-badge status-${status.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div>
      <div className="student-page-header">
        <h2>Admission Management</h2>
        <form className="student-toolbar" onSubmit={handleSearch}>
          <input className="form-control" placeholder="Search ID, name, email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <button type="submit" className="btn btn-outline">Search</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !viewing && <div className="student-banner error">{error}</div>}

      <div className="stat-cards">
        <div className="stat-card"><div className="stat-card-label">Total</div><div className="stat-card-value">{stats.total}</div></div>
        <div className="stat-card"><div className="stat-card-label">Pending</div><div className="stat-card-value">{stats.pending}</div></div>
        <div className="stat-card"><div className="stat-card-label">Selected</div><div className="stat-card-value">{stats.selected}</div></div>
        <div className="stat-card"><div className="stat-card-label">Rejected</div><div className="stat-card-value">{stats.rejected}</div></div>
      </div>

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading applications...</p>
        ) : items.length === 0 ? (
          <p className="student-empty">No applications yet. New submissions from Apply Online will appear here.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.applicationCode}</td>
                    <td><strong>{item.name}</strong><div className="text-muted">{item.email || '—'}</div></td>
                    <td>{item.program || '—'}</td>
                    <td>{item.phone || '—'}</td>
                    <td>{item.createdAt || '—'}</td>
                    <td><span className={badge(item.status)}>{item.status}</span></td>
                    <td className="student-actions">
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => openView(item)}>View</button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewing && (
        <div className="dash-modal-overlay" onClick={() => !saving && setViewing(null)}>
          <div className="dash-modal dash-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>{viewing.applicationCode} — {viewing.name}</h3>
              <button type="button" className="dash-modal-close" onClick={() => setViewing(null)} aria-label="Close">×</button>
            </div>
            {error && <div className="student-banner error">{error}</div>}
            <div className="student-form-grid" style={{ marginBottom: '1rem' }}>
              <div><strong>Email:</strong> {viewing.email || '—'}</div>
              <div><strong>Phone:</strong> {viewing.phone || '—'}</div>
              <div><strong>DOB:</strong> {viewing.dob || '—'}</div>
              <div><strong>Gender:</strong> {viewing.gender || '—'}</div>
              <div><strong>Program:</strong> {viewing.program || '—'}</div>
              <div><strong>Degree:</strong> {viewing.degree || '—'}</div>
              <div><strong>University:</strong> {viewing.university || '—'}</div>
              <div><strong>Grad year:</strong> {viewing.gradYear || '—'}</div>
              <div><strong>10th:</strong> {viewing.tenth || '—'}</div>
              <div><strong>12th:</strong> {viewing.twelfth || '—'}</div>
              <div><strong>District:</strong> {viewing.district || '—'}</div>
              <div><strong>State:</strong> {viewing.state || '—'}</div>
              <div className="student-span-2"><strong>Address:</strong> {viewing.address || '—'}</div>
            </div>
            <form onSubmit={handleStatusSave}>
              <div className="student-form-grid">
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-control" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                    {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
                <div className="form-group student-span-2">
                  <label>Remarks</label>
                  <input className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Internal note" />
                </div>
              </div>
              <div className="dash-modal-actions">
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(viewing)}>Delete</button>
                <button type="button" className="btn btn-outline" onClick={() => setViewing(null)} disabled={saving}>Close</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Update status'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdmissions;
