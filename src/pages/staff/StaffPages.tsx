import { useCallback, useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { API_BASE, api } from '../../lib/api';
import '../student/StudentPortal.css';
import '../admin/AdminStudents.css';

export { default as StaffProfile } from './StaffProfile';

type Academic = {
  id?: number;
  title: string;
  type: string;
  subject: string;
  program: string;
  batch: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  description: string;
  status: string;
};

const emptySession = (type: string): Academic => ({
  title: '',
  type,
  subject: '',
  program: '',
  batch: '',
  sessionDate: '',
  startTime: '',
  endTime: '',
  venue: '',
  description: '',
  status: 'Upcoming'
});

function PageShell({
  title,
  description,
  loading,
  error,
  notice,
  onClearNotice,
  actions,
  children
}: {
  title: string;
  description: string;
  loading?: boolean;
  error?: string;
  notice?: string;
  onClearNotice?: () => void;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="student-portal-page">
      <div className="student-page-header">
        <div>
          <h2>{title}</h2>
          <p className="student-page-desc">{description}</p>
        </div>
        {actions}
      </div>
      {notice && <div className="student-banner success">{notice}<button type="button" onClick={onClearNotice}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}
      {loading ? <p className="student-empty">Loading...</p> : children}
    </div>
  );
}

function SessionManager({
  title,
  description,
  type,
  typesQuery
}: {
  title: string;
  description: string;
  type: string;
  typesQuery?: string;
}) {
  const [rows, setRows] = useState<Academic[]>([]);
  const [form, setForm] = useState<Academic>(emptySession(type));
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const q = typesQuery || type;
      const data = await api<{ academics: Academic[] }>(`/api/mentor-portal/sessions?types=${encodeURIComponent(q)}`);
      setRows(data.academics || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions.');
    } finally {
      setLoading(false);
    }
  }, [type, typesQuery]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await api(`/api/mentor-portal/sessions/${editingId}`, { method: 'PUT', body: JSON.stringify(form) });
        setNotice('Session updated.');
      } else {
        await api('/api/mentor-portal/sessions', { method: 'POST', body: JSON.stringify(form) });
        setNotice('Session created.');
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptySession(type));
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save session.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell
      title={title}
      description={description}
      loading={loading}
      error={error}
      notice={notice}
      onClearNotice={() => setNotice('')}
      actions={
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setEditingId(null);
            setForm(emptySession(type));
            setShowForm(true);
          }}
        >
          + Add
        </button>
      }
    >
      {showForm && (
        <div className="dash-section">
          <h3>{editingId ? 'Edit' : 'Add'} {type}</h3>
          <form onSubmit={save} className="student-form-grid">
            <div className="form-group student-span-2"><label>Title</label><input className="form-control" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
            <div className="form-group"><label>Subject</label><input className="form-control" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} /></div>
            <div className="form-group"><label>Batch</label><input className="form-control" value={form.batch} onChange={(e) => setForm((p) => ({ ...p, batch: e.target.value }))} placeholder="e.g. 2026-A" /></div>
            <div className="form-group"><label>Program</label><input className="form-control" value={form.program} onChange={(e) => setForm((p) => ({ ...p, program: e.target.value }))} /></div>
            <div className="form-group"><label>Date</label><input type="date" className="form-control" value={form.sessionDate} onChange={(e) => setForm((p) => ({ ...p, sessionDate: e.target.value }))} /></div>
            <div className="form-group"><label>Start</label><input className="form-control" value={form.startTime} onChange={(e) => setForm((p) => ({ ...p, startTime: e.target.value }))} placeholder="09:00" /></div>
            <div className="form-group"><label>End</label><input className="form-control" value={form.endTime} onChange={(e) => setForm((p) => ({ ...p, endTime: e.target.value }))} placeholder="11:00" /></div>
            <div className="form-group"><label>Venue</label><input className="form-control" value={form.venue} onChange={(e) => setForm((p) => ({ ...p, venue: e.target.value }))} /></div>
            <div className="form-group">
              <label>Status</label>
              <select className="form-control" value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="form-group student-span-2"><label>Description</label><textarea className="form-control" rows={2} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></div>
            <div className="form-group student-span-2" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="dash-section">
        {rows.length === 0 ? (
          <p className="student-empty">No {type.toLowerCase()} sessions yet. Create one to get started.</p>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Batch</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.title}</strong><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.subject || '—'}</div></td>
                  <td>{row.batch || '—'}</td>
                  <td>{row.sessionDate || '—'}</td>
                  <td>{[row.startTime, row.endTime].filter(Boolean).join(' – ') || '—'}</td>
                  <td><span className={`status-badge status-${row.status.toLowerCase()}`}>{row.status}</span></td>
                  <td style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setEditingId(row.id!);
                        setForm({ ...emptySession(type), ...row, type });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        if (!window.confirm('Delete this session?')) return;
                        await api(`/api/mentor-portal/sessions/${row.id}`, { method: 'DELETE' });
                        setNotice('Deleted.');
                        await load();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageShell>
  );
}

