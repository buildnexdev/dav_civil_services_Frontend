import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="badge badge-primary mb-4 animate-fade-in">Admissions Open 2026-27</span>
            <h1 className="hero-title animate-fade-in">Empowering Aspirants. Building Civil Servants.</h1>
            <p className="hero-subtitle animate-fade-in">
              DAV Civil Services Residential Program provides focused residential coaching, mentorship, academic support and a disciplined learning environment for aspirants preparing for UPSC, SSC, TNPSC, IFoS and other competitive examinations.
            </p>
            <div className="hero-actions animate-fade-in">
              <Link to="/admissions/apply" className="btn btn-primary btn-lg">Apply for Admission</Link>
              <Link to="/about" className="btn btn-outline btn-lg">Explore Program</Link>
            </div>
            
            <div className="hero-stats-row animate-fade-in">
              <div className="hero-stat">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Aspirants Mentored</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">250+</div>
                <div className="stat-label">Selections</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Scholarship Beneficiaries</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Learning Environment</div>
              </div>
            </div>
          </div>
          <div className="hero-image-wrapper animate-fade-in">
            {/* Visual Placeholder */}
            <div className="hero-visual">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students studying" className="hero-img" />
              <div className="visual-accent-1"></div>
              <div className="visual-accent-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS */}
      <section className="programs-section section-padding">
        <div className="container">
          <h2 className="section-title">Programs Offered</h2>
          <div className="programs-grid">
            {['UPSC Civil Services', 'TNPSC Group I & II', 'SSC CGL', 'Indian Forest Service', 'CAPF', 'TNUSRB'].map((program, idx) => (
              <div className="card program-card" key={idx}>
                <div className="program-icon">📚</div>
                <h3>{program}</h3>
                <p>Comprehensive residential coaching with dedicated mentorship and test series.</p>
                <Link to="/academics" className="program-link">Learn More &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTOR MESSAGE */}
      <section className="director-section section-padding bg-soft">
        <div className="container director-container">
          <div className="director-image-wrapper">
            <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Director" className="director-img" />
          </div>
          <div className="director-content">
            <h2>Message from the Director</h2>
            <div className="quote-mark">"</div>
            <p className="director-quote">
              At DAV Civil Services Residential Program, our mission goes beyond mere academic instruction. We focus on discipline, continuous mentorship, and providing an equal opportunity platform for every aspirant. Our residential ecosystem is engineered to foster academic excellence, social responsibility, and a deep commitment to service to society. We invite you to join our disciplined learning environment and transform your potential into success.
            </p>
            <div className="director-name">Dr. A. Sharma</div>
            <div className="director-title">Director, DAV Civil Services</div>
            <button className="btn btn-primary mt-4">Read Full Message</button>
          </div>
        </div>
      </section>

      {/* VISION AND MISSION */}
      <section className="vision-mission-section section-padding">
        <div className="container">
          <div className="vm-grid">
            <div className="card vm-card vision-card">
              <div className="vm-icon">👁️</div>
              <h2>Vision</h2>
              <p>To nurture disciplined, socially responsible and academically strong aspirants capable of contributing meaningfully to public administration and society.</p>
            </div>
            <div className="card vm-card mission-card">
              <div className="vm-icon">🎯</div>
              <h2>Mission</h2>
              <ul className="mission-list">
                <li>✓ Provide quality mentorship and structured preparation</li>
                <li>✓ Maintain a focused residential learning environment</li>
                <li>✓ Ensure equal opportunity through scholarship support</li>
                <li>✓ Conduct continuous assessment and holistic development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DAV & FEATURES */}
      <section className="features-section section-padding bg-soft">
        <div className="container">
          <h2 className="section-title">Why Choose DAV?</h2>
          <div className="features-grid">
            {['Structured Residential Learning', 'Experienced Faculty', 'Personal Mentorship', 'Regular Mock Tests', '24/7 Library', 'Study Cabins', 'Scholarship Support', 'Interview Guidance'].map((feature, idx) => (
              <div className="feature-item card" key={idx}>
                <div className="feature-check">✓</div>
                <div className="feature-text">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPSC PERFORMANCE TRACKING */}
      <section className="performance-section section-padding">
        <div className="container">
          <h2 className="section-title">Program Performance</h2>
          <p className="text-center mb-4 text-muted">A track record of consistent results across competitive examinations.</p>
          
          <div className="card performance-card">
            <div className="table-responsive">
              <table className="table performance-table">
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
            <div className="performance-chart-placeholder mt-4">
              {/* In a real app, integrate Recharts or Chart.js here */}
              <div className="mock-chart">
                <p>Performance Growth Chart Visualization</p>
                <div className="bars">
                  <div className="bar" style={{height: '30%'}}></div>
                  <div className="bar" style={{height: '50%'}}></div>
                  <div className="bar" style={{height: '70%'}}></div>
                  <div className="bar" style={{height: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
