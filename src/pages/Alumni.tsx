import { useState } from 'react';
import { demoAlumni } from '../data/demoData';
import './Alumni.css';

const Alumni = () => {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const years = [...new Set(demoAlumni.filter(a => a.published).map(a => a.year))].sort((a, b) => b - a);
  const services = [...new Set(demoAlumni.filter(a => a.published).map(a => a.service))];
  const filtered = demoAlumni.filter(a => a.published && a.status === 'Verified')
    .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()))
    .filter(a => !yearFilter || a.year === Number(yearFilter))
    .filter(a => !serviceFilter || a.service === serviceFilter);

  return (
    <div className="alumni-page">
      <section className="page-hero"><div className="container"><h1>Alumni Corner</h1><p className="lead">Our Hall of Fame — celebrating the achievements of DAV Civil Services alumni.</p></div></section>
      
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Hall of Fame</h2>
          <div className="filter-bar">
            <input className="form-control" placeholder="Search alumni by name..." value={search} onChange={e => setSearch(e.target.value)} style={{maxWidth: 300}} />
            <select className="form-control filter-select" value={yearFilter} onChange={e => setYearFilter(e.target.value)}><option value="">All Years</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
            <select className="form-control filter-select" value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}><option value="">All Services</option>{services.map(s => <option key={s} value={s}>{s}</option>)}</select>
          </div>
          <div className="alumni-grid">{filtered.map(a => (
            <div className="card alumni-card" key={a.id}>
              <img src={a.photo} alt={a.name} className="alumni-photo" />
              <h3>{a.name}</h3>
              <div className="alumni-rank">AIR {a.air || '—'}</div>
              <div className="alumni-meta"><span className="badge badge-primary">{a.service}</span><span className="badge badge-success">{a.year}</span></div>
              <div className="alumni-details"><div><strong>Cadre:</strong> {a.cadre}</div><div><strong>Optional:</strong> {a.optionalSubject}</div></div>
            </div>
          ))}</div>
        </div>
      </section>

      <section className="section-padding bg-soft">
        <div className="container">
          <h2 className="section-title">Alumni Testimonials</h2>
          <div className="testimonials-grid">{demoAlumni.filter(a => a.published).slice(0, 4).map(a => (
            <div className="card testimonial-card" key={a.id}>
              <div className="testimonial-quote">"{a.testimonial}"</div>
              <div className="testimonial-author"><img src={a.photo} alt={a.name} className="testimonial-photo" /><div><strong>{a.name}</strong><div className="text-muted">{a.service}, {a.year}</div></div></div>
            </div>
          ))}</div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Where Are They Now?</h2>
          <div className="card"><div className="table-responsive"><table className="table">
            <thead><tr><th>Name</th><th>Year</th><th>Service</th><th>Current Designation</th><th>Current Posting</th><th>Cadre</th></tr></thead>
            <tbody>{demoAlumni.filter(a => a.published).map(a => (
              <tr key={a.id}><td><strong>{a.name}</strong></td><td>{a.year}</td><td>{a.service}</td><td>{a.currentDesignation}</td><td>{a.currentPosting}</td><td>{a.cadre}</td></tr>
            ))}</tbody>
          </table></div></div>
        </div>
      </section>
    </div>
  );
};

export default Alumni;
