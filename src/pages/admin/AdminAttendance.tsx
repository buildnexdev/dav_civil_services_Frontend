import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import { BATCHES, type Student } from '../../types/student';
import './AdminStudents.css';

type AttendanceStatus = 'Present' | 'Absent' | 'Leave';

type RosterStudent = {
  studentId: number;
  studentCode: string;
  studentName: string;
  batch: string;
  attendanceId: number | null;
  status: AttendanceStatus | '';
  remarks: string;
};

const MARKS: { status: AttendanceStatus; symbol: string; title: string }[] = [
  { status: 'Present', symbol: '✓', title: 'Present' },
  { status: 'Absent', symbol: '✕', title: 'Absent' },
  { status: 'Leave', symbol: 'L', title: 'Leave' },
];

const today = () => new Date().toISOString().slice(0, 10);

const AdminAttendance = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [batch, setBatch] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(today());
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [roster, setRoster] = useState<RosterStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingIds, setSavingIds] = useState<number[]>([]);
  const [markingAll, setMarkingAll] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const batches = useMemo(() => {
    const extra = students.map((s) => s.batch).filter(Boolean);
    return Array.from(new Set([...BATCHES, ...extra]));
  }, [students]);

  const loadRoster = useCallback(async (nextBatch = batch, nextDate = attendanceDate) => {
    if (!nextBatch || !nextDate) {
      setRoster([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await api<{ students: RosterStudent[] }>(
        `/api/attendance/batch?batch=${encodeURIComponent(nextBatch)}&date=${encodeURIComponent(nextDate)}`
      );
      setRoster(data.students);
    } catch (err) {
      setRoster([]);
      setError(err instanceof Error ? err.message : 'Failed to load students.');
    } finally {
      setLoading(false);
    }
  }, [batch, attendanceDate]);

  useEffect(() => {
    let cancelled = false;
    const date = today();
    (async () => {
      try {
        const data = await api<{ students: Student[] }>('/api/students');
        if (cancelled) return;
        setStudents(data.students);
        const firstBatch = data.students.find((s) => s.batch)?.batch || BATCHES[0] || '';
        setBatch(firstBatch);
        if (!firstBatch) return;
        setLoading(true);
        const rosterData = await api<{ students: RosterStudent[] }>(
          `/api/attendance/batch?batch=${encodeURIComponent(firstBatch)}&date=${encodeURIComponent(date)}`
        );
        if (!cancelled) setRoster(rosterData.students);
      } catch {
        if (!cancelled) setError('Failed to load students.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roster;
    return roster.filter((row) =>
      row.studentName.toLowerCase().includes(q) || row.studentCode.toLowerCase().includes(q)
    );
  }, [roster, query]);

  const counts = {
    present: roster.filter((r) => r.status === 'Present').length,
    absent: roster.filter((r) => r.status === 'Absent').length,
    leave: roster.filter((r) => r.status === 'Leave').length,
    unmarked: roster.filter((r) => !r.status).length,
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(search);
  };

  const markStudent = async (row: RosterStudent, status: AttendanceStatus) => {
    if (savingIds.includes(row.studentId) || markingAll) return;
    const previous = row.status;
    const previousId = row.attendanceId;
    setSavingIds((ids) => [...ids, row.studentId]);
    setError('');
    setRoster((prev) => prev.map((item) => (
      item.studentId === row.studentId ? { ...item, status } : item
    )));
    try {
      const data = await api<{ record: { id: number; status: AttendanceStatus } }>('/api/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          studentId: row.studentId,
          attendanceDate,
          batch: row.batch || batch,
          status,
          remarks: row.remarks,
        }),
      });
      setRoster((prev) => prev.map((item) => (
        item.studentId === row.studentId
          ? { ...item, status: data.record.status, attendanceId: data.record.id }
          : item
      )));
      setNotice(`${row.studentName} marked ${status}.`);
    } catch (err) {
      setRoster((prev) => prev.map((item) => (
        item.studentId === row.studentId ? { ...item, status: previous, attendanceId: previousId } : item
      )));
      setError(err instanceof Error ? err.message : `Could not mark ${row.studentName}.`);
    } finally {
      setSavingIds((ids) => ids.filter((id) => id !== row.studentId));
    }
  };

  const markAll = async (status: AttendanceStatus) => {
    if (!roster.length || markingAll) return;
    setMarkingAll(true);
    setError('');
    try {
      await api('/api/attendance/batch', {
        method: 'POST',
        body: JSON.stringify({
          batch,
          attendanceDate,
          records: roster.map((row) => ({
            studentId: row.studentId,
            status,
            remarks: row.remarks,
          })),
        }),
      });
      await loadRoster();
      setNotice(`All ${roster.length} students marked ${status}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not mark the batch.');
    } finally {
      setMarkingAll(false);
    }
  };

  return (
    <div>
      <div className="attendance-page">
        <h2>Attendance Management</h2>
        <form className="attendance-toolbar" onSubmit={onSearch}>
          <label className="attendance-field">
            <span>Batch</span>
            <select
              className="form-control"
              value={batch}
              onChange={(e) => {
                setBatch(e.target.value);
                loadRoster(e.target.value, attendanceDate);
              }}
            >
              <option value="">Select batch</option>
              {batches.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>
          <label className="attendance-field">
            <span>Date</span>
            <input
              type="date"
              className="form-control"
              value={attendanceDate}
              onChange={(e) => {
                setAttendanceDate(e.target.value);
                loadRoster(batch, e.target.value);
              }}
            />
          </label>
          <label className="attendance-field attendance-search-field">
            <span>Search</span>
            <input
              className="form-control"
              placeholder="Student name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-outline btn-sm attendance-search-btn">Search</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}

      <div className="stat-cards attendance-stats">
        <div className="stat-card"><div className="stat-card-label">Students</div><div className="stat-card-value">{roster.length}</div></div>
        <div className="stat-card"><div className="stat-card-label">Present</div><div className="stat-card-value">{counts.present}</div></div>
        <div className="stat-card"><div className="stat-card-label">Absent</div><div className="stat-card-value">{counts.absent}</div></div>
        <div className="stat-card"><div className="stat-card-label">Leave</div><div className="stat-card-value">{counts.leave}</div></div>
        <div className="stat-card"><div className="stat-card-label">Unmarked</div><div className="stat-card-value">{counts.unmarked}</div></div>
      </div>

      <div className="dash-section">
        <div className="attendance-mark-all">
          <span>Click a symbol to mark attendance. Changes save immediately.</span>
          <button type="button" className="btn btn-outline btn-sm" disabled={!roster.length || markingAll} onClick={() => markAll('Present')}>All Present</button>
          <button type="button" className="btn btn-outline btn-sm" disabled={!roster.length || markingAll} onClick={() => markAll('Absent')}>All Absent</button>
          <button type="button" className="btn btn-outline btn-sm" disabled={!roster.length || markingAll} onClick={() => markAll('Leave')}>All Leave</button>
        </div>

        {loading ? (
          <p className="student-empty">Loading students...</p>
        ) : !batch || !attendanceDate ? (
          <p className="student-empty">Select a batch and date to mark attendance.</p>
        ) : visible.length === 0 ? (
          <p className="student-empty">
            {students.length === 0
              ? 'Add students first, then mark attendance.'
              : roster.length === 0
                ? `No students found in ${batch}.`
                : 'No students match that search.'}
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Batch</th>
                  <th>Mark attendance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => {
                  const busy = savingIds.includes(row.studentId) || markingAll;
                  return (
                    <tr key={row.studentId}>
                      <td>{row.studentCode}</td>
                      <td><strong>{row.studentName}</strong></td>
                      <td>{row.batch}</td>
                      <td>
                        <div className="attendance-marks">
                          {MARKS.map((mark) => (
                            <button
                              key={mark.status}
                              type="button"
                              className={`attendance-mark attendance-mark-${mark.status.toLowerCase()} ${row.status === mark.status ? 'active' : ''}`}
                              title={mark.title}
                              aria-label={`Mark ${row.studentName} ${mark.title}`}
                              aria-pressed={row.status === mark.status}
                              disabled={busy}
                              onClick={() => markStudent(row, mark.status)}
                            >
                              {mark.symbol}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td>
                        {row.status
                          ? <span className={`status-badge status-${row.status.toLowerCase()}`}>{busy ? 'Saving...' : row.status}</span>
                          : <span className="status-badge status-unmarked">{busy ? 'Saving...' : 'Unmarked'}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendance;
