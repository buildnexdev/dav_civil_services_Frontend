import { ZOHO_APPLY_URL } from '../constants/links';
import './ApplyOnline.css';

const ApplyOnline = () => {
  return (
    <div className="apply-page">
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-accent">Official Portal</span>
            <h1 className="section-title">Online Application 2027–28</h1>
            <p className="lead" style={{ maxWidth: 750, margin: '0 auto 1.5rem', color: 'var(--text-muted)' }}>
              Complete the official DAV Civil Services & Vedritam Residential Program admission form below.
            </p>
            <div className="apply-actions">
              <a
                href={ZOHO_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent btn-lg"
              >
                Open Form in Full Screen ↗
              </a>
            </div>
          </div>

          {/* Embedded Zoho Creator Application Form */}
          <div className="card form-container-card" style={{ padding: '0.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', minHeight: '800px' }}>
            <iframe
              src={ZOHO_APPLY_URL}
              title="DAV Civil Services Application Form"
              width="100%"
              height="900px"
              style={{ border: 'none', borderRadius: 'var(--radius-md)' }}
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyOnline;
