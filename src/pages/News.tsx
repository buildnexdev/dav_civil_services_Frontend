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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api<{ news: NewsItem[] }>('/api/public/news')
      .then((data) => {
        setItems(data.news || []);
        setError('');
      })
      .catch((err) => {
        setItems([]);
        setError(err instanceof Error ? err.message : 'Could not load news.');
      })
      .finally(() => setLoading(false));
  }, []);

  const cats = useMemo(() => {
    const fromData = [...new Set(items.map((n) => n.category).filter(Boolean))];
    return ['All', ...(fromData.length ? fromData : NEWS_CATEGORIES)];
  }, [items]);

  const filtered = cat === 'All' ? items : items.filter((n) => n.category === cat);

  return (
    <div className="news-page">
      <section className="section-padding">
        <div className="container">
          <h1 className="page-title-center">News</h1>
          <p className="page-lead-center">Latest updates published from the admin panel.</p>

          <div className="filter-tabs">
            {cats.map((c) => (
              <button key={c} type="button" className={`tab-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>Loading news...</p>
          ) : error ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem', color: 'var(--danger)' }}>{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>
              No news is published yet. Set news items to Active in Admin → News.
            </p>
          ) : (
            <div className="news-grid">
              {filtered.map((n) => (
                <div className="card news-card" key={n.id}>
                  <div className="news-meta">
                    <span className="badge badge-primary">{n.category || 'General'}</span>
                    <span className="news-date">{n.publishedDate || '—'}</span>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.description}</p>
                  {openId === n.id && n.content ? <p className="news-content">{n.content}</p> : null}
                  {(n.content || n.description) && (
                    <button type="button" className="read-more" onClick={() => setOpenId(openId === n.id ? null : n.id)}>
                      {openId === n.id ? 'Show less' : 'Read More →'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
