import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { api, fileUrl } from '../../lib/api';
import StatusToggle from '../../components/StatusToggle';
import { ALUMNI_SERVICES } from '../../data/contentFields';
import './AdminStudents.css';

export type Alumni = {
  id: number;
  alumniCode: string;
  name: string;
  photo: string;
  year: number | '';
  air: number | '';
  service: string;
  cadre: string;
  optionalSubject: string;
  currentDesignation: string;
  currentPosting: string;
  testimonial: string;
  status: 'Active' | 'Inactive';
  updatedAt?: string;
};

const emptyAlumni: Alumni = {
  id: 0,
  alumniCode: '',
  name: '',
  photo: '',
  year: new Date().getFullYear(),
  air: '',
  service: 'IAS',
  cadre: '',
  optionalSubject: '',
  currentDesignation: '',
  currentPosting: '',
  testimonial: '',
  status: 'Active',
};

function alumniToFormData(item: Alumni, photo: File | null) {
  const data = new FormData();
  const skip = new Set(['id', 'photo', 'updatedAt', 'alumniCode']);
  (Object.keys(item) as (keyof Alumni)[]).forEach((key) => {
    if (skip.has(key)) return;
    const value = item[key];
    if (value === undefined || value === null) return;
    data.append(String(key), String(value));
  });
  if (photo) data.append('photo', photo);
  return data;
}

type ModalMode = 'add' | 'edit' | 'view';

const AdminAlumni = () => {
  const [items, setItems] = useState<Alumni[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [form, setForm] = useState<Alumni>(emptyAlumni);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const load = useCallback(async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await api<{ alumni: Alumni[] }>(`/api/alumni${query ? `?search=${encodeURIComponent(query)}` : ''}`);
      setItems(data.alumni);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load alumni.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const photoPreview = useMemo(() => {
    if (photoFile) return URL.createObjectURL(photoFile);
    if (form.photo) return fileUrl(form.photo, form.updatedAt);
    return '';
  }, [photoFile, form.photo, form.updatedAt]);

  const openModal = (nextMode: ModalMode, item?: Alumni) => {
    setError('');
    setPhotoFile(null);
    setMode(nextMode);
    setForm(item ? { ...emptyAlumni, ...item } : { ...emptyAlumni });
  };

  const closeModal = () => {
    if (saving) return;
    setMode(null);
    setForm(emptyAlumni);
    setPhotoFile(null);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    setSaving(true);
    setError('');
    try {
      const body = alumniToFormData(form, photoFile);
      if (mode === 'add') {
        const data = await api<{ alumni: Alumni }>('/api/alumni', { method: 'POST', body });
        setItems((prev) => [data.alumni, ...prev]);
        setNotice(`${data.alumni.name} has been added.`);
      } else if (mode === 'edit') {
        const data = await api<{ alumni: Alumni }>(`/api/alumni/${form.id}`, { method: 'PUT', body });
        setItems((prev) => prev.map((a) => (a.id === data.alumni.id ? data.alumni : a)));
        setNotice(`${data.alumni.name} has been updated.`);
      }
      setMode(null);
      setPhotoFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save alumni.');
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (item: Alumni, status: Alumni['status']) => {
    try {
      const data = await api<{ alumni: Alumni }>(`/api/alumni/${item.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setItems((prev) => prev.map((a) => (a.id === data.alumni.id ? data.alumni : a)));
      setNotice(`${item.name} is now ${status}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update status.');
    }
  };

  const handleDelete = async (item: Alumni) => {
    if (!window.confirm(`Delete ${item.name}? This cannot be undone.`)) return;
    try {
      await api(`/api/alumni/${item.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((a) => a.id !== item.id));
      setNotice(`${item.name} has been deleted.`);
      if (mode && form.id === item.id) setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete alumni.');
    }
  };

  const disabled = mode === 'view';

  return (
    <div>
      <div className="student-page-header">
        <h2>Alumni Management</h2>
        <form className="student-toolbar" onSubmit={(e) => { e.preventDefault(); load(search.trim()); }}>
          <input className="form-control" placeholder="Search name, service..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-outline">Search</button>
          <button type="button" className="btn btn-primary" onClick={() => openModal('add')}>+ Add Alumni</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !mode && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading alumni...</p>
        ) : items.length === 0 ? (
          <p className="student-empty">No alumni yet. Add a profile to publish on the website.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Alumni</th>
                  <th>Year</th>
                  <th>AIR</th>
                  <th>Service</th>
                  <th>Posting</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.id}>
                    <td>{a.alumniCode}</td>
                    <td>
                      <div className="mentor-name-cell">
                        {a.photo ? <img src={fileUrl(a.photo, a.updatedAt)} alt="" className="mentor-table-photo" /> : <span className="mentor-table-photo">🏆</span>}
                        <strong>{a.name}</strong>
                      </div>
                    </td>
                    <td>{a.year || '—'}</td>
                    <td>{a.air || '—'}</td>
                    <td>{a.service}</td>
                    <td>{a.currentPosting || '—'}</td>
                    <td><StatusToggle value={a.status} onChange={(status) => setStatus(a, status)} /></td>
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
              <h3>{mode === 'add' ? 'Add Alumni' : mode === 'edit' ? 'Edit Alumni' : 'Alumni Details'}</h3>
              <button type="button" className="dash-modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>
            {error && <div className="student-banner error">{error}</div>}
            <form onSubmit={handleSave}>
              {mode !== 'add' && <p className="student-code-line">Alumni ID: <strong>{form.alumniCode}</strong></p>}
              <div className="student-form-grid">
                <div className="form-group">
                  <label>Name *</label>
                  <input className="form-control" value={form.name} required disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input type="number" className="form-control" value={form.year} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value ? Number(e.target.value) : '' }))} />
                </div>
                <div className="form-group">
                  <label>AIR</label>
                  <input type="number" className="form-control" value={form.air} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, air: e.target.value ? Number(e.target.value) : '' }))} />
                </div>
                <div className="form-group">
                  <label>Service</label>
                  <select className="form-control" value={form.service} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}>
                    {ALUMNI_SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Cadre</label>
                  <input className="form-control" value={form.cadre} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, cadre: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Optional subject</label>
                  <input className="form-control" value={form.optionalSubject} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, optionalSubject: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Current designation</label>
                  <input className="form-control" value={form.currentDesignation} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, currentDesignation: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Current posting</label>
                  <input className="form-control" value={form.currentPosting} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, currentPosting: e.target.value }))} />
                </div>
                <div className="form-group student-span-2">
                  <label>Testimonial</label>
                  <textarea className="form-control" rows={3} value={form.testimonial} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, testimonial: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Photo</label>
                  <input type="file" className="form-control" accept=".jpg,.jpeg,.png,.webp" disabled={disabled} onChange={(e: ChangeEvent<HTMLInputElement>) => setPhotoFile(e.target.files?.[0] || null)} />
                  {photoPreview && <img src={photoPreview} alt="" className="mentor-preview-photo" />}
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <StatusToggle value={form.status} disabled={disabled} onChange={(status) => setForm((p) => ({ ...p, status }))} />
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
                    <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : mode === 'add' ? 'Add Alumni' : 'Save Changes'}</button>
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

export default AdminAlumni;
