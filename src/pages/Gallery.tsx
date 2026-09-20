import { useEffect, useMemo, useState } from 'react';
import { api, fileUrl } from '../lib/api';
import { GALLERY_FIELDS } from '../data/contentFields';
import './Gallery.css';

type GalleryImage = {
  id: number;
  fieldName: string;
  caption: string;
  image: string;
  updatedAt?: string;
};

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState<string | null>(null);

  useEffect(() => {
    api<{ images: GalleryImage[] }>('/api/public/gallery')
      .then((data) => setImages(data.images || []))
      .catch(() => setImages([]));
  }, []);

  const categories = useMemo(() => {
    const used = new Set(images.map((img) => img.fieldName));
    return ['All', ...GALLERY_FIELDS.filter((field) => used.has(field))];
  }, [images]);

  const filtered = cat === 'All' ? images : images.filter((g) => g.fieldName === cat);

  return (
    <div className="gallery-page">
      <section className="page-hero"><div className="container"><h1>Gallery</h1><p className="lead">A visual journey through life at DAV Civil Services Residential Program.</p></div></section>
      <section className="section-padding">
        <div className="container">
          <div className="filter-tabs">{categories.map((c) => <button key={c} className={`tab-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
          {filtered.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '2rem' }}>No gallery images are published yet.</p>
          ) : (
            <div className="gallery-grid">{filtered.map((g) => (
              <div className="gallery-item" key={g.id} onClick={() => setModal(fileUrl(g.image, g.updatedAt))}>
                <img src={fileUrl(g.image, g.updatedAt)} alt={g.caption} loading="lazy" />
                <div className="gallery-overlay"><span>{g.caption || g.fieldName}</span></div>
              </div>
            ))}</div>
          )}
        </div>
      </section>
      {modal && <div className="gallery-modal" onClick={() => setModal(null)}><img src={modal} alt="Full view" /><button className="modal-close" onClick={() => setModal(null)}>✕</button></div>}
    </div>
  );
};

export default Gallery;
