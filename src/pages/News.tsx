import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { NEWS_CATEGORIES } from '../data/contentFields';
import './News.css';

type NewsItem = {
  id: number;
  title: string;
  category: string;
  publishedDate: string;
  description: string;
  content: string;
};

const News = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [cat, setCat] = useState('All');
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    api<{ news: NewsItem[] }>('/api/public/news')
      .then((data) => setItems(data.news || []))
      .catch(() => setItems([]));
  }, []);

  const cats = useMemo(() => ['All', ...NEWS_CATEGORIES], []);
  const filtered = cat === 'All' ? items : items.filter((n) => n.category === cat);

  return (
    <div className="news-page">
      <section className="page-hero"><div className="container"><h1>News & Announcements</h1><p className="lead">Stay updated with the latest notifications, exam updates, and program events.</p></div></section>
      <section className="section-padding">
        <div className="container">
          <div className="filter-tabs">{cats.map((c) => <button key={c} className={`tab-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
          {filtered.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>No news is published yet.</p>
          ) : (
            <div className="news-grid">{filtered.map((n) => (
              <div className="card news-card" key={n.id}>
                <div className="news-meta"><span className="badge badge-primary">{n.category}</span><span className="news-date">{n.publishedDate}</span></div>
                <h3>{n.title}</h3>
                <p>{n.description}</p>
                {openId === n.id && n.content ? <p>{n.content}</p> : null}
                {(n.content || n.description) && (
                  <button type="button" className="read-more" onClick={() => setOpenId(openId === n.id ? null : n.id)}>
                    {openId === n.id ? 'Show less' : 'Read More →'}
                  </button>
                )}
              </div>
            ))}</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
