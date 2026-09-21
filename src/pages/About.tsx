import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const location = useLocation();

  // Scroll reveal hook
  useScrollReveal();

  // Smooth scroll to hash anchor on mount or location hash change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="about-page">
      {/* 1. History of the Initiative */}
      <section id="history" className="section-padding reveal-on-scroll">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-accent">Our Foundations</span>
            <h2 className="section-title">History of the Initiative</h2>
            <p className="section-subtitle">
              Building on 50+ years of educational excellence under D.A.V. Group Chennai in strategic collaboration with Vedritam.
            </p>
          </div>

          <div className="about-grid">
            <div className="card about-card highlight-card">
              <div className="card-icon">📜</div>
              <h2>Genesis & Vision</h2>
              <p>
                DAV Civil Services Residential Program was instituted to bridge the crucial gap between academic talent and high-level administrative service preparation. Spearheaded by the D.A.V. Group Chennai, known for five decades of value-driven education, and Vedritam, the initiative provides a structured, 24/7 immersive residential environment where aspirants can focus exclusively on civil service success without urban distractions.
              </p>
            </div>

            <div className="card about-card">
              <div className="card-icon">🏛️</div>
              <h2>Legacy & Growth</h2>
              <p>
                Starting with an inaugural batch of 30 dedicated candidates, our ecosystem has expanded to mentor over 1,000 aspirants. Over 250+ candidates trained through our mentorship have achieved selection across IAS, IPS, IFS, IRS, and Group-I State Services, making DAV Civil Services a trusted name in competitive examination coaching.
              </p>
            </div>
          </div>

          <div className="history-timeline grid-3 mt-4">
            <div className="timeline-box">
              <span className="timeline-year">1970</span>
              <h4>D.A.V. Foundation</h4>
              <p>Establishment of D.A.V. Group in Chennai, pioneering holistic, ethical education.</p>
            </div>
            <div className="timeline-box">
              <span className="timeline-year">2018</span>
              <h4>Vedritam Launch</h4>
              <p>Conception of Vedritam residential civil services coaching framework.</p>
            </div>
            <div className="timeline-box">
              <span className="timeline-year">2024+</span>
              <h4>Integrated Academy</h4>
              <p>State-of-the-art campus, AI-driven test analytics & Super-30 scholarships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Objectives */}
      <section id="objectives" className="section-padding bg-soft reveal-on-scroll">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge">Guiding Principles</span>
            <h2 className="section-title">Core Objectives</h2>
            <p className="section-subtitle">
              Our institutional mission focuses on excellence, integrity, and equal opportunity.
            </p>
          </div>

          <div className="objectives-grid">
            <div className="card obj-card">
              <div className="obj-icon">🎯</div>
              <h3>1. Comprehensive Coaching</h3>
              <p>
                Provide end-to-end guidance across Prelims, Mains (General Studies, CSAT, Optional), and Personality Test with individual mentorship.
              </p>
            </div>
            <div className="card obj-card">
              <div className="obj-icon">🏡</div>
              <h3>2. Immersive Residential Environment</h3>
              <p>
                Cultivate a disciplined 24/7 study ecosystem equipped with individual cabins, continuous test series, and peer-to-peer discussion circles.
              </p>
            </div>
            <div className="card obj-card">
              <div className="obj-icon">🎓</div>
              <h3>3. Financial Inclusivity</h3>
              <p>
                Ensure deserving candidates from diverse socio-economic backgrounds receive up to 100% scholarship support through merit tests.
              </p>
            </div>
            <div className="card obj-card">
              <div className="obj-icon">⚖️</div>
              <h3>4. Ethical & Values-Based Leadership</h3>
              <p>
                Instill constitutional morality, empathy, administrative aptitude, and leadership skills essential for public administration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Residential Facilities */}
      <section id="residential-facilities" className="section-padding reveal-on-scroll">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-accent">Campus Life</span>
            <h2 className="section-title">Residential Facilities</h2>
            <p className="section-subtitle">
              Modern infrastructure designed to maintain physical health, mental focus, and academic rigor.
            </p>
          </div>

          <div className="facilities-grid">
            {[
              { icon: '📚', title: '24/7 Air-Conditioned Library', desc: 'Quiet study halls with over 10,000+ reference books, journals, and digital archives.' },
              { icon: '💻', title: 'Individual Study Cabins', desc: 'Personal ergonomic workstations designed for uninterrupted concentration and focus.' },
              { icon: '🏠', title: 'Modern Furnished Hostel', desc: 'Spacious, well-ventilated single and twin-sharing rooms with modern amenities.' },
              { icon: '🍱', title: 'Hygienic Dining & Mess', desc: 'Nutritious, balanced vegetarian meals prepared under strict hygiene standards.' },
              { icon: '🖥️', title: 'Digital Computer Lab', desc: 'High-speed fiber connectivity for online mock tests, research, and video lectures.' },
              { icon: '🧘', title: 'Yoga & Physical Fitness', desc: 'Daily sports facilities, morning yoga, and fitness routines for holistic well-being.' },
              { icon: '🛡️', title: '24/7 CCTV & Campus Security', desc: 'Round-the-clock security personnel, access control, and female warden supervision.' },
              { icon: '🏥', title: 'Medical Support & Care', desc: 'On-call doctor visits, first-aid infrastructure, and emergency transport services.' }
            ].map((f, i) => (
              <div className="card facility-card" key={i}>
                <div className="facility-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Academic Structure */}
      <section id="academic-structure" className="section-padding bg-soft reveal-on-scroll">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge">Structured Learning</span>
            <h2 className="section-title">Academic Structure & Methodology</h2>
            <p className="section-subtitle">
              A scientifically planned multi-phase syllabus completion and evaluation system.
            </p>
          </div>

          <div className="academic-structure-grid">
            <div className="card structure-card">
              <div className="phase-tag">Phase I</div>
              <h3>Foundation & NCERT Mastery</h3>
              <p>Build basic conceptual clarity across History, Polity, Geography, Economy, and Science through standard textbooks and daily practice sheets.</p>
              <ul className="structure-list">
                <li>✓ Daily 4 Hours Interactive Lectures</li>
                <li>✓ Weekly NCERT Quiz & Answer Sheets</li>
              </ul>
            </div>

            <div className="card structure-card">
              <div className="phase-tag">Phase II</div>
              <h3>Mains Advance & Optional</h3>
              <p>In-depth coverage of GS Papers I-IV, Essay writing technique, Ethics case studies, and chosen Optional subjects.</p>
              <ul className="structure-list">
                <li>✓ Daily Answer Writing (DAW) with Feedback</li>
                <li>✓ Weekly Full-Length Mains Tests</li>
              </ul>
            </div>

            <div className="card structure-card">
              <div className="phase-tag">Phase III</div>
              <h3>Prelims Intensive & Revision</h3>
              <p>High-yield topic revision, CSAT strategy, PYQ dissection, and 30+ simulated All-India prelims mock tests.</p>
              <ul className="structure-list">
                <li>✓ CSAT Special Speed Workshops</li>
                <li>✓ Personal Error Analysis Dashboards</li>
              </ul>
            </div>

            <div className="card structure-card">
              <div className="phase-tag">Phase IV</div>
              <h3>Personality Test & Interview Guidance</h3>
              <p>Mock interviews chaired by retired IAS/IPS officers, DAF assessment, and current affairs viva sessions.</p>
              <ul className="structure-list">
                <li>✓ Video-Recorded Mock Interviews</li>
                <li>✓ Personality & Soft Skills Coaching</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scholarship Support */}
      <section id="scholarship-support" className="section-padding reveal-on-scroll">
        <div className="container">
          <div className="scholarship-banner card">
            <div className="scholarship-content">
              <span className="badge badge-accent">Financial Aid</span>
              <h2 className="section-title">Scholarship Support Scheme</h2>
              <p className="lead">
                DAV Civil Services believes no deserving student should be denied quality coaching due to financial constraints.
              </p>

              <div className="scholarship-grid grid-3 mt-4">
                <div className="scholar-box">
                  <div className="scholar-badge">100% Waiver</div>
                  <h4>Vedritam Super-30</h4>
                  <p>Full tuition, hostel accommodation, and mess fee waiver for top 30 entrance rankers.</p>
                </div>

                <div className="scholar-box">
                  <div className="scholar-badge">50% Waiver</div>
                  <h4>DAV Merit-cum-Means</h4>
                  <p>Up to 50% tuition waiver for meritorious candidates with annual family income under ₹3 LPA.</p>
                </div>

                <div className="scholar-box">
                  <div className="scholar-badge">Special Grant</div>
                  <h4>EWS & Rural Talent Support</h4>
                  <p>Custom financial assistance grants for candidates from rural districts and defense background families.</p>
                </div>
              </div>

              <div className="text-center mt-4">
                <Link to="/scholarship" className="btn btn-primary">
                  Explore Scholarship Details & Apply →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
