import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import StudentAdmissionForm from '../../components/StudentAdmissionForm';
import { emptyStudent, studentToFormData, type FileField, type Student } from '../../types/student';
import './AdminStudents.css';

type ModalMode = 'add' | 'edit' | 'view';

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [form, setForm] = useState<Student>(emptyStudent);
  const [files, setFiles] = useState<Partial<Record<FileField, File | null>>>({});

  const loadStudents = useCallback(async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await api<{ students: Student[] }>(`/api/students${query ? `?search=${encodeURIComponent(query)}` : ''}`);
      setStudents(data.students);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const openModal = (nextMode: ModalMode, student?: Student) => {
    setError('');
    setFiles({});
    setMode(nextMode);
    setForm(student ? { ...emptyStudent, ...student, username: '', password: '' } : { ...emptyStudent });
  };

  const closeModal = () => {
    if (saving) return;
    setMode(null);
    setForm(emptyStudent);
    setFiles({});
  };

  const onChange = (field: keyof Student, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    loadStudents(search.trim());
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    setSaving(true);
    setError('');
    try {
      const body = studentToFormData(form, files);
      if (mode === 'add') {
        const data = await api<{ student: Student }>('/api/students', { method: 'POST', body });
        setStudents((prev) => [data.student, ...prev]);
        setNotice(`${data.student.name} has been added.`);
      } else if (mode === 'edit') {
        const data = await api<{ student: Student }>(`/api/students/${form.id}`, { method: 'PUT', body });
        setStudents((prev) => prev.map((s) => (s.id === data.student.id ? data.student : s)));
        setNotice(`${data.student.name} has been updated.`);
      }
      setMode(null);
      setFiles({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save student.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (student: Student) => {
    if (!window.confirm(`Delete ${student.name} (${student.studentCode})? This cannot be undone.`)) return;
    setError('');
    try {
      await api(`/api/students/${student.id}`, { method: 'DELETE' });
      setStudents((prev) => prev.filter((s) => s.id !== student.id));
      setNotice(`${student.name} has been deleted.`);
      if (mode && form.id === student.id) setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete student.');
    }
  };

  return (
    <div>
      <div className="student-page-header">
        <h2>Student Management</h2>
        <form className="student-toolbar" onSubmit={handleSearch}>
          <input
            className="form-control"
            placeholder="Search name, ID, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-outline">Search</button>
          <button type="button" className="btn btn-primary" onClick={() => openModal('add')}>+ Add Student</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !mode && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="student-empty">No students found. Add the first student to get started.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Batch</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Community</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.studentCode}</td>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.program}</td>
                    <td>{s.batch}</td>
                    <td>{s.phone}</td>
                    <td>{s.city}</td>
                    <td>{s.community}</td>
                    <td><span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span></td>
                    <td className="student-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('view', s)}>View</button>
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('edit', s)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s)}>Delete</button>
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
              <h3>{mode === 'add' ? 'Add Student' : mode === 'edit' ? 'Edit Student' : 'Student Details'}</h3>
              <button type="button" className="dash-modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>

            {error && <div className="student-banner error">{error}</div>}

            <form onSubmit={handleSave}>
              {mode !== 'add' && (
                <p className="student-code-line">Student ID: <strong>{form.studentCode}</strong></p>
              )}
              <StudentAdmissionForm
                form={form}
                files={files}
                readOnly={mode === 'view'}
                showLoginFields={mode === 'add'}
                onChange={onChange}
                onFile={(field, file) => setFiles((prev) => ({ ...prev, [field]: file }))}
              />
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
                      {saving ? 'Saving...' : mode === 'add' ? 'Add Student' : 'Save Changes'}
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

export default AdminStudents;
