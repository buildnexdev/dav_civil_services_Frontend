import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import programsData from '../data/programsData';
import ProgramGrid from '../components/programs/ProgramGrid';
import './Programs.css';

const Programs = () => {
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
      {/* ─── Hero ─────────────────────────────── */}
      <section className="page-hero programs-hero">
        <div className="container">
          <span className="programs-hero-eyebrow">DAV Civil Services Residential Program</span>
          <h1>Programs Offered</h1>
          <p className="lead">
            Structured residential programmes designed to prepare aspirants for leading civil services,
            government and competitive examinations.
          </p>
          <div className="programs-hero-actions">
            <Link to="/admissions/apply" className="btn btn-accent btn-lg">
              Apply Now
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              Speak to a Counsellor
            </Link>
          </div>
        </div>
      </section>

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
      <section className="section-padding bg-soft programs-residential-cta">
        <div className="container">
          <div className="prc-content">
            <h2>Why Residential Learning?</h2>
            <p>
              Learning extends beyond the classroom. Our residential environment provides aspirants with a
              disciplined academic routine, guided study hours, peer learning, regular assessments and
              continuous mentorship — creating an ecosystem designed for examination success.
            </p>
            <div className="prc-features">
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
                <div className="prc-feature" key={f.label}>
                  <span className="prc-feature-icon">{f.icon}</span>
                  <span className="prc-feature-label">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────── */}
      <section className="section-padding programs-bottom-cta">
        <div className="container text-center">
          <h2>Ready to Begin Your Preparation?</h2>
          <p className="pbc-desc">
            Take the first step towards your civil services career. Apply now or speak to our admissions team for guidance.
          </p>
          <div className="pbc-actions">
            <Link to="/admissions/apply" className="btn btn-accent btn-lg">
              Apply Now
            </Link>
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
