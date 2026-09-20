import { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { api, fileUrl } from '../../lib/api';
import StatusToggle from '../../components/StatusToggle';
import { GALLERY_FIELDS } from '../../data/contentFields';
import './AdminStudents.css';

export type GalleryImage = {
  id: number;
  galleryCode: string;
  fieldName: string;
  caption: string;
  image: string;
  status: 'Active' | 'Inactive';
  updatedAt?: string;
};

type ModalMode = 'add' | 'edit';

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [search, setSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [fieldName, setFieldName] = useState('Campus');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [files, setFiles] = useState<File[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [editItem, setEditItem] = useState<GalleryImage | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);

  const load = useCallback(async (query = '', field = '') => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('search', query.trim());
      if (field) params.set('field', field);
      const qs = params.toString();
      const data = await api<{ images: GalleryImage[] }>(`/api/gallery${qs ? `?${qs}` : ''}`);
      setImages(data.images);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setError('');
    setMode('add');
    setFieldName(fieldFilter || 'Campus');
    setStatus('Active');
    setFiles([]);
    setCaptions([]);
    setReplaceFile(null);
    setEditItem(null);
  };

  const openEdit = (item: GalleryImage) => {
    setError('');
    setMode('edit');
    setEditItem(item);
    setFieldName(item.fieldName);
    setStatus(item.status);
    setFiles([]);
    setReplaceFile(null);
  };

  const closeModal = () => {
    if (saving) return;
    setMode(null);
    setEditItem(null);
    setFiles([]);
    setReplaceFile(null);
  };

  const onPickFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []).slice(0, 10);
    setFiles(picked);
    setCaptions(picked.map((file) => file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (mode === 'add') {
        if (files.length < 1) throw new Error('Select 5 to 10 images (up to 10).');
        if (files.length > 10) throw new Error('You can upload a maximum of 10 images at once.');
        const body = new FormData();
        body.append('fieldName', fieldName);
        body.append('status', status);
        body.append('captions', captions.join('||'));
        files.forEach((file) => body.append('images', file));
        const data = await api<{ images: GalleryImage[] }>('/api/gallery', { method: 'POST', body });
        setImages((prev) => [...data.images, ...prev]);
        setNotice(`${data.images.length} image(s) uploaded for ${fieldName}.`);
      } else if (mode === 'edit' && editItem) {
        const body = new FormData();
        body.append('fieldName', fieldName);
        body.append('status', status);
        body.append('caption', editItem.caption);
        if (replaceFile) body.append('image', replaceFile);
        const data = await api<{ image: GalleryImage }>(`/api/gallery/${editItem.id}`, { method: 'PUT', body });
        setImages((prev) => prev.map((img) => (img.id === data.image.id ? data.image : img)));
        setNotice('Gallery image updated.');
      }
      setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save gallery images.');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (item: GalleryImage, next: GalleryImage['status']) => {
    try {
      const data = await api<{ image: GalleryImage }>(`/api/gallery/${item.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: next }),
      });
      setImages((prev) => prev.map((img) => (img.id === data.image.id ? data.image : img)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update status.');
    }
  };

  const handleDelete = async (item: GalleryImage) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api(`/api/gallery/${item.id}`, { method: 'DELETE' });
      setImages((prev) => prev.filter((img) => img.id !== item.id));
      setNotice('Image deleted.');
      if (editItem?.id === item.id) setMode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete image.');
    }
  };

  return (
    <div>
      <div className="student-page-header">
        <h2>Gallery Management</h2>
        <form className="student-toolbar" onSubmit={(e) => { e.preventDefault(); load(search, fieldFilter); }}>
          <select className="form-control" style={{ width: 180 }} value={fieldFilter} onChange={(e) => { setFieldFilter(e.target.value); load(search, e.target.value); }}>
            <option value="">All fields</option>
            {GALLERY_FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <input className="form-control" placeholder="Search caption..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-outline">Search</button>
          <button type="button" className="btn btn-primary" onClick={openAdd}>+ Upload Images</button>
        </form>
      </div>

      {notice && <div className="student-banner success">{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      {error && !mode && <div className="student-banner error">{error}</div>}

      <div className="dash-section">
        {loading ? (
          <p className="student-empty">Loading gallery...</p>
        ) : images.length === 0 ? (
          <p className="student-empty">No images yet. Upload 5 to 10 images and choose the website field they should appear in.</p>
        ) : (
          <div className="gallery-admin-grid">
            {images.map((img) => (
              <article className="gallery-admin-card" key={img.id}>
                <img src={fileUrl(img.image, img.updatedAt)} alt={img.caption || img.fieldName} />
                <div className="gallery-admin-meta">
                  <strong>{img.fieldName}</strong>
                  <p>{img.caption || 'No caption'}</p>
                  <StatusToggle value={img.status} onChange={(next) => toggleStatus(img, next)} />
                  <div className="student-actions">
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => openEdit(img)}>Edit</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(img)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {mode && (
        <div className="dash-modal-overlay" onClick={closeModal}>
          <div className="dash-modal dash-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>{mode === 'add' ? 'Upload Gallery Images' : 'Edit Gallery Image'}</h3>
              <button type="button" className="dash-modal-close" onClick={closeModal} aria-label="Close">×</button>
            </div>
            {error && <div className="student-banner error">{error}</div>}
            <form onSubmit={handleSave}>
              <div className="student-form-grid">
                <div className="form-group">
                  <label>Website field *</label>
                  <select className="form-control" value={fieldName} required onChange={(e) => setFieldName(e.target.value)}>
                    {GALLERY_FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <small className="gallery-field-hint">This is where the image will show on the website.</small>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <StatusToggle value={status} onChange={setStatus} />
                </div>
                {mode === 'add' ? (
                  <div className="form-group student-span-2">
                    <label>Images (5 to 10 at a time)</label>
                    <input type="file" className="form-control" accept=".jpg,.jpeg,.png,.webp" multiple onChange={onPickFiles} />
                    <small className="gallery-field-hint">{files.length} selected · maximum 10</small>
                    {files.length > 0 && (
                      <div className="gallery-upload-list">
                        {files.map((file, index) => (
                          <div className="gallery-upload-row" key={`${file.name}-${index}`}>
                            <span>{file.name}</span>
                            <input
                              className="form-control"
                              placeholder="Caption"
                              value={captions[index] || ''}
                              onChange={(e) => setCaptions((prev) => prev.map((c, i) => (i === index ? e.target.value : c)))}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="form-group student-span-2">
                      <label>Caption</label>
                      <input className="form-control" value={editItem?.caption || ''} onChange={(e) => setEditItem((prev) => prev ? { ...prev, caption: e.target.value } : prev)} />
                    </div>
                    <div className="form-group">
                      <label>Replace image</label>
                      <input type="file" className="form-control" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => setReplaceFile(e.target.files?.[0] || null)} />
                    </div>
                    {editItem?.image && <img src={replaceFile ? URL.createObjectURL(replaceFile) : fileUrl(editItem.image, editItem.updatedAt)} alt="" className="gallery-edit-preview" />}
                  </>
                )}
              </div>
              <div className="dash-modal-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal} disabled={saving}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : mode === 'add' ? 'Upload Images' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
