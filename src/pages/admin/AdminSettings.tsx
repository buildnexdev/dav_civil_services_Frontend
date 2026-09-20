import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import { MENTOR_PAGES, STUDENT_PAGES, type PortalPage } from '../../lib/accessPages';
import { useAccess } from '../../hooks/useAccess';
import './AdminStudents.css';
import './AdminSettings.css';

const togglePage = (pages: string[], key: string, checked: boolean, catalog: PortalPage[]) => {
  const required = catalog.find((page) => page.key === key)?.required;
  if (required) return pages.includes(key) ? pages : [key, ...pages];
  if (checked) return pages.includes(key) ? pages : [...pages, key];
  return pages.filter((page) => page !== key);
};

const PageField = ({
  label,
  hint,
  catalog,
  value,
  onChange
}: {
  label: string;
  hint: string;
  catalog: PortalPage[];
  value: string[];
  onChange: (next: string[]) => void;
}) => (
  <div className="access-panel">
    <h3>{label}</h3>
    <p className="access-hint">{hint}</p>
    <div className="access-field">
      {catalog.map((page) => (
        <label key={page.key} className={`access-option${page.required ? ' required' : ''}`}>
          <input
            type="checkbox"
            checked={value.includes(page.key)}
            disabled={page.required}
            onChange={(e) => onChange(togglePage(value, page.key, e.target.checked, catalog))}
          />
          <span className="access-option-icon">{page.icon}</span>
          <span className="access-option-name">{page.label}</span>
          {page.required && <span className="access-option-badge">Always on</span>}
        </label>
      ))}
    </div>
    <div className="access-field-actions">
      <button type="button" className="btn btn-outline btn-sm" onClick={() => onChange(catalog.map((page) => page.key))}>Select all</button>
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={() => onChange(catalog.filter((page) => page.required).map((page) => page.key))}
      >
        Dashboard only
      </button>
    </div>
  </div>
);

const AdminSettings = () => {
  const { studentPages, mentorPages, reload } = useAccess();
  const [student, setStudent] = useState<string[]>(studentPages);
  const [mentor, setMentor] = useState<string[]>(mentorPages);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setStudent(studentPages);
    setMentor(mentorPages);
  }, [studentPages, mentorPages]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const data = await api<{ studentPages: string[]; mentorPages: string[] }>('/api/settings', {
        method: 'PUT',
        body: JSON.stringify({ studentPages: student, mentorPages: mentor })
      });
      setStudent(data.studentPages);
      setMentor(data.mentorPages);
      await reload();
      setNotice('Page access has been saved. Students and mentors will see only the selected pages.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Settings</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Choose which portal pages students and mentors can open.
      </p>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && <div className="student-banner error">{error}</div>}

      <form onSubmit={handleSave}>
        <div className="settings-grid">
          <div className="dash-section">
            <PageField
              label="Student pages"
              hint="Checked pages appear in the student sidebar and can be opened after login."
              catalog={STUDENT_PAGES}
              value={student}
              onChange={setStudent}
            />
          </div>
          <div className="dash-section">
            <PageField
              label="Mentor pages"
              hint="Checked pages appear in the mentor sidebar and can be opened after login."
              catalog={MENTOR_PAGES}
              value={mentor}
              onChange={setMentor}
            />
          </div>
        </div>
        <div className="settings-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => { setStudent(studentPages); setMentor(mentorPages); }}
            disabled={saving}
          >
            Reset
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save access'}</button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
