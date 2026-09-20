import { Link } from 'react-router-dom';
import davLogo from '../assets/dav-group-logo.jpg';
import vedritamLogo from '../assets/vedritam-logo.jpg';
import programsData from '../data/programsData';
import ProgramCard from '../components/programs/ProgramCard';
import TreeIllustration from '../components/common/TreeIllustration';
import MandalaPattern from '../components/common/MandalaPattern';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ZOHO_APPLY_URL } from '../constants/links';
import './Home.css';

const Home = () => {
  const [statsRef, statsVis] = useScrollReveal();
  const [historyRef, historyVis] = useScrollReveal();
  const [progsRef, progsVis] = useScrollReveal();
  const [directorRef, directorVis] = useScrollReveal();
  const [vmRef, vmVis] = useScrollReveal();
  const [featRef, featVis] = useScrollReveal();

  return (
    <div className="home-page">
      {/* ─── 1. Hero Section ────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg-glow" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          <span className="hero-particle p1" />
          <span className="hero-particle p2" />
          <span className="hero-particle p3" />
          <span className="hero-particle p4" />
          <span className="hero-particle p5" />
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <p className="hero-eyebrow hero-anim" style={{ animationDelay: '0.15s' }}>
              DAV CIVIL SERVICES RESIDENTIAL PROGRAM • VEDRITAM
            </p>

            <h1 className="hero-title hero-anim" style={{ animationDelay: '0.3s' }}>
              Shape Your Future in <span className="hero-title-highlight">Public Service</span>
            </h1>

            <p className="hero-subtitle hero-anim" style={{ animationDelay: '0.5s' }}>
              A residential academy providing structured coaching, dedicated mentorship and scholarship support
              for UPSC, SSC, TNPSC, IFoS and allied examinations — in a focused campus environment.
            </p>

            <div className="hero-actions hero-anim" style={{ animationDelay: '0.65s' }}>
              <a href={ZOHO_APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg hero-btn-primary">
                <span>Apply for Admission</span>
                <span className="hero-btn-arrow">→</span>
              </a>
              <Link to="/programs" className="btn btn-ghost btn-lg">
                Explore Programs
              </Link>
            </div>

            <div className="hero-badges hero-anim" style={{ animationDelay: '0.8s' }}>
              <span className="hero-badge">📚 10+ Programmes</span>
              <span className="hero-badge">🏠 Fully Residential</span>
              <span className="hero-badge">🎓 Expert Faculty</span>
            </div>

            <p className="hero-note hero-anim" style={{ animationDelay: '0.9s' }}>
              Admissions open for 2027–28 • Limited residential seats
            </p>
          </div>

          <div className="hero-panel hero-anim" style={{ animationDelay: '0.4s' }}>
            <div className="hero-panel-glow" aria-hidden="true" />
            <div className="hero-panel-logos">
              <img src={davLogo} alt="DAV Logo" className="hero-panel-logo" style={{ height: '56px', maxHeight: '56px', width: 'auto', objectFit: 'contain' }} />
              <img src={vedritamLogo} alt="Vedritam Logo" className="hero-panel-logo vedritam" style={{ height: '52px', maxHeight: '52px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="hero-sanskrit">तमसो मा ज्योतिर्गमय</p>
            <p className="hero-sanskrit-en">From darkness, lead me to light</p>

            <div className="hero-panel-stats">
              <div className="hero-panel-stat">
                <span className="hps-number">1000+</span>
                <span className="hps-label">Aspirants Mentored</span>
              </div>
              <div className="hero-panel-stat">
                <span className="hps-number">250+</span>
                <span className="hps-label">Selections</span>
              </div>
            </div>
            <div className="hero-meta">
              <span>Established 1970</span>
              <span>Managed by ASSF</span>
              <span>Chennai</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Stats Strip ─────────────────────── */}
      <section className="stats-strip" ref={statsRef}>
        <div className={`container stats-grid sr-stagger ${statsVis ? 'sr-visible' : ''}`}>
          {[
            { num: '1000+', label: 'Aspirants Mentored' },
            { num: '250+', label: 'Successful Selections' },
            { num: '500+', label: 'Scholarship Beneficiaries' },
            { num: '24/7', label: 'Residential Learning' },
          ].map((s) => (
            <div className="stat-item sr-child" key={s.label}>
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. History & Heritage Section ────────── */}
      <section className="history-ethos-section section-padding" ref={historyRef}>
        <div className="history-badge-row text-center mb-3">
          <span className="section-badge-tag">HISTORY</span>
        </div>
        <div className={`container history-grid ${historyVis ? 'sr-visible' : ''}`}>
          <div className="history-text-col">
            <h2 className="history-main-title">Vedritam Group</h2>
            <p className="history-tagline">In service of Arya Samaj and the D.A.V. Educational tradition</p>

            <p className="history-paragraph">
              Born from the vision of the Arya Samaj, the Dayanand Anglo Vedic (DAV) movement began in 1886 in Lahore to actively advocate education for all, irrespective of gender or caste.
            </p>
            <p className="history-paragraph">
              With a transformative educational model that promoted a judicious mix of Vedic learning (Para Vidya) and contemporary subjects (Apara Vidya), DAV emerged as one of the earliest organized schooling systems. At its core was the belief that education must nurture not only intellectual capability but also character and social responsibility.
            </p>

            {/* D.A.V. Acronym Card */}
            <div className="dav-acronym-card">
              <div className="dav-acronym-box">
                <div className="acronym-letter-group">
                  <span className="acronym-letter">D</span>
                  <span className="acronym-letter">A</span>
                  <span className="acronym-letter">V</span>
                </div>
                <div className="acronym-details">
                  <p><strong>Dayanand</strong> (Maharishi Dayanand Saraswati)</p>
                  <p><strong>Anglo</strong> (signifying contemporary education)</p>
                  <p><strong>Vedic</strong> (Shaastras based education with blend of spirituality)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="history-tree-col">
            <TreeIllustration className="history-tree-svg" />
          </div>
        </div>
      </section>

      {/* ─── 4. Programs Grid with Mandala Backdrop ─ */}
      <section className="programs-section section-padding bg-soft position-relative" ref={progsRef}>
        <MandalaPattern className="section-mandala-watermark" />
        <div className={`container sr ${progsVis ? 'sr-visible' : ''}`}>
          <div className="text-center mb-4">
            <span className="badge badge-accent">Residential Coaching</span>
            <h2 className="section-title">Programs Offered</h2>
            <p className="programs-section-subtitle">
              Structured residential programmes designed to prepare aspirants for leading civil services,
              government and competitive examinations.
            </p>
          </div>
          <div className="programs-grid">
            {programsData.slice(0, 6).map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} />
            ))}
          </div>
          <div className="programs-view-all">
            <Link to="/programs" className="btn btn-outline btn-lg">
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. Director's Message ───────────────── */}
      <section className="director-section section-padding bg-soft" ref={directorRef}>
        <div className={`container director-container ${directorVis ? 'dir-visible' : ''}`}>
          <div className="director-image-wrapper sr-left">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Director"
              className="director-img"
            />
          </div>
          <div className="director-content sr-right">
            <span className="badge badge-accent">Leadership</span>
            <h2>Message from the Director</h2>
            <div className="quote-mark">"</div>
            <p className="director-quote">
              At DAV Civil Services Residential Program, our mission goes beyond mere academic instruction. We focus on discipline, continuous mentorship, and providing an equal opportunity platform for every aspirant. Our residential ecosystem is engineered to foster academic excellence, social responsibility, and a deep commitment to public service.
            </p>
            <div className="director-name">Dr. A. Sharma</div>
            <div className="director-title">Director, DAV Civil Services</div>
            <Link to="/about" className="btn btn-primary mt-4">Read Full Vision & Ethos →</Link>
          </div>
        </div>
      </section>

      {/* ─── 7. Vision & Mission ───────────────────── */}
      <section className="vision-mission-section section-padding" ref={vmRef}>
        <div className={`container sr-stagger ${vmVis ? 'sr-visible' : ''}`}>
          <div className="vm-grid">
            <div className="card vm-card vision-card sr-child">
              <div className="vm-icon">🎯</div>
              <h2>Our Vision</h2>
              <p>To nurture disciplined, socially responsible and academically strong aspirants capable of contributing meaningfully to public administration and society.</p>
            </div>
            <div className="card vm-card mission-card sr-child">
              <div className="vm-icon">🌟</div>
              <h2>Our Mission</h2>
              <ul className="mission-list">
                <li>Provide quality mentorship and structured preparation</li>
                <li>Maintain a focused 24/7 residential learning environment</li>
                <li>Ensure equal opportunity through scholarship support</li>
                <li>Conduct continuous assessment and holistic personality development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. Why Choose DAV ─────────────────────── */}
      <section className="features-section section-padding bg-soft" ref={featRef}>
        <div className={`container sr-stagger ${featVis ? 'sr-visible' : ''}`}>
          <h2 className="section-title sr-child">Why Choose DAV Civil Services?</h2>
          <div className="features-grid">
            {[
              'Structured Residential Learning',
              'Experienced Civil Service Faculty',
              '1-on-1 Personal Mentorship',
              'Daily Answer Writing Evaluation',
              '24/7 Air-Conditioned Library',
              'Individual Workstation Cabins',
              'Super-30 Scholarship Support',
              'Mock Interview by Retired Officers'
            ].map((feature) => (
              <div className="feature-item card sr-child" key={feature}>
                <div className="feature-check">✓</div>
                <div className="feature-text">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
