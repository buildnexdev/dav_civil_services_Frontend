import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../../lib/api';
import StatusToggle from '../../components/StatusToggle';
import { NOTIFICATION_CHANNELS, NOTIFICATION_TYPES } from '../../data/contentFields';
import './AdminStudents.css';

export type NotificationItem = {
  id: number;
  notificationCode: string;
  title: string;
  message: string;
  type: string;
  channel: string;
  publishedDate: string;
  status: 'Active' | 'Inactive';
};

const emptyItem: NotificationItem = {
  id: 0,
  notificationCode: '',
  title: '',
  message: '',
  type: 'General',
  channel: 'Email',
  publishedDate: new Date().toISOString().slice(0, 10),
  status: 'Active',
};

type ModalMode = 'add' | 'edit' | 'view';

const AdminNotifications = () => {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [form, setForm] = useState<NotificationItem>(emptyItem);

  const load = useCallback(async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await api<{ notifications: NotificationItem[] }>(`/api/notifications${query ? `?search=${encodeURIComponent(query)}` : ''}`);
      setItems(data.notifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openModal = (nextMode: ModalMode, item?: NotificationItem) => {
    setError('');
    setMode(nextMode);
    setForm(item ? { ...item } : { ...emptyItem, publishedDate: new Date().toISOString().slice(0, 10) });
  };

  const closeModal = () => {
    if (saving) return;
    setMode(null);
    setForm(emptyItem);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    setSaving(true);
    setError('');
    try {
      if (mode === 'add') {
        const data = await api<{ notification: NotificationItem }>('/api/notifications', { method: 'POST', body: JSON.stringify(form) });
        setItems((prev) => [data.notification, ...prev]);
        setNotice('Notification added.');
      } else if (mode === 'edit') {
        const data = await api<{ notification: NotificationItem }>(`/api/notifications/${form.id}`, { method: 'PUT', body: JSON.stringify(form) });
        setItems((prev) => prev.map((n) => (n.id === data.notification.id ? data.notification : n)));
        setNotice('Notification updated.');
      }
      setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save notification.');
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (item: NotificationItem, status: NotificationItem['status']) => {
    try {
      const data = await api<{ notification: NotificationItem }>(`/api/notifications/${item.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setItems((prev) => prev.map((n) => (n.id === data.notification.id ? data.notification : n)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update status.');
    }
  };

  const handleDelete = async (item: NotificationItem) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await api(`/api/notifications/${item.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((n) => n.id !== item.id));
      setNotice('Notification deleted.');
      if (mode && form.id === item.id) setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete notification.');
    }
  };

  const disabled = mode === 'view';

  return (
    <div>
      <div className="student-page-header">
        <h2>Notification Management</h2>
        <form className="student-toolbar" onSubmit={(e) => { e.preventDefault(); load(search.trim()); }}>
          <input className="form-control" placeholder="Search notifications..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-outline">Search</button>
          <button type="button" className="btn btn-primary" onClick={() => openModal('add')}>+ Add Notification</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !mode && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading notifications...</p>
        ) : items.length === 0 ? (
          <p className="student-empty">No notifications yet. Add one and set it Active to send it live.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Channel</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((n) => (
                  <tr key={n.id}>
                    <td>{n.notificationCode}</td>
                    <td><strong>{n.title}</strong></td>
                    <td>{n.type}</td>
                    <td>{n.channel}</td>
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
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>{mode === 'add' ? 'Add Notification' : mode === 'edit' ? 'Edit Notification' : 'Notification Details'}</h3>
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
                  <label>Type</label>
                  <select className="form-control" value={form.type} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
                    {NOTIFICATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Channel</label>
                  <select className="form-control" value={form.channel} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, channel: e.target.value }))}>
                    {NOTIFICATION_CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" value={form.publishedDate} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, publishedDate: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <StatusToggle value={form.status} disabled={disabled} onChange={(status) => setForm((p) => ({ ...p, status }))} />
                </div>
                <div className="form-group student-span-2">
                  <label>Message</label>
                  <textarea className="form-control" rows={4} value={form.message} disabled={disabled} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
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
                    <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : mode === 'add' ? 'Add Notification' : 'Save Changes'}</button>
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

export default AdminNotifications;
