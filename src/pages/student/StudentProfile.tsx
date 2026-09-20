import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import StudentAdmissionForm from '../../components/StudentAdmissionForm';
import { emptyStudent, studentToFormData, type FileField, type Student } from '../../types/student';
import '../admin/AdminStudents.css';

const StudentProfile = () => {
  const [form, setForm] = useState<Student>(emptyStudent);
  const [files, setFiles] = useState<Partial<Record<FileField, File | null>>>({});
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
      const data = await api<{ student: Student }>('/api/students/me');
      setForm({ ...emptyStudent, ...data.student });
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
    setSaving(true);
    setError('');
    try {
      const data = await api<{ student: Student }>('/api/students/me', {
        method: 'PUT',
        body: studentToFormData(form, files),
      });
      setForm({ ...emptyStudent, ...data.student });
      setFiles({});
      setEditing(false);
      setNotice('Your profile has been updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="student-page-header">
        <div>
          <h2>My Profile</h2>
          {form.studentCode ? <p className="student-code-line">Student ID: <strong>{form.studentCode}</strong></p> : null}
        </div>
        {!missing && !loading && (
          editing ? null : (
            <button type="button" className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
          )
        )}
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading your profile...</p>
        ) : missing ? (
          <p className="student-empty">No student profile is linked to this login yet. Please contact the admin office.</p>
        ) : (
          <form onSubmit={handleSave}>
            <StudentAdmissionForm
              form={form}
              files={files}
              readOnly={!editing}
              onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
              onFile={(field, file) => setFiles((prev) => ({ ...prev, [field]: file }))}
            />
            {editing && (
              <div className="dash-modal-actions">
                <button type="button" className="btn btn-outline" disabled={saving} onClick={() => { setEditing(false); load(); setFiles({}); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
