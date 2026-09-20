import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import programsData from '../data/programsData';
import ProgramGrid from '../components/programs/ProgramGrid';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ZOHO_APPLY_URL } from '../constants/links';
import './Programs.css';

const Programs = () => {
  const [resRef, resVis] = useScrollReveal();
  const [ctaRef, ctaVis] = useScrollReveal();

  useEffect(() => {
    document.title = 'Programs Offered | DAV Civil Services Residential Program';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Explore structured residential programmes for UPSC, TNPSC, SSC, IFoS, CAPF, TNUSRB and Railway examinations at DAV Civil Services.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="programs-page">

      {/* ─── Program Grid ─────────────────────── */}
      <section className="section-padding programs-listing-section">
        <div className="container">
          <h2 className="section-title">Explore Our Programmes</h2>
          <p className="programs-subtitle">
            Choose from a comprehensive range of residential coaching programmes. Each programme features unique,
            examination-specific content, structured preparation and personalised mentorship.
          </p>
          <ProgramGrid programs={programsData} />
        </div>
      </section>

      {/* ─── Residential Highlight ────────────── */}
      <section className="section-padding bg-soft programs-residential-cta" ref={resRef}>
        <div className={`container sr ${resVis ? 'sr-visible' : ''}`}>
          <div className="prc-content">
            <h2>Why Residential Learning?</h2>
            <p>
              Learning extends beyond the classroom. Our residential environment provides aspirants with a
              disciplined academic routine, guided study hours, peer learning, regular assessments and
              continuous mentorship — creating an ecosystem designed for examination success.
            </p>
            <div className={`prc-features sr-stagger ${resVis ? 'sr-visible' : ''}`}>
              {[
                { icon: '🏠', label: 'Residential Accommodation' },
                { icon: '📚', label: 'Guided Study Hours' },
                { icon: '📖', label: 'Library & Reading Space' },
                { icon: '🤝', label: 'Mentorship' },
                { icon: '👥', label: 'Peer Learning' },
                { icon: '✅', label: 'Test & Evaluation' },
                { icon: '📅', label: 'Academic Discipline' },
                { icon: '💪', label: 'Student Support' },
              ].map((f) => (
                <div className="prc-feature sr-child" key={f.label}>
                  <span className="prc-feature-icon">{f.icon}</span>
                  <span className="prc-feature-label">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────── */}
      <section className="section-padding programs-bottom-cta" ref={ctaRef}>
        <div className={`container text-center sr-scale ${ctaVis ? 'sr-visible' : ''}`}>
          <h2>Ready to Begin Your Preparation?</h2>
          <p className="pbc-desc">
            Take the first step towards your civil services career. Apply now or speak to our admissions team for guidance.
          </p>
          <div className="pbc-actions">
            <a href={ZOHO_APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg">
              Apply Now
            </a>
            <Link to="/admissions" className="btn btn-outline btn-lg">
              Admission Process
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