export const StaffClasses = () => (
  <SessionManager title="My Classes" description="Create and manage your class and schedule sessions." type="Class" typesQuery="Class,Schedule" />
);

export const StaffTests = () => (
  <SessionManager title="Tests" description="Create and manage tests for your batches." type="Test" />
);

export const StaffMentorship = () => (
  <SessionManager title="Mentorship" description="Schedule and track mentorship sessions." type="Mentorship" />
);

export const StaffStudents = () => {
  const [rows, setRows] = useState<{
    id: number;
    studentCode: string;
    name: string;
    program: string;
    batch: string;
    phone: string;
    attendance: number;
    performance: number;
    status: string;
  }[]>([]);
  const [batches, setBatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ students: typeof rows; batches: string[] }>('/api/mentor-portal/students')
      .then((data) => {
        setRows(data.students || []);
        setBatches(data.batches || []);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load students.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="Students" description="Students in batches linked to your sessions." loading={loading} error={error}>
      {batches.length > 0 && (
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Your batches: {batches.join(', ')}</p>
      )}
      <div className="dash-section">
        {rows.length === 0 ? (
          <p className="student-empty">No students found. Create a class/test with a batch to link students.</p>
        ) : (
          <table className="dash-table">
            <thead><tr><th>ID</th><th>Name</th><th>Batch</th><th>Program</th><th>Attendance</th><th>Performance</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id}>
                  <td>{s.studentCode}</td>
                  <td>{s.name}</td>
                  <td>{s.batch || '—'}</td>
                  <td>{s.program || '—'}</td>
                  <td>{s.attendance}%</td>
                  <td>{s.performance}%</td>
                  <td><span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageShell>
  );
};

export const StaffAttendance = () => {
  const [batches, setBatches] = useState<string[]>([]);
  const [batch, setBatch] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState<{
    studentId: number;
    studentCode: string;
    studentName: string;
    status: string;
    remarks: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    api<{ batches: string[] }>('/api/mentor-portal/students')
      .then((data) => {
        setBatches(data.batches || []);
        if (data.batches?.[0]) setBatch(data.batches[0]);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load batches.'))
      .finally(() => setLoading(false));
  }, []);

  const loadBatch = async () => {
    if (!batch || !date) return;
    setLoading(true);
    setError('');
    try {
      const data = await api<{ students: typeof students }>(
        `/api/mentor-portal/attendance/batch?batch=${encodeURIComponent(batch)}&date=${encodeURIComponent(date)}`
      );
      setStudents((data.students || []).map((s) => ({ ...s, status: s.status || 'Present' })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attendance.');
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      await api('/api/mentor-portal/attendance/batch', {
        method: 'POST',
        body: JSON.stringify({
          batch,
          attendanceDate: date,
          records: students.map((s) => ({ studentId: s.studentId, status: s.status, remarks: s.remarks }))
        })
      });
      setNotice('Attendance saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save attendance.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell title="Attendance" description="Mark attendance by batch and date." loading={false} error={error} notice={notice} onClearNotice={() => setNotice('')}>
      <div className="dash-section">
        <div className="student-form-grid" style={{ marginBottom: '1rem' }}>
          <div className="form-group">
            <label>Batch</label>
            <select className="form-control" value={batch} onChange={(e) => setBatch(e.target.value)}>
              <option value="">Select batch</option>
              {batches.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={loadBatch} disabled={!batch || loading}>Load</button>
            <button type="button" className="btn btn-primary" onClick={save} disabled={!students.length || saving}>{saving ? 'Saving...' : 'Save Attendance'}</button>
          </div>
        </div>
        {loading ? <p className="student-empty">Loading...</p> : students.length === 0 ? (
          <p className="student-empty">Load a batch to mark attendance.</p>
        ) : (
          <table className="dash-table">
            <thead><tr><th>Student</th><th>Status</th><th>Remarks</th></tr></thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={s.studentId}>
                  <td>{s.studentCode} — {s.studentName}</td>
                  <td>
                    <select
                      className="form-control"
                      value={s.status}
                      onChange={(e) => setStudents((prev) => prev.map((row, i) => (i === idx ? { ...row, status: e.target.value } : row)))}
                    >
                      <option>Present</option>
                      <option>Absent</option>
                      <option>Leave</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      value={s.remarks}
                      onChange={(e) => setStudents((prev) => prev.map((row, i) => (i === idx ? { ...row, remarks: e.target.value } : row)))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageShell>
  );
};

export const StaffAssignments = () => {
  const [rows, setRows] = useState<(Academic & {
    id: number;
    submissions: {
      id: number;
      studentName: string;
      studentCode: string;
      content: string;
      filePath: string;
      status: string;
      score: number | null;
      feedback: string;
    }[];
  })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptySession('Assignment'));
  const [gradeId, setGradeId] = useState<number | null>(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<{ assignments: typeof rows }>('/api/mentor-portal/assignments');
      setRows(data.assignments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assignments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api('/api/mentor-portal/sessions', { method: 'POST', body: JSON.stringify({ ...form, type: 'Assignment' }) });
      setShowCreate(false);
      setForm(emptySession('Assignment'));
      setNotice('Assignment created.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create assignment.');
    } finally {
      setSaving(false);
    }
  };

  const grade = async (e: FormEvent) => {
    e.preventDefault();
    if (!gradeId) return;
    setSaving(true);
    try {
      await api(`/api/mentor-portal/submissions/${gradeId}/grade`, {
        method: 'PUT',
        body: JSON.stringify({ score: score === '' ? null : Number(score), feedback, status: 'Graded' })
      });
      setGradeId(null);
      setNotice('Submission graded.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not grade submission.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell
      title="Assignments"
      description="Create assignments and grade student submissions."
      loading={loading}
      error={error}
      notice={notice}
      onClearNotice={() => setNotice('')}
      actions={<button type="button" className="btn btn-primary" onClick={() => setShowCreate(true)}>+ Create Assignment</button>}
    >
      {showCreate && (
        <div className="dash-section">
          <form onSubmit={create} className="student-form-grid">
            <div className="form-group student-span-2"><label>Title</label><input className="form-control" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
            <div className="form-group"><label>Subject</label><input className="form-control" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} /></div>
            <div className="form-group"><label>Batch</label><input className="form-control" value={form.batch} onChange={(e) => setForm((p) => ({ ...p, batch: e.target.value }))} /></div>
            <div className="form-group"><label>Due date</label><input type="date" className="form-control" value={form.sessionDate} onChange={(e) => setForm((p) => ({ ...p, sessionDate: e.target.value }))} /></div>
            <div className="form-group student-span-2"><label>Instructions</label><textarea className="form-control" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></div>
            <div className="form-group student-span-2" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>Create</button>
            </div>
          </form>
        </div>
      )}

      {rows.map((row) => (
        <div className="dash-section" key={row.id}>
          <h3>{row.title}</h3>
          <p style={{ color: 'var(--text-muted)' }}>{row.batch || 'All'} · Due {row.sessionDate || '—'} · {row.submissions?.length || 0} submissions</p>
          {(row.submissions || []).length === 0 ? (
            <p className="student-empty">No submissions yet.</p>
          ) : (
            <table className="dash-table">
              <thead><tr><th>Student</th><th>Status</th><th>Score</th><th>File</th><th>Actions</th></tr></thead>
              <tbody>
                {row.submissions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.studentCode} — {s.studentName}<div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.content ? `${s.content.slice(0, 80)}...` : ''}</div></td>
                    <td><span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span></td>
                    <td>{s.score ?? '—'}</td>
                    <td>{s.filePath ? <a href={`${API_BASE}${s.filePath}`} target="_blank" rel="noreferrer">Open</a> : '—'}</td>
                    <td>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => { setGradeId(s.id); setScore(s.score === null ? '' : String(s.score)); setFeedback(s.feedback || ''); }}>Grade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}

      {gradeId !== null && (
        <div className="dash-modal-backdrop" onClick={() => !saving && setGradeId(null)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Grade submission</h3>
            <form onSubmit={grade}>
              <div className="form-group"><label>Score</label><input type="number" className="form-control" value={score} onChange={(e) => setScore(e.target.value)} /></div>
              <div className="form-group"><label>Feedback</label><textarea className="form-control" rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} /></div>
              <div className="dash-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setGradeId(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>Save grade</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export const StaffMaterials = () => {
  const [rows, setRows] = useState<{
    id?: number;
    title: string;
    subject: string;
    program: string;
    batch: string;
    description: string;
    filePath: string;
    externalUrl: string;
    status: string;
  }[]>([]);
  const empty = { title: '', subject: '', program: '', batch: '', description: '', filePath: '', externalUrl: '', status: 'Active' };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<{ materials: typeof rows }>('/api/mentor-portal/materials');
      setRows(data.materials || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load materials.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api(`/api/mentor-portal/materials/${editingId}`, { method: 'PUT', body: JSON.stringify(form) });
      } else {
        await api('/api/mentor-portal/materials', { method: 'POST', body: JSON.stringify(form) });
      }
      setForm(empty);
      setEditingId(null);
      setNotice('Material saved.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save material.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell title="Study Materials" description="Upload and manage study resources for students." loading={loading} error={error} notice={notice} onClearNotice={() => setNotice('')}>
      <div className="dash-section">
        <h3>{editingId ? 'Edit material' : 'Add material'}</h3>
        <form onSubmit={save} className="student-form-grid">
          <div className="form-group"><label>Title</label><input className="form-control" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
          <div className="form-group"><label>Subject</label><input className="form-control" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} /></div>
          <div className="form-group"><label>Batch</label><input className="form-control" value={form.batch} onChange={(e) => setForm((p) => ({ ...p, batch: e.target.value }))} /></div>
          <div className="form-group"><label>External URL</label><input className="form-control" value={form.externalUrl} onChange={(e) => setForm((p) => ({ ...p, externalUrl: e.target.value }))} /></div>
          <div className="form-group student-span-2"><label>Description</label><textarea className="form-control" rows={2} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></div>
          <div className="form-group student-span-2" style={{ display: 'flex', gap: '0.5rem' }}>
            {editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setForm(empty); }}>Cancel</button>}
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
      <div className="dash-section">
        <table className="dash-table">
          <thead><tr><th>Title</th><th>Subject</th><th>Batch</th><th>Actions</th></tr></thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.subject || '—'}</td>
                <td>{m.batch || 'All'}</td>
                <td style={{ display: 'flex', gap: '0.4rem' }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => { setEditingId(m.id!); setForm({ ...empty, ...m }); }}>Edit</button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={async () => { if (!window.confirm('Delete?')) return; await api(`/api/mentor-portal/materials/${m.id}`, { method: 'DELETE' }); await load(); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
};

export const StaffAnnouncements = () => {
  const [rows, setRows] = useState<{ id: number; title: string; message: string; type: string; publishedDate: string }[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<{ notifications: typeof rows }>('/api/mentor-portal/announcements');
      setRows(data.notifications || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load announcements.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api('/api/mentor-portal/announcements', { method: 'POST', body: JSON.stringify({ title, message, type: 'Academic' }) });
      setTitle('');
      setMessage('');
      setNotice('Announcement posted.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post announcement.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell title="Announcements" description="View and create notices for students." loading={loading} error={error} notice={notice} onClearNotice={() => setNotice('')}>
      <div className="dash-section">
        <form onSubmit={create} className="student-form-grid">
          <div className="form-group student-span-2"><label>Title</label><input className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="form-group student-span-2"><label>Message</label><textarea className="form-control" rows={3} required value={message} onChange={(e) => setMessage(e.target.value)} /></div>
          <div className="form-group"><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Posting...' : 'Post Announcement'}</button></div>
        </form>
      </div>
      <div className="dash-section">
        <div className="student-card-grid">
          {rows.map((row) => (
            <div className="student-info-card" key={row.id}>
              <div className="student-info-card-label">{row.type || 'General'} · {row.publishedDate || '—'}</div>
              <h3>{row.title}</h3>
              <p>{row.message}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export const StaffReports = () => {
  const [data, setData] = useState<{
    studentStats: { total: number; active: number; avgAttendance: number; avgPerformance: number };
    sessions: { total: number; classes: number; tests: number; assignments: number; mentorship: number };
    byBatch: { name: string; value: number; avgAttendance: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<NonNullable<typeof data>>('/api/mentor-portal/reports')
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load reports.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="Reports" description="Performance and attendance overview for your batches." loading={loading} error={error}>
      {!data ? null : (
        <>
          <div className="stat-cards">
            <div className="stat-card"><div className="stat-card-label">Students</div><div className="stat-card-value">{data.studentStats.total}</div></div>
            <div className="stat-card"><div className="stat-card-label">Avg Attendance</div><div className="stat-card-value">{data.studentStats.avgAttendance}%</div></div>
            <div className="stat-card"><div className="stat-card-label">Avg Performance</div><div className="stat-card-value">{data.studentStats.avgPerformance}%</div></div>
            <div className="stat-card"><div className="stat-card-label">Your Sessions</div><div className="stat-card-value">{data.sessions.total}</div></div>
          </div>
          <div className="dash-grid">
            <div className="dash-section">
              <h3>Session breakdown</h3>
              <table className="dash-table">
                <tbody>
                  <tr><td>Classes</td><td>{data.sessions.classes}</td></tr>
                  <tr><td>Tests</td><td>{data.sessions.tests}</td></tr>
                  <tr><td>Assignments</td><td>{data.sessions.assignments}</td></tr>
                  <tr><td>Mentorship</td><td>{data.sessions.mentorship}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="dash-section">
              <h3>By batch</h3>
              {data.byBatch.length === 0 ? <p className="student-empty">No batch data yet.</p> : (
                <table className="dash-table">
                  <thead><tr><th>Batch</th><th>Students</th><th>Avg attendance</th></tr></thead>
                  <tbody>
                    {data.byBatch.map((b) => (
                      <tr key={b.name}><td>{b.name}</td><td>{b.value}</td><td>{b.avgAttendance}%</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </PageShell>
  );
};
