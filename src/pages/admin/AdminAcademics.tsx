import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import type { Mentor } from './AdminMentors';
import './AdminStudents.css';

export type Academic = {
  id: number;
  academicCode: string;
  title: string;
  type: 'Class' | 'Test' | 'Assignment' | 'Mentorship' | 'Schedule';
  subject: string;
  program: string;
  batch: string;
  mentorId: number | '';
  mentorName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  description: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
};

const TYPES: Academic['type'][] = ['Class', 'Test', 'Assignment', 'Mentorship', 'Schedule'];
const STATUSES: Academic['status'][] = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
const PROGRAMS = ['UPSC CSE', 'TNPSC', 'SSC CGL', 'IFoS', 'CAPF'];
const BATCHES = ['2025-A', '2025-B', '2024-A', '2024-B'];
const SUBJECTS = ['Political Science & Governance', 'History', 'Geography', 'Economics', 'Ethics & Essay', 'Science & Technology', 'Current Affairs', 'Public Administration', 'Environment & Ecology'];

const emptyAcademic: Academic = {
  id: 0,
  academicCode: '',
  title: '',
  type: 'Class',
  subject: '',
  program: 'UPSC CSE',
  batch: '2025-A',
  mentorId: '',
  mentorName: '',
  sessionDate: '',
  startTime: '',
  endTime: '',
  venue: '',
  description: '',
  status: 'Upcoming',
};

type ModalMode = 'add' | 'edit' | 'view';

const AdminAcademics = () => {
  const [items, setItems] = useState<Academic[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [form, setForm] = useState<Academic>(emptyAcademic);

  const load = useCallback(async (query = '', type = '') => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('search', query.trim());
      if (type) params.set('type', type);
      const qs = params.toString();
      const data = await api<{ academics: Academic[] }>(`/api/academics${qs ? `?${qs}` : ''}`);
      setItems(data.academics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load academics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    api<{ mentors: Mentor[] }>('/api/mentors').then((data) => setMentors(data.mentors)).catch(() => {});
  }, [load]);

  const openModal = (nextMode: ModalMode, item?: Academic) => {
    setError('');
    setMode(nextMode);
    setForm(item ? { ...emptyAcademic, ...item, mentorId: item.mentorId || '' } : { ...emptyAcademic });
  };

  const closeModal = () => {
    if (saving) return;
    setMode(null);
    setForm(emptyAcademic);
  };

  const onChange = (field: keyof Academic, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    setSaving(true);
    setError('');
    try {
      if (mode === 'add') {
        const data = await api<{ academic: Academic }>('/api/academics', {
          method: 'POST',
          body: JSON.stringify(form),
        });
        setItems((prev) => [data.academic, ...prev]);
        setNotice(`${data.academic.title} has been added.`);
      } else if (mode === 'edit') {
        const data = await api<{ academic: Academic }>(`/api/academics/${form.id}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        });
        setItems((prev) => prev.map((a) => (a.id === data.academic.id ? data.academic : a)));
        setNotice(`${data.academic.title} has been updated.`);
      }
      setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save academic record.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Academic) => {
    if (!window.confirm(`Delete ${item.title} (${item.academicCode})? This cannot be undone.`)) return;
    try {
      await api(`/api/academics/${item.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((a) => a.id !== item.id));
      setNotice(`${item.title} has been deleted.`);
      if (mode && form.id === item.id) setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete academic record.');
    }
  };

  const disabled = mode === 'view';

  return (
    <div>
      <div className="student-page-header">
        <h2>Academic Management</h2>
        <form className="student-toolbar" onSubmit={(e) => { e.preventDefault(); load(search, typeFilter); }}>
          <select className="form-control" style={{ width: 150 }} value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); load(search, e.target.value); }}>
            <option value="">All types</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input className="form-control" placeholder="Search title, subject..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-outline">Search</button>
          <button type="button" className="btn btn-primary" onClick={() => openModal('add')}>+ Add Session</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !mode && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading academics...</p>
        ) : items.length === 0 ? (
          <p className="student-empty">No academic sessions found. Add a class, test, or assignment to get started.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Subject</th>
                  <th>Batch</th>
                  <th>Date</th>
                  <th>Mentor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.id}>
                    <td>{a.academicCode}</td>
                    <td><strong>{a.title}</strong></td>
                    <td>{a.type}</td>
                    <td>{a.subject}</td>
                    <td>{a.batch}</td>
                    <td>{a.sessionDate}</td>
                    <td>{a.mentorName || '—'}</td>
                    <td><span className={`status-badge status-${a.status.toLowerCase()}`}>{a.status}</span></td>
                    <td className="student-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('view', a)}>View</button>
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('edit', a)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {mode && (
        <div className="dash-modal-overlay" onClick={closeModal}>
          <div className="dash-modal dash-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>{mode === 'add' ? 'Add Academic Session' : mode === 'edit' ? 'Edit Academic Session' : 'Session Details'}</h3>
              <button type="button" className="dash-modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>
            {error && <div className="student-banner error">{error}</div>}
            <form onSubmit={handleSave}>
              {mode !== 'add' && <p className="student-code-line">Session ID: <strong>{form.academicCode}</strong></p>}
              <div className="student-form-grid">
                <div className="form-group student-span-2">
                  <label>Title *</label>
                  <input className="form-control" value={form.title} required disabled={disabled} onChange={(e) => onChange('title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select className="form-control" value={form.type} disabled={disabled} onChange={(e) => onChange('type', e.target.value)}>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-control" value={form.status} disabled={disabled} onChange={(e) => onChange('status', e.target.value)}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select className="form-control" value={form.subject} disabled={disabled} onChange={(e) => onChange('subject', e.target.value)}>
                    <option value="">-Select-</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Program</label>
                  <select className="form-control" value={form.program} disabled={disabled} onChange={(e) => onChange('program', e.target.value)}>
                    {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Batch</label>
                  <select className="form-control" value={form.batch} disabled={disabled} onChange={(e) => onChange('batch', e.target.value)}>
                    {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Mentor</label>
                  <select className="form-control" value={form.mentorId} disabled={disabled} onChange={(e) => onChange('mentorId', e.target.value)}>
                    <option value="">-Select-</option>
                    {mentors.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" value={form.sessionDate} disabled={disabled} onChange={(e) => onChange('sessionDate', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Start time</label>
                  <input type="time" className="form-control" value={form.startTime} disabled={disabled} onChange={(e) => onChange('startTime', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>End time</label>
                  <input type="time" className="form-control" value={form.endTime} disabled={disabled} onChange={(e) => onChange('endTime', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Venue</label>
                  <input className="form-control" value={form.venue} disabled={disabled} onChange={(e) => onChange('venue', e.target.value)} />
                </div>
                <div className="form-group student-span-2">
                  <label>Description</label>
                  <textarea className="form-control" rows={3} value={form.description} disabled={disabled} onChange={(e) => onChange('description', e.target.value)} />
                </div>
              </div>
              <div className="dash-modal-actions">
                {mode === 'view' ? (
                  <>
                    <button type="button" className="btn btn-outline" onClick={closeModal}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => setMode('edit')}>Edit</button>
                  </>
                ) : (
                  <>
                    {mode === 'edit' && <button type="button" className="btn btn-danger" onClick={() => handleDelete(form)}>Delete</button>}
                    <button type="button" className="btn btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : mode === 'add' ? 'Add Session' : 'Save Changes'}</button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAcademics;
