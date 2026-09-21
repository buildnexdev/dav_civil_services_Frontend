import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api, fileUrl } from '../../lib/api';
import '../admin/AdminStudents.css';

type Mentor = {
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
  status: string;
  updatedAt?: string;
};

const StaffProfile = () => {
  const [form, setForm] = useState<Mentor | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [missing, setMissing] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api<{ mentor: Mentor }>('/api/mentors/me');
      setForm(data.mentor);
      setMissing(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load profile.';
      if (message.toLowerCase().includes('linked') || message.toLowerCase().includes('not found')) {
        setMissing(true);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError('');
    try {
      const body = new FormData();
      (['name', 'designation', 'subject', 'experience', 'expertise', 'bio', 'examCategory', 'qualification', 'phone', 'email', 'gender'] as const).forEach((key) => {
        body.append(key, String(form[key] ?? ''));
      });
      if (photoFile) body.append('photo', photoFile);
      const data = await api<{ mentor: Mentor }>('/api/mentors/me', { method: 'PUT', body });
      setForm(data.mentor);
      setPhotoFile(null);
      setEditing(false);
      setNotice('Profile updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="student-empty">Loading profile...</p>;
  if (missing) return <p className="student-empty">No mentor profile is linked to this login yet. Ask admin to create your mentor record with portal credentials.</p>;
  if (!form) return <p className="student-empty">{error || 'Profile unavailable.'}</p>;

  return (
    <div>
      <div className="student-page-header">
        <div>
          <h2>My Profile</h2>
          <p className="student-code-line">Mentor ID: <strong>{form.mentorCode}</strong></p>
        </div>
        {!editing && <button type="button" className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>}
      </div>
      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        <form onSubmit={handleSave} className="student-form-grid">
          <div className="form-group student-span-2" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {form.photo || photoFile ? (
              <img
                src={photoFile ? URL.createObjectURL(photoFile) : fileUrl(form.photo, form.updatedAt)}
                alt={form.name}
                style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--bg-soft)', display: 'grid', placeItems: 'center' }}>👤</div>
            )}
            {editing && <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />}
          </div>
          {([
            ['name', 'Name'],
            ['designation', 'Designation'],
            ['subject', 'Subject'],
            ['experience', 'Experience (years)'],
            ['examCategory', 'Exam category'],
            ['qualification', 'Qualification'],
            ['phone', 'Phone'],
            ['email', 'Email'],
            ['gender', 'Gender']
          ] as const).map(([key, label]) => (
            <div className="form-group" key={key}>
              <label>{label}</label>
              <input
                className="form-control"
                type={key === 'experience' ? 'number' : 'text'}
                value={form[key] ?? ''}
                disabled={!editing}
                onChange={(e) => setForm((prev) => prev ? { ...prev, [key]: key === 'experience' ? Number(e.target.value) : e.target.value } : prev)}
              />
            </div>
          ))}
          <div className="form-group student-span-2">
            <label>Expertise</label>
            <input className="form-control" value={form.expertise} disabled={!editing} onChange={(e) => setForm((p) => p ? { ...p, expertise: e.target.value } : p)} />
          </div>
          <div className="form-group student-span-2">
            <label>Bio</label>
            <textarea className="form-control" rows={3} value={form.bio} disabled={!editing} onChange={(e) => setForm((p) => p ? { ...p, bio: e.target.value } : p)} />
          </div>
          {editing && (
            <div className="form-group student-span-2" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline" disabled={saving} onClick={() => { setEditing(false); setPhotoFile(null); load(); }}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StaffProfile;
