import { useEffect, useMemo, useState } from 'react';
import { api, fileUrl } from '../lib/api';
import './Faculty.css';

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
  status: string;
  updatedAt?: string;
};

const Faculty = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ mentors: Mentor[] }>('/api/public/mentors')
      .then((data) => setMentors(data.mentors || []))
      .catch(() => setMentors([]))
      .finally(() => setLoading(false));
  }, []);

  const subjects = useMemo(
    () => [...new Set(mentors.map((m) => m.subject).filter(Boolean))],
    [mentors]
  );
  const filtered = subjectFilter
    ? mentors.filter((m) => m.subject === subjectFilter)
    : mentors;

  return (
    <div className="faculty-page">
      <section className="section-padding">
        <div className="container">
          <h1 className="page-title-center">Our Mentors</h1>
          <p className="page-lead-center">
            Learn from experienced educators and subject matter experts dedicated to your success.
          </p>

          <div className="filter-bar">
            <select
              className="form-control filter-select"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>Loading mentors...</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>
              No mentors are published yet. Add Active mentors from the admin panel.
            </p>
          ) : (
            <div className="faculty-grid">
              {filtered.map((f) => (
                <div className="card faculty-card" key={f.id}>
                  {f.photo ? (
                    <img src={fileUrl(f.photo, f.updatedAt)} alt={f.name} className="faculty-photo" />
                  ) : (
                    <div className="faculty-photo faculty-photo-placeholder">👤</div>
                  )}
                  <h3>{f.name}</h3>
                  <div className="faculty-designation">{f.designation || 'Mentor'}</div>
                  <div className="faculty-subject">{f.subject || '—'}</div>
                  <div className="faculty-exp">{f.experience || 0} years experience</div>
                  {f.bio ? <p className="faculty-bio">{f.bio}</p> : null}
                  {f.expertise ? (
                    <div className="faculty-tags">
                      {f.expertise.split(',').map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                        <span className="badge badge-primary" key={tag}>{tag}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faculty;
