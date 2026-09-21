import { useEffect, useMemo, useState } from 'react';
import { api, fileUrl } from '../lib/api';
import './Alumni.css';

type Alumni = {
  id: number;
  name: string;
  photo: string;
  year: number | '';
  air: number | '';
  service: string;
  cadre: string;
  optionalSubject: string;
  currentDesignation: string;
  currentPosting: string;
  testimonial: string;
  updatedAt?: string;
};

const Alumni = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  useEffect(() => {
    api<{ alumni: Alumni[] }>('/api/public/alumni')
      .then((data) => setAlumni(data.alumni || []))
      .catch(() => setAlumni([]));
  }, []);

  const years = [...new Set(alumni.map((a) => a.year).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
  const services = [...new Set(alumni.map((a) => a.service).filter(Boolean))];
  const filtered = useMemo(() => alumni
    .filter((a) => !search || a.name.toLowerCase().includes(search.toLowerCase()))
    .filter((a) => !yearFilter || String(a.year) === yearFilter)
    .filter((a) => !serviceFilter || a.service === serviceFilter), [alumni, search, yearFilter, serviceFilter]);

  return (
    <div className="alumni-page">
      <section className="section-padding">
        <div className="container">
          <h1 className="page-title-center">Our Alumni</h1>
          <p className="page-lead-center">
            Our Hall of Fame — celebrating the achievements of DAV Civil Services alumni.
          </p>

          <div className="filter-bar">
            <input className="form-control" placeholder="Search alumni by name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
            <select className="form-control filter-select" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}><option value="">All Years</option>{years.map((y) => <option key={String(y)} value={String(y)}>{y}</option>)}</select>
            <select className="form-control filter-select" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}><option value="">All Services</option>{services.map((s) => <option key={s} value={s}>{s}</option>)}</select>
          </div>
          {filtered.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>No alumni profiles are published yet.</p>
          ) : (
            <div className="alumni-grid">{filtered.map((a) => (
              <div className="card alumni-card" key={a.id}>
                {a.photo ? <img src={fileUrl(a.photo, a.updatedAt)} alt={a.name} className="alumni-photo" /> : <div className="alumni-photo" />}
                <h3>{a.name}</h3>
                <div className="alumni-rank">AIR {a.air || '—'}</div>
                <div className="alumni-meta"><span className="badge badge-primary">{a.service}</span><span className="badge badge-success">{a.year}</span></div>
                <div className="alumni-details"><div><strong>Cadre:</strong> {a.cadre || '—'}</div><div><strong>Optional:</strong> {a.optionalSubject || '—'}</div></div>
              </div>
            ))}</div>
          )}
        </div>
      </section>

      <section className="section-padding bg-soft">
        <div className="container">
          <h2 className="section-title">Alumni Testimonials</h2>
          <div className="testimonials-grid">{alumni.filter((a) => a.testimonial).slice(0, 4).map((a) => (
            <div className="card testimonial-card" key={a.id}>
              <div className="testimonial-quote">"{a.testimonial}"</div>
              <div className="testimonial-author">
                {a.photo ? <img src={fileUrl(a.photo, a.updatedAt)} alt={a.name} className="testimonial-photo" /> : null}
                <div><strong>{a.name}</strong><div className="text-muted">{a.service}, {a.year}</div></div>
              </div>
            </div>
          ))}</div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Where Are They Now?</h2>
          {alumni.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center' }}>No alumni records available yet.</p>
          ) : (
            <div className="card alumni-now-card">
              <div className="alumni-table-wrap">
                <table className="alumni-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Year</th>
                      <th>Service</th>
                      <th>Current Designation</th>
                      <th>Current Posting</th>
                      <th>Cadre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumni.map((a) => (
                      <tr key={a.id}>
                        <td data-label="Name"><strong>{a.name}</strong></td>
                        <td data-label="Year">{a.year || '—'}</td>
                        <td data-label="Service">{a.service || '—'}</td>
                        <td data-label="Current Designation">{a.currentDesignation || '—'}</td>
                        <td data-label="Current Posting">{a.currentPosting || '—'}</td>
                        <td data-label="Cadre">{a.cadre || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Alumni;
