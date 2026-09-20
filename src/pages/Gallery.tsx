import { useState } from 'react';
import { demoGallery } from '../data/demoData';
import './Gallery.css';

const categories = ['All', 'Campus', 'Classrooms', 'Hostel', 'Events', 'Workshops', 'Felicitation', 'Student Activities'];

const Gallery = () => {
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState<string | null>(null);
  const filtered = cat === 'All' ? demoGallery : demoGallery.filter(g => g.category === cat);

  return (
    <div className="gallery-page">
      <section className="section-padding">
        <div className="container">
          <div className="filter-tabs">{categories.map(c => <button key={c} className={`tab-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
          <div className="gallery-grid">{filtered.map(g => (
            <div className="gallery-item" key={g.id} onClick={() => setModal(g.url)}>
              <img src={g.url} alt={g.caption} loading="lazy" />
              <div className="gallery-overlay"><span>{g.caption}</span></div>
            </div>
          ))}</div>
        </div>
      </section>
      {modal && <div className="gallery-modal" onClick={() => setModal(null)}><img src={modal} alt="Full view" /><button className="modal-close" onClick={() => setModal(null)}>✕</button></div>}
    </div>
  );
};

export default Gallery;
