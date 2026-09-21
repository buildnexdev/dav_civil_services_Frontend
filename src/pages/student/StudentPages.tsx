import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { API_BASE, api, fileUrl } from '../../lib/api';
import './StudentPortal.css';

export { default as StudentProfile } from './StudentProfile';
export { default as StudentPayments } from './StudentPayments';

type Academic = {
  id: number;
  academicCode: string;
  title: string;
  type: string;
  subject: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  mentorName?: string;
  description?: string;
  status: string;
  submission?: {
    id: number;
    content: string;
    filePath: string;
    status: string;
    score: number | null;
    feedback: string;
    submittedAt: string;
  } | null;
};

function PageShell({
  title,
  description,
  loading,
  error,
  children,
  actions
}: {
  title: string;
  description: string;
  loading?: boolean;
  error?: string;
  children: ReactNode;
  actions?: ReactNode;
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
      {error && <div className="student-banner error">{error}</div>}
      {loading ? <p className="student-empty">Loading...</p> : children}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="student-empty">{message}</p>;
}

export const StudentTimetable = () => {
  const [rows, setRows] = useState<Academic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ academics: Academic[] }>('/api/student-portal/timetable')
      .then((data) => setRows(data.academics || []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load timetable.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="Timetable" description="Your class, mentorship and schedule sessions." loading={loading} error={error}>
      <div className="dash-section">
        {rows.length === 0 ? (
          <EmptyState message="No timetable sessions found for your batch yet." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Subject</th>
                  <th>Mentor</th>
                  <th>Venue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.sessionDate || '—'}</td>
                    <td>{[row.startTime, row.endTime].filter(Boolean).join(' – ') || '—'}</td>
                    <td><strong>{row.title}</strong></td>
                    <td>{row.type}</td>
                    <td>{row.subject || '—'}</td>
                    <td>{row.mentorName || '—'}</td>
                    <td>{row.venue || '—'}</td>
                    <td><span className={`status-badge status-${row.status.toLowerCase()}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export const StudentAttendance = () => {
  const [summary, setSummary] = useState({ percentage: 0, total: 0, present: 0, absent: 0, leave: 0 });
  const [rows, setRows] = useState<{ id: number; attendanceDate: string; status: string; remarks: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ summary: typeof summary; attendance: typeof rows }>('/api/student-portal/attendance')
      .then((data) => {
        setSummary(data.summary);
        setRows(data.attendance || []);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load attendance.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="My Attendance" description="Daily attendance history and overall percentage." loading={loading} error={error}>
      <div className="stat-cards">
        <div className="stat-card"><div className="stat-card-label">Overall</div><div className="stat-card-value">{summary.percentage}%</div></div>
        <div className="stat-card"><div className="stat-card-label">Present</div><div className="stat-card-value">{summary.present}</div></div>
        <div className="stat-card"><div className="stat-card-label">Absent</div><div className="stat-card-value">{summary.absent}</div></div>
        <div className="stat-card"><div className="stat-card-label">Leave</div><div className="stat-card-value">{summary.leave}</div></div>
      </div>
      <div className="dash-section">
        {rows.length === 0 ? (
          <EmptyState message="No attendance records yet." />
        ) : (
          <table className="dash-table">
            <thead><tr><th>Date</th><th>Status</th><th>Remarks</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.attendanceDate}</td>
                  <td><span className={`status-badge status-${row.status.toLowerCase()}`}>{row.status}</span></td>
                  <td>{row.remarks || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageShell>
  );
};

export const StudentTests = () => {
  const [rows, setRows] = useState<Academic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ academics: Academic[] }>('/api/student-portal/tests')
      .then((data) => setRows(data.academics || []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load tests.'))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = rows.filter((r) => r.status === 'Upcoming' || r.status === 'Ongoing');
  const completed = rows.filter((r) => r.status === 'Completed');

  return (
    <PageShell title="Tests" description="Upcoming and completed tests for your batch." loading={loading} error={error}>
      <div className="dash-grid">
        <div className="dash-section">
          <h3>Upcoming / Ongoing</h3>
          {upcoming.length === 0 ? <EmptyState message="No upcoming tests." /> : (
            <table className="dash-table">
              <thead><tr><th>Title</th><th>Subject</th><th>Date</th><th>Time</th><th>Venue</th></tr></thead>
              <tbody>
                {upcoming.map((row) => (
                  <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.subject || '—'}</td>
                    <td>{row.sessionDate || '—'}</td>
                    <td>{row.startTime || '—'}</td>
                    <td>{row.venue || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="dash-section">
          <h3>Completed</h3>
          {completed.length === 0 ? <EmptyState message="No completed tests yet." /> : (
            <table className="dash-table">
              <thead><tr><th>Title</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {completed.map((row) => (
                  <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.subject || '—'}</td>
                    <td>{row.sessionDate || '—'}</td>
                    <td><span className={`status-badge status-${row.status.toLowerCase()}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export const StudentResults = () => {
  const [performance, setPerformance] = useState(0);
  const [rows, setRows] = useState<{
    id: number;
    title: string;
    subject: string;
    examDate: string;
    marks: number | null;
    maxMarks: number;
    percentage: number | null;
    rankNo: number | null;
    remarks: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ performance: number; results: typeof rows }>('/api/student-portal/results')
      .then((data) => {
        setPerformance(data.performance || 0);
        setRows(data.results || []);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load results.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="Results" description="Marks, percentage and rank for your tests." loading={loading} error={error}>
      <div className="stat-cards">
        <div className="stat-card"><div className="stat-card-label">Overall Performance</div><div className="stat-card-value">{performance}%</div></div>
        <div className="stat-card"><div className="stat-card-label">Results Published</div><div className="stat-card-value">{rows.length}</div></div>
      </div>
      <div className="dash-section">
        {rows.length === 0 ? (
          <EmptyState message="No results published yet. Ask admin to add your marks." />
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Marks</th>
                <th>%</th>
                <th>Rank</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.title}</strong></td>
                  <td>{row.subject || '—'}</td>
                  <td>{row.examDate || '—'}</td>
                  <td>{row.marks === null ? '—' : `${row.marks}/${row.maxMarks}`}</td>
                  <td>{row.percentage === null ? '—' : `${row.percentage}%`}</td>
                  <td>{row.rankNo ?? '—'}</td>
                  <td>{row.remarks || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageShell>
  );
};

export const StudentMaterials = () => {
  const [rows, setRows] = useState<{
    id: number;
    title: string;
    subject: string;
    description: string;
    filePath: string;
    externalUrl: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    api<{ materials: typeof rows }>('/api/student-portal/materials')
      .then((data) => setRows(data.materials || []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load materials.'))
      .finally(() => setLoading(false));
  }, []);

  const subjects = useMemo(
    () => [...new Set(rows.map((r) => r.subject).filter(Boolean))].sort(),
    [rows]
  );
  const filtered = rows.filter((r) => !subject || r.subject === subject);

  return (
    <PageShell
      title="Study Materials"
      description="Download notes and resources shared for your program."
      loading={loading}
      error={error}
      actions={
        subjects.length > 0 ? (
          <select className="form-control" style={{ maxWidth: 220 }} value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All subjects</option>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : null
      }
    >
      <div className="dash-section">
        {filtered.length === 0 ? (
          <EmptyState message="No study materials available yet." />
        ) : (
          <div className="student-card-grid">
            {filtered.map((row) => (
              <div className="student-info-card" key={row.id}>
                <div className="student-info-card-label">{row.subject || 'General'}</div>
                <h3>{row.title}</h3>
                <p>{row.description || 'No description provided.'}</p>
                <div className="student-info-card-actions">
                  {row.filePath ? (
                    <a className="btn btn-primary btn-sm" href={fileUrl(row.filePath)} target="_blank" rel="noreferrer">Open file</a>
                  ) : null}
                  {row.externalUrl ? (
                    <a className="btn btn-outline btn-sm" href={row.externalUrl} target="_blank" rel="noreferrer">External link</a>
                  ) : null}
                  {!row.filePath && !row.externalUrl ? <span className="text-muted">No file attached</span> : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
};

export const StudentCurrentAffairs = () => {
  const [rows, setRows] = useState<{
    id: number;
    title: string;
    category: string;
    publishedDate: string;
    description: string;
    content: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ items: typeof rows }>('/api/student-portal/current-affairs')
      .then((data) => setRows(data.items || []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load current affairs.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="Current Affairs" description="Latest updates relevant to civil services preparation." loading={loading} error={error}>
      <div className="dash-section">
        {rows.length === 0 ? (
          <EmptyState message="No current affairs posts yet. Admin can publish them from News." />
        ) : (
          <div className="student-card-grid">
            {rows.map((row) => (
              <div className="student-info-card" key={row.id}>
                <div className="student-info-card-label">{row.category || 'Update'} · {row.publishedDate || '—'}</div>
                <h3>{row.title}</h3>
                <p>{row.description || row.content || '—'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
};

export const StudentAssignments = () => {
  const [rows, setRows] = useState<Academic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api<{ assignments: Academic[] }>('/api/student-portal/assignments');
      setRows(data.assignments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assignments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openSubmit = (row: Academic) => {
    setActiveId(row.id);
    setContent(row.submission?.content || '');
    setFile(null);
    setNotice('');
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeId) return;
    setSaving(true);
    setError('');
    try {
      const body = new FormData();
      body.append('content', content);
      if (file) body.append('file', file);
      await api(`/api/student-portal/assignments/${activeId}/submit`, { method: 'POST', body });
      setNotice('Assignment submitted successfully.');
      setActiveId(null);
      setContent('');
      setFile(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit assignment.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell title="Assignments" description="View assigned work and submit your response." loading={loading} error={error}>
      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      <div className="dash-section">
        {rows.length === 0 ? (
          <EmptyState message="No assignments for your batch yet." />
        ) : (
          <div className="student-card-grid">
            {rows.map((row) => (
              <div className="student-info-card" key={row.id}>
                <div className="student-info-card-label">{row.subject || 'Assignment'} · {row.sessionDate || 'No due date'}</div>
                <h3>{row.title}</h3>
                <p>{row.description || 'No instructions provided.'}</p>
                {row.submission ? (
                  <div className="student-submit-meta">
                    <span className={`status-badge status-${row.submission.status.toLowerCase()}`}>{row.submission.status}</span>
                    {row.submission.score !== null ? <span>Score: {row.submission.score}</span> : null}
                    {row.submission.filePath ? (
                      <a href={`${API_BASE}${row.submission.filePath}`} target="_blank" rel="noreferrer">View file</a>
                    ) : null}
                    {row.submission.feedback ? <p><em>Feedback:</em> {row.submission.feedback}</p> : null}
                  </div>
                ) : (
                  <p className="text-muted">Not submitted yet</p>
                )}
                <button type="button" className="btn btn-primary btn-sm" onClick={() => openSubmit(row)}>
                  {row.submission ? 'Update submission' : 'Submit assignment'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeId !== null && (
        <div className="dash-modal-backdrop" onClick={() => !saving && setActiveId(null)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Submit assignment</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Written answer</label>
                <textarea className="form-control" rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type your answer here..." />
              </div>
              <div className="form-group">
                <label>Upload file (optional)</label>
                <input type="file" className="form-control" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </div>
              <div className="dash-modal-actions">
                <button type="button" className="btn btn-outline" disabled={saving} onClick={() => setActiveId(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Submitting...' : 'Submit'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export const StudentScholarship = () => {
  const [data, setData] = useState<{
    studentCode: string;
    name: string;
    program: string;
    batch: string;
    scholarship: string;
    status: string;
    annualIncome: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ scholarship: NonNullable<typeof data> }>('/api/student-portal/scholarship')
      .then((res) => setData(res.scholarship))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load scholarship.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="Scholarship" description="Your scholarship status as recorded by administration." loading={loading} error={error}>
      <div className="dash-section">
        {!data ? (
          <EmptyState message="Scholarship details unavailable." />
        ) : (
          <div className="student-detail-grid">
            <div><strong>Student ID</strong><span>{data.studentCode}</span></div>
            <div><strong>Name</strong><span>{data.name}</span></div>
            <div><strong>Program</strong><span>{data.program || '—'}</span></div>
            <div><strong>Batch</strong><span>{data.batch || '—'}</span></div>
            <div><strong>Scholarship</strong><span>{data.scholarship || 'None'}</span></div>
            <div><strong>Enrollment status</strong><span>{data.status}</span></div>
            <div><strong>Annual income</strong><span>{data.annualIncome || '—'}</span></div>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export const StudentAnnouncements = () => {
  const [rows, setRows] = useState<{
    id: number;
    title: string;
    message: string;
    type: string;
    publishedDate: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ notifications: typeof rows }>('/api/student-portal/announcements')
      .then((data) => setRows(data.notifications || []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load announcements.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="Announcements" description="Important notices from the administration." loading={loading} error={error}>
      <div className="dash-section">
        {rows.length === 0 ? (
          <EmptyState message="No announcements right now." />
        ) : (
          <div className="student-card-grid">
            {rows.map((row) => (
              <div className="student-info-card" key={row.id}>
                <div className="student-info-card-label">{row.type || 'General'} · {row.publishedDate || '—'}</div>
                <h3>{row.title}</h3>
                <p>{row.message || '—'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
};
