import { Link } from 'react-router-dom';
import davLogo from '../assets/dav-group-logo.jpg';
import vedritamLogo from '../assets/vedritam-logo.jpg';
import programsData from '../data/programsData';
import ProgramCard from '../components/programs/ProgramCard';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-bg-glow" aria-hidden="true" />
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-brand-row animate-fade-in">
              <img src={davLogo} alt="D.A.V. Group Chennai" className="hero-brand-logo" />
              <img src={vedritamLogo} alt="Vedritam" className="hero-brand-logo vedritam" />
            </div>
            <p className="hero-eyebrow animate-fade-in">DAV Civil Services Residential Program • Vedritam</p>
            <h1 className="hero-title animate-fade-in">A residential academy for India’s civil services.</h1>
            <p className="hero-subtitle animate-fade-in">
              Structured coaching, mentorship and scholarship support for UPSC, SSC, TNPSC, IFoS and allied examinations — in a focused campus environment.
            </p>
            <div className="hero-actions animate-fade-in">
              <Link to="/admissions/apply" className="btn btn-accent btn-lg">Apply for admission</Link>
              <Link to="/academics" className="btn btn-ghost btn-lg">View programs</Link>
            </div>
            <p className="hero-note animate-fade-in">Admissions open for 2026–27 • Limited residential seats</p>
          </div>

          <div className="hero-panel animate-rise">
            <div className="hero-panel-logos">
              <img src={davLogo} alt="" className="hero-panel-logo" />
              <img src={vedritamLogo} alt="" className="hero-panel-logo vedritam" />
            </div>
            <p className="hero-sanskrit">तमसो मा ज्योतिर्गमय</p>
            <p className="hero-sanskrit-en">From darkness, lead me to light</p>
            <div className="hero-meta">
              <span>Established 1970</span>
              <span>Managed by ASSF</span>
              <span>Chennai</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Aspirants Mentored</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">250+</div>
            <div className="stat-label">Selections</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Scholarship Beneficiaries</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Learning Environment</div>
          </div>
        </div>
      </section>

      <section className="programs-section section-padding">
        <div className="container">
          <h2 className="section-title">Programs Offered</h2>
          <p className="programs-section-subtitle">
            Structured residential programmes designed to prepare aspirants for leading civil services,
            government and competitive examinations.
          </p>
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

      <section className="director-section section-padding bg-soft">
        <div className="container director-container">
          <div className="director-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Director"
              className="director-img"
            />
          </div>
          <div className="director-content">
            <h2>Message from the Director</h2>
            <div className="quote-mark">“</div>
            <p className="director-quote">
              At DAV Civil Services Residential Program, our mission goes beyond mere academic instruction. We focus on discipline, continuous mentorship, and providing an equal opportunity platform for every aspirant. Our residential ecosystem is engineered to foster academic excellence, social responsibility, and a deep commitment to service to society.
            </p>
            <div className="director-name">Dr. A. Sharma</div>
            <div className="director-title">Director, DAV Civil Services</div>
            <Link to="/about" className="btn btn-primary mt-4">Read Full Message</Link>
          </div>
        </div>
      </section>

      <section className="vision-mission-section section-padding">
        <div className="container">
          <div className="vm-grid">
            <div className="card vm-card vision-card">
              <div className="vm-icon">Vision</div>
              <h2>Our Vision</h2>
              <p>To nurture disciplined, socially responsible and academically strong aspirants capable of contributing meaningfully to public administration and society.</p>
            </div>
            <div className="card vm-card mission-card">
              <div className="vm-icon">Mission</div>
              <h2>Our Mission</h2>
              <ul className="mission-list">
                <li>Provide quality mentorship and structured preparation</li>
                <li>Maintain a focused residential learning environment</li>
                <li>Ensure equal opportunity through scholarship support</li>
                <li>Conduct continuous assessment and holistic development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section section-padding bg-soft">
        <div className="container">
          <h2 className="section-title">Why Choose DAV?</h2>
          <div className="features-grid">
            {['Structured Residential Learning', 'Experienced Faculty', 'Personal Mentorship', 'Regular Mock Tests', '24/7 Library', 'Study Cabins', 'Scholarship Support', 'Interview Guidance'].map((feature) => (
              <div className="feature-item card" key={feature}>
                <div className="feature-check">✓</div>
                <div className="feature-text">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="performance-section section-padding">
        <div className="container">
          <h2 className="section-title">Program Performance</h2>
          <p className="text-center mb-4 text-muted">A track record of consistent results across competitive examinations.</p>

          <div className="card performance-card">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Enrolled</th>
                    <th>Prelims Qualified</th>
                    <th>Mains Qualified</th>
                    <th>Interview Qualified</th>
                    <th>Final Selection</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>2025</strong> (Proj.)</td>
                    <td>180</td>
                    <td>108</td>
                    <td>48</td>
                    <td>20</td>
                    <td className="text-success fw-bold">13</td>
                  </tr>
                  <tr>
                    <td><strong>2024</strong></td>
                    <td>150</td>
                    <td>90</td>
                    <td>40</td>
                    <td>16</td>
                    <td className="text-success fw-bold">10</td>
                  </tr>
                  <tr>
                    <td><strong>2023</strong></td>
                    <td>120</td>
                    <td>72</td>
                    <td>31</td>
                    <td>12</td>
                    <td className="text-success fw-bold">8</td>
                  </tr>
                  <tr>
                    <td><strong>2022</strong></td>
                    <td>100</td>
                    <td>60</td>
                    <td>25</td>
                    <td>10</td>
                    <td className="text-success fw-bold">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mock-chart mt-4">
              <p>Performance Growth</p>
              <div className="bars">
                <div className="bar" style={{ height: '30%' }} />
                <div className="bar" style={{ height: '50%' }} />
                <div className="bar" style={{ height: '70%' }} />
                <div className="bar" style={{ height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
