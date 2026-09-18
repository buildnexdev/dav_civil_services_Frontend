import { useState } from 'react';
import { demoSuccessStories } from '../data/demoData';
import './SuccessStories.css';

const categories = ['All', 'UPSC CSE', 'CAPF', 'IFoS', 'TNPSC', 'SSC'];

const SuccessStories = () => {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? demoSuccessStories : demoSuccessStories.filter(s => s.category === cat);

  return (
    <div className="success-page">
      <section className="page-hero"><div className="container"><h1>Success Stories</h1><p className="lead">Celebrating the achievements of DAV Civil Services aspirants who have made their mark.</p></div></section>
      <section className="section-padding">
        <div className="container">
          <div className="filter-tabs">{categories.map(c => <button key={c} className={`tab-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
          <div className="success-grid">{filtered.map(s => (
            <div className="card success-card" key={s.id}>
              <img src={s.photo} alt={s.name} className="success-photo" />
              <div className="success-info">
                <h3>{s.name}</h3>
                <div className="success-meta"><span className="badge badge-primary">{s.exam}</span><span className="badge badge-success">Rank {s.rank}</span><span>{s.year}</span></div>
                <div className="success-service">{s.service}</div>
                <p>{s.story}</p>
              </div>
            </div>
          ))}</div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
