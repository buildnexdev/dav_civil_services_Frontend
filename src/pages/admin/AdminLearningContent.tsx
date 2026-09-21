import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import './AdminStudents.css';

type Material = {
  id?: number;
  title: string;
  subject: string;
  program: string;
  batch: string;
  description: string;
  filePath: string;
  externalUrl: string;
  status: string;
};

type ResultRow = {
  id?: number;
  studentId: number | '';
  studentCode?: string;
  studentName?: string;
  title: string;
  subject: string;
  examDate: string;
  marks: number | '';
  maxMarks: number | '';
  rankNo: number | '';
  remarks: string;
};

type StudentOption = { id: number; name: string; studentCode: string };

const emptyMaterial: Material = {
  title: '',
  subject: '',
  program: '',
  batch: '',
  description: '',
  filePath: '',
  externalUrl: '',
  status: 'Active'
};

const emptyResult: ResultRow = {
  studentId: '',
  title: '',
  subject: '',
  examDate: '',
  marks: '',
  maxMarks: 100,
  rankNo: '',
  remarks: ''
};

const AdminLearningContent = () => {
  const [tab, setTab] = useState<'materials' | 'results'>('materials');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [materialForm, setMaterialForm] = useState<Material>(emptyMaterial);
  const [resultForm, setResultForm] = useState<ResultRow>(emptyResult);
  const [editingMaterialId, setEditingMaterialId] = useState<number | null>(null);
  const [editingResultId, setEditingResultId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [mat, res, stu] = await Promise.all([
        api<{ materials: Material[] }>('/api/student-portal/admin/materials'),
        api<{ results: ResultRow[] }>('/api/student-portal/admin/results'),
        api<{ students: { id: number; name: string; studentCode: string }[] }>('/api/students')
      ]);
      setMaterials(mat.materials || []);
      setResults(res.results || []);
      setStudents((stu.students || []).map((s) => ({ id: s.id, name: s.name, studentCode: s.studentCode })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load learning content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveMaterial = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingMaterialId) {
        await api(`/api/student-portal/admin/materials/${editingMaterialId}`, {
          method: 'PUT',
          body: JSON.stringify(materialForm)
        });
        setNotice('Material updated.');
      } else {
        await api('/api/student-portal/admin/materials', {
          method: 'POST',
          body: JSON.stringify(materialForm)
        });
        setNotice('Material added.');
      }
      setMaterialForm(emptyMaterial);
      setEditingMaterialId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save material.');
    } finally {
      setSaving(false);
    }
  };

  const saveResult = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...resultForm,
        studentId: Number(resultForm.studentId),
        marks: resultForm.marks === '' ? null : Number(resultForm.marks),
        maxMarks: resultForm.maxMarks === '' ? 100 : Number(resultForm.maxMarks),
        rankNo: resultForm.rankNo === '' ? null : Number(resultForm.rankNo)
      };
      if (editingResultId) {
        await api(`/api/student-portal/admin/results/${editingResultId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        setNotice('Result updated.');
      } else {
        await api('/api/student-portal/admin/results', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        setNotice('Result added.');
      }
      setResultForm(emptyResult);
      setEditingResultId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save result.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="student-page-header">
        <div>
          <h2>Materials & Results</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage study materials and publish student test results.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" className={`btn ${tab === 'materials' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('materials')}>Materials</button>
          <button type="button" className={`btn ${tab === 'results' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('results')}>Results</button>
        </div>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}
      {loading ? <p className="student-empty">Loading...</p> : null}

      {!loading && tab === 'materials' && (
        <>
          <div className="dash-section">
            <h3>{editingMaterialId ? 'Edit material' : 'Add material'}</h3>
            <form onSubmit={saveMaterial} className="student-form-grid">
              <div className="form-group"><label>Title</label><input className="form-control" required value={materialForm.title} onChange={(e) => setMaterialForm((p) => ({ ...p, title: e.target.value }))} /></div>
              <div className="form-group"><label>Subject</label><input className="form-control" value={materialForm.subject} onChange={(e) => setMaterialForm((p) => ({ ...p, subject: e.target.value }))} /></div>
              <div className="form-group"><label>Program</label><input className="form-control" value={materialForm.program} onChange={(e) => setMaterialForm((p) => ({ ...p, program: e.target.value }))} /></div>
              <div className="form-group"><label>Batch</label><input className="form-control" value={materialForm.batch} onChange={(e) => setMaterialForm((p) => ({ ...p, batch: e.target.value }))} /></div>
              <div className="form-group student-span-2"><label>Description</label><textarea className="form-control" rows={2} value={materialForm.description} onChange={(e) => setMaterialForm((p) => ({ ...p, description: e.target.value }))} /></div>
              <div className="form-group"><label>File path /uploads/...</label><input className="form-control" value={materialForm.filePath} onChange={(e) => setMaterialForm((p) => ({ ...p, filePath: e.target.value }))} /></div>
              <div className="form-group"><label>External URL</label><input className="form-control" value={materialForm.externalUrl} onChange={(e) => setMaterialForm((p) => ({ ...p, externalUrl: e.target.value }))} /></div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-control" value={materialForm.status} onChange={(e) => setMaterialForm((p) => ({ ...p, status: e.target.value }))}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
                {editingMaterialId ? <button type="button" className="btn btn-outline" onClick={() => { setEditingMaterialId(null); setMaterialForm(emptyMaterial); }}>Cancel</button> : null}
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editingMaterialId ? 'Update' : 'Add Material'}</button>
              </div>
            </form>
          </div>
          <div className="dash-section">
            <table className="dash-table">
              <thead><tr><th>Title</th><th>Subject</th><th>Batch</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.id}>
                    <td>{m.title}</td>
                    <td>{m.subject || '—'}</td>
                    <td>{m.batch || 'All'}</td>
                    <td>{m.status}</td>
                    <td style={{ display: 'flex', gap: '0.4rem' }}>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => { setEditingMaterialId(m.id!); setMaterialForm({ ...emptyMaterial, ...m }); }}>Edit</button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                          if (!window.confirm('Delete this material?')) return;
                          await api(`/api/student-portal/admin/materials/${m.id}`, { method: 'DELETE' });
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
          </div>
        </>
      )}

      {!loading && tab === 'results' && (
        <>
          <div className="dash-section">
            <h3>{editingResultId ? 'Edit result' : 'Add result'}</h3>
            <form onSubmit={saveResult} className="student-form-grid">
              <div className="form-group">
                <label>Student</label>
                <select className="form-control" required value={resultForm.studentId} onChange={(e) => setResultForm((p) => ({ ...p, studentId: e.target.value ? Number(e.target.value) : '' }))} disabled={!!editingResultId}>
                  <option value="">Select student</option>
                  {students.map((s) => <option key={s.id} value={s.id}>{s.studentCode} — {s.name}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Exam title</label><input className="form-control" required value={resultForm.title} onChange={(e) => setResultForm((p) => ({ ...p, title: e.target.value }))} /></div>
              <div className="form-group"><label>Subject</label><input className="form-control" value={resultForm.subject} onChange={(e) => setResultForm((p) => ({ ...p, subject: e.target.value }))} /></div>
              <div className="form-group"><label>Exam date</label><input type="date" className="form-control" value={resultForm.examDate} onChange={(e) => setResultForm((p) => ({ ...p, examDate: e.target.value }))} /></div>
              <div className="form-group"><label>Marks</label><input type="number" className="form-control" value={resultForm.marks} onChange={(e) => setResultForm((p) => ({ ...p, marks: e.target.value === '' ? '' : Number(e.target.value) }))} /></div>
              <div className="form-group"><label>Max marks</label><input type="number" className="form-control" value={resultForm.maxMarks} onChange={(e) => setResultForm((p) => ({ ...p, maxMarks: e.target.value === '' ? '' : Number(e.target.value) }))} /></div>
              <div className="form-group"><label>Rank</label><input type="number" className="form-control" value={resultForm.rankNo} onChange={(e) => setResultForm((p) => ({ ...p, rankNo: e.target.value === '' ? '' : Number(e.target.value) }))} /></div>
              <div className="form-group"><label>Remarks</label><input className="form-control" value={resultForm.remarks} onChange={(e) => setResultForm((p) => ({ ...p, remarks: e.target.value }))} /></div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
                {editingResultId ? <button type="button" className="btn btn-outline" onClick={() => { setEditingResultId(null); setResultForm(emptyResult); }}>Cancel</button> : null}
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editingResultId ? 'Update' : 'Add Result'}</button>
              </div>
            </form>
          </div>
          <div className="dash-section">
            <table className="dash-table">
              <thead><tr><th>Student</th><th>Exam</th><th>Marks</th><th>Rank</th><th>Actions</th></tr></thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id}>
                    <td>{r.studentCode} — {r.studentName}</td>
                    <td>{r.title}</td>
                    <td>{r.marks === null || r.marks === undefined || r.marks === '' ? '—' : `${r.marks}/${r.maxMarks || 100}`}</td>
                    <td>{r.rankNo || '—'}</td>
                    <td style={{ display: 'flex', gap: '0.4rem' }}>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => {
                        setEditingResultId(r.id!);
                        setResultForm({
                          studentId: r.studentId,
                          title: r.title,
                          subject: r.subject || '',
                          examDate: r.examDate || '',
                          marks: r.marks === null || r.marks === undefined ? '' : Number(r.marks),
                          maxMarks: r.maxMarks === null || r.maxMarks === undefined ? 100 : Number(r.maxMarks),
                          rankNo: r.rankNo === null || r.rankNo === undefined ? '' : Number(r.rankNo),
                          remarks: r.remarks || ''
                        });
                      }}>Edit</button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                          if (!window.confirm('Delete this result?')) return;
                          await api(`/api/student-portal/admin/results/${r.id}`, { method: 'DELETE' });
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
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLearningContent;
