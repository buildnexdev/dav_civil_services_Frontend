import { useState } from 'react';
import { demoFaculty } from '../data/demoData';
import './Faculty.css';

const Faculty = () => {
  const [subjectFilter, setSubjectFilter] = useState('');
  const subjects = [...new Set(demoFaculty.map(f => f.subject))];
  const filtered = subjectFilter ? demoFaculty.filter(f => f.subject === subjectFilter) : demoFaculty;

  return (
    <div className="faculty-page">
      <section className="page-hero"><div className="container"><h1>Our Faculty</h1><p className="lead">Learn from experienced educators and subject matter experts dedicated to your success.</p></div></section>
      <section className="section-padding">
        <div className="container">
          <div className="filter-bar">
            <select className="form-control filter-select" value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
              <option value="">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="faculty-grid">{filtered.map(f => (
            <div className="card faculty-card" key={f.id}>
              <img src={f.photo} alt={f.name} className="faculty-photo" />
              <h3>{f.name}</h3>
              <div className="faculty-designation">{f.designation}</div>
              <div className="faculty-subject">{f.subject}</div>
              <div className="faculty-exp">{f.experience} years experience</div>
              <p className="faculty-bio">{f.bio}</p>
              <div className="faculty-tags">{f.expertise.map((e, i) => <span className="badge badge-primary" key={i}>{e}</span>)}</div>
            </div>
          ))}</div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;
