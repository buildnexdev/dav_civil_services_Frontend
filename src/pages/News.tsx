import { useState } from 'react';
import { demoNews } from '../data/demoData';
import './News.css';

const cats = ['All', 'Exam Updates', 'Program Events', 'Admission Updates', 'Government Schemes', 'Latest Notifications'];

const News = () => {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? demoNews : demoNews.filter(n => n.category === cat);

  return (
    <div className="news-page">
      <section className="page-hero"><div className="container"><h1>News & Announcements</h1><p className="lead">Stay updated with the latest notifications, exam updates, and program events.</p></div></section>
      <section className="section-padding">
        <div className="container">
          <div className="filter-tabs">{cats.map(c => <button key={c} className={`tab-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
          <div className="news-grid">{filtered.map(n => (
            <div className="card news-card" key={n.id}>
              <div className="news-meta"><span className="badge badge-primary">{n.category}</span><span className="news-date">{n.date}</span></div>
              <h3>{n.title}</h3>
              <p>{n.description}</p>
              <a href="#" className="read-more">Read More &rarr;</a>
            </div>
          ))}</div>
        </div>
      </section>
    </div>
  );
};

export default News;
