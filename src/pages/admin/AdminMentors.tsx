import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { api, fileUrl } from '../../lib/api';
import './AdminStudents.css';

export type Mentor = {
  id: number;
  mentorCode: string;
  name: string;
  photo: string;
  designation: string;
  subject: string;
  experience: number;
  expertise: string;
  bio: string;
  examCategory: string;
  qualification: string;
  phone: string;
  email: string;
  gender: string;
  status: 'Active' | 'Inactive';
  updatedAt?: string;
  username?: string;
  password?: string;
};

const DESIGNATIONS = ['Senior Mentor', 'Mentor', 'Senior Professor', 'Professor', 'Associate Professor', 'Lecturer'];
const SUBJECTS = ['Political Science & Governance', 'History', 'Geography', 'Economics', 'Ethics & Essay', 'Science & Technology', 'Current Affairs', 'Public Administration', 'Environment & Ecology', 'Tamil Nadu Special'];
const PROGRAMS = ['UPSC CSE', 'TNPSC', 'SSC CGL', 'IFoS', 'CAPF'];

const emptyMentor: Mentor = {
  id: 0,
  mentorCode: '',
  name: '',
  photo: '',
  designation: 'Mentor',
  subject: '',
  experience: 0,
  expertise: '',
  bio: '',
  examCategory: 'UPSC CSE',
  qualification: '',
  phone: '',
  email: '',
  gender: '',
  status: 'Active',
  username: '',
  password: '',
};

function mentorToFormData(mentor: Mentor, photo: File | null) {
  const data = new FormData();
  const skip = new Set(['id', 'photo', 'updatedAt']);
  (Object.keys(mentor) as (keyof Mentor)[]).forEach((key) => {
    if (skip.has(key)) return;
    const value = mentor[key];
    if (value === undefined || value === null) return;
    data.append(String(key), String(value));
  });
  if (photo) data.append('photo', photo);
  return data;
}

type ModalMode = 'add' | 'edit' | 'view';

const AdminMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [form, setForm] = useState<Mentor>(emptyMentor);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const loadMentors = useCallback(async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await api<{ mentors: Mentor[] }>(`/api/mentors${query ? `?search=${encodeURIComponent(query)}` : ''}`);
      setMentors(data.mentors);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load mentors.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMentors();
  }, [loadMentors]);

  const photoPreview = useMemo(() => {
    if (photoFile) return URL.createObjectURL(photoFile);
    if (form.photo) return fileUrl(form.photo, form.updatedAt);
    return '';
  }, [photoFile, form.photo, form.updatedAt]);

  const openModal = (nextMode: ModalMode, mentor?: Mentor) => {
    setError('');
    setPhotoFile(null);
    setMode(nextMode);
    setForm(mentor ? { ...emptyMentor, ...mentor, username: '', password: '' } : { ...emptyMentor });
  };

  const closeModal = () => {
    if (saving) return;
    setMode(null);
    setForm(emptyMentor);
    setPhotoFile(null);
  };

  const onChange = (field: keyof Mentor, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    loadMentors(search.trim());
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    setSaving(true);
    setError('');
    try {
      const body = mentorToFormData(form, photoFile);
      if (mode === 'add') {
        const data = await api<{ mentor: Mentor }>('/api/mentors', { method: 'POST', body });
        setMentors((prev) => [data.mentor, ...prev]);
        setNotice(`${data.mentor.name} has been added.`);
      } else if (mode === 'edit') {
        const data = await api<{ mentor: Mentor }>(`/api/mentors/${form.id}`, { method: 'PUT', body });
        setMentors((prev) => prev.map((m) => (m.id === data.mentor.id ? data.mentor : m)));
        setNotice(`${data.mentor.name} has been updated.`);
      }
      setMode(null);
      setPhotoFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save mentor.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (mentor: Mentor) => {
    if (!window.confirm(`Delete ${mentor.name} (${mentor.mentorCode})? This cannot be undone.`)) return;
    setError('');
    try {
      await api(`/api/mentors/${mentor.id}`, { method: 'DELETE' });
      setMentors((prev) => prev.filter((m) => m.id !== mentor.id));
      setNotice(`${mentor.name} has been deleted.`);
      if (mode && form.id === mentor.id) setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete mentor.');
    }
  };

  const disabled = mode === 'view';

  return (
    <div>
      <div className="student-page-header">
        <h2>Mentor Management</h2>
        <form className="student-toolbar" onSubmit={handleSearch}>
          <input
            className="form-control"
            placeholder="Search name, ID, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-outline">Search</button>
          <button type="button" className="btn btn-primary" onClick={() => openModal('add')}>+ Add Mentor</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !mode && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading mentors...</p>
        ) : mentors.length === 0 ? (
          <p className="student-empty">No mentors found. Add the first mentor to get started.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mentor</th>
                  <th>Designation</th>
                  <th>Subject</th>
                  <th>Program</th>
                  <th>Experience</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map((m) => (
                  <tr key={m.id}>
                    <td>{m.mentorCode}</td>
                    <td>
                      <div className="mentor-name-cell">
                        {m.photo ? <img src={fileUrl(m.photo, m.updatedAt)} alt="" className="mentor-table-photo" /> : <span className="mentor-table-photo placeholder">👤</span>}
                        <strong>{m.name}</strong>
                      </div>
                    </td>
                    <td>{m.designation}</td>
                    <td>{m.subject}</td>
                    <td>{m.examCategory}</td>
                    <td>{m.experience} yrs</td>
                    <td>{m.phone}</td>
                    <td><span className={`status-badge status-${m.status.toLowerCase()}`}>{m.status}</span></td>
                    <td className="student-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('view', m)}>View</button>
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('edit', m)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m)}>Delete</button>
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
              <h3>{mode === 'add' ? 'Add Mentor' : mode === 'edit' ? 'Edit Mentor' : 'Mentor Details'}</h3>
              <button type="button" className="dash-modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>
            {error && <div className="student-banner error">{error}</div>}
            <form onSubmit={handleSave}>
              {mode !== 'add' && <p className="student-code-line">Mentor ID: <strong>{form.mentorCode}</strong></p>}
              <div className="student-form-grid">
                <div className="form-group">
                  <label>Mentor name *</label>
                  <input className="form-control" value={form.name} required disabled={disabled} onChange={(e) => onChange('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-control" value={form.gender} disabled={disabled} onChange={(e) => onChange('gender', e.target.value)}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <select className="form-control" value={form.designation} disabled={disabled} onChange={(e) => onChange('designation', e.target.value)}>
                    {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
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
                  <select className="form-control" value={form.examCategory} disabled={disabled} onChange={(e) => onChange('examCategory', e.target.value)}>
                    {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Experience (years)</label>
                  <input type="number" min="0" className="form-control" value={form.experience} disabled={disabled} onChange={(e) => onChange('experience', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Qualification</label>
                  <input className="form-control" value={form.qualification} disabled={disabled} onChange={(e) => onChange('qualification', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input className="form-control" value={form.phone} disabled={disabled} onChange={(e) => onChange('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" value={form.email} disabled={disabled} onChange={(e) => onChange('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-control" value={form.status} disabled={disabled} onChange={(e) => onChange('status', e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group student-span-2">
                  <label>Expertise (comma separated)</label>
                  <input className="form-control" placeholder="Indian Polity, Governance, Constitution" value={form.expertise} disabled={disabled} onChange={(e) => onChange('expertise', e.target.value)} />
                </div>
                <div className="form-group student-span-2">
                  <label>Bio</label>
                  <textarea className="form-control" rows={3} value={form.bio} disabled={disabled} onChange={(e) => onChange('bio', e.target.value)} />
                </div>
                <div className="form-group student-span-2">
                  <label>Photo</label>
                  {!disabled && (
                    <input
                      type="file"
                      className="form-control"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPhotoFile(e.target.files?.[0] || null)}
                    />
                  )}
                  {photoPreview ? (
                    <img src={photoPreview} alt={form.name || 'Mentor'} className="mentor-preview-photo" />
                  ) : (
                    <p className="adm-hint" style={{ marginTop: '0.5rem' }}>No photo uploaded</p>
                  )}
                </div>
                {mode === 'add' && (
                  <>
                    <div className="form-group">
                      <label>Portal username (optional)</label>
                      <input className="form-control" value={form.username || ''} onChange={(e) => onChange('username', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Portal password</label>
                      <input type="password" className="form-control" value={form.password || ''} onChange={(e) => onChange('password', e.target.value)} />
                    </div>
                  </>
                )}
              </div>
              <div className="dash-modal-actions">
                {mode === 'view' ? (
                  <>
                    <button type="button" className="btn btn-outline" onClick={closeModal}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => setMode('edit')}>Edit</button>
                  </>
                ) : (
                  <>
                    {mode === 'edit' && (
                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(form)}>Delete</button>
                    )}
                    <button type="button" className="btn btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      {saving ? 'Saving...' : mode === 'add' ? 'Add Mentor' : 'Save Changes'}
                    </button>
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

export default AdminMentors;
