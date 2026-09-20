import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import StatusToggle from '../../components/StatusToggle';
import { NEWS_CATEGORIES } from '../../data/contentFields';
import './AdminStudents.css';

export type NewsItem = {
  id: number;
  newsCode: string;
  title: string;
  category: string;
  publishedDate: string;
  description: string;
  content: string;
  status: 'Active' | 'Inactive';
};

const emptyNews: NewsItem = {
  id: 0,
  newsCode: '',
  title: '',
  category: 'Exam Updates',
  publishedDate: new Date().toISOString().slice(0, 10),
  description: '',
  content: '',
  status: 'Active',
};

type ModalMode = 'add' | 'edit' | 'view';

const AdminNews = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [form, setForm] = useState<NewsItem>(emptyNews);

  const load = useCallback(async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await api<{ news: NewsItem[] }>(`/api/news${query ? `?search=${encodeURIComponent(query)}` : ''}`);
      setItems(data.news);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openModal = (nextMode: ModalMode, item?: NewsItem) => {
    setError('');
    setMode(nextMode);
    setForm(item ? { ...item } : { ...emptyNews, publishedDate: new Date().toISOString().slice(0, 10) });
  };

  const closeModal = () => {
    if (saving) return;
    setMode(null);
    setForm(emptyNews);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    setSaving(true);
    setError('');
    try {
      if (mode === 'add') {
        const data = await api<{ item: NewsItem }>('/api/news', { method: 'POST', body: JSON.stringify(form) });
        setItems((prev) => [data.item, ...prev]);
        setNotice('News item added.');
      } else if (mode === 'edit') {
        const data = await api<{ item: NewsItem }>(`/api/news/${form.id}`, { method: 'PUT', body: JSON.stringify(form) });
        setItems((prev) => prev.map((n) => (n.id === data.item.id ? data.item : n)));
        setNotice('News item updated.');
      }
      setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save news.');
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (item: NewsItem, status: NewsItem['status']) => {
    try {
      const data = await api<{ item: NewsItem }>(`/api/news/${item.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setItems((prev) => prev.map((n) => (n.id === data.item.id ? data.item : n)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update status.');
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await api(`/api/news/${item.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((n) => n.id !== item.id));
      setNotice('News item deleted.');
      if (mode && form.id === item.id) setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete news.');
    }
  };

  const disabled = mode === 'view';

  return (
    <div>
      <div className="student-page-header">
        <h2>News Management</h2>
        <form className="student-toolbar" onSubmit={(e) => { e.preventDefault(); load(search.trim()); }}>
          <input className="form-control" placeholder="Search news..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-outline">Search</button>
          <button type="button" className="btn btn-primary" onClick={() => openModal('add')}>+ Add News</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !mode && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading news...</p>
        ) : items.length === 0 ? (
          <p className="student-empty">No news yet. Add an article and set it Active to show it on the website.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((n) => (
                  <tr key={n.id}>
                    <td>{n.newsCode}</td>
                    <td><strong>{n.title}</strong></td>
                    <td>{n.category}</td>
                    <td>{n.publishedDate || '—'}</td>
                    <td><StatusToggle value={n.status} onChange={(status) => setStatus(n, status)} /></td>
                    <td className="student-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('view', n)}>View</button>
                      <button className="btn btn-outline btn-sm" onClick={() => openModal('edit', n)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(n)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {mode && (
        <div className="dash-modal-overlay" onClick={closeModal}>
          <div className="dash-modal dash-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>{mode === 'add' ? 'Add News' : mode === 'edit' ? 'Edit News' : 'News Details'}</h3>
              <button type="button" className="dash-modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>
            {error && <div className="student-banner error">{error}</div>}
            <form onSubmit={handleSave}>
              <div className="student-form-grid">
                <div className="form-group student-span-2">
                  <label>Title *</label>
                  <input className="form-control" value={form.title} required disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={form.category} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
                    {NEWS_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" value={form.publishedDate} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, publishedDate: e.target.value }))} />
                </div>
                <div className="form-group student-span-2">
                  <label>Short description</label>
                  <textarea className="form-control" rows={2} value={form.description} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
                </div>
                <div className="form-group student-span-2">
                  <label>Full content</label>
                  <textarea className="form-control" rows={5} value={form.content} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <StatusToggle value={form.status} disabled={disabled} onChange={(status) => setForm((p) => ({ ...p, status }))} />
                </div>
              </div>
              <div className="dash-modal-actions">
                {mode === 'view' ? (
                  <>
                    <button type="button" className="btn btn-outline" onClick={closeModal}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => setMode('edit')}>Edit</button>
                  </>
                ) : (
                  <>
                    {mode === 'edit' && <button type="button" className="btn btn-danger" onClick={() => handleDelete(form)}>Delete</button>}
                    <button type="button" className="btn btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : mode === 'add' ? 'Add News' : 'Save Changes'}</button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
