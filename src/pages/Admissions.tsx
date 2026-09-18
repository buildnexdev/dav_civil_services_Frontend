import { Link } from 'react-router-dom';
import './Admissions.css';

const Admissions = () => (
  <div className="admissions-page">
    <section className="page-hero">
      <div className="container"><h1>Admissions</h1><p className="lead">Join DAV Civil Services Residential Program and transform your preparation journey.</p></div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="admissions-grid">
          <div className="admissions-info">
            <div className="card info-card">
              <h2>Eligibility</h2>
              <ul><li>Graduate in any discipline from a recognized university</li><li>Age: 21-32 years (relaxation as per government norms)</li><li>Committed to full-time residential preparation</li><li>Cleared entrance examination conducted by DAV</li></ul>
            </div>
            <div className="card info-card">
              <h2>Admission Process</h2>
              <ol><li>Submit online application with required documents</li><li>Appear for DAV Entrance Examination</li><li>Personal Interview for shortlisted candidates</li><li>Final selection based on merit & interview</li><li>Admission confirmation & fee payment</li></ol>
            </div>
            <div className="card info-card">
              <h2>Important Dates (Demo)</h2>
              <ul><li><strong>Application Start:</strong> January 15, 2026</li><li><strong>Application Deadline:</strong> March 31, 2026</li><li><strong>Entrance Exam:</strong> April 20, 2026</li><li><strong>Interview:</strong> May 5-10, 2026</li><li><strong>Results:</strong> May 20, 2026</li><li><strong>Program Start:</strong> June 15, 2026</li></ul>
            </div>
            <div className="card info-card">
              <h2>Fee Structure (Demo)</h2>
              <ul><li><strong>Application Fee:</strong> ₹500</li><li><strong>Program Fee:</strong> ₹50,000 per year</li><li><strong>Hostel Fee:</strong> ₹30,000 per year</li><li><strong>Test Series Fee:</strong> ₹5,000</li></ul>
              <p className="note">* Scholarships available. Fee concessions for merit & need-based categories.</p>
            </div>
            <div className="card info-card">
              <h2>Required Documents</h2>
              <ul><li>Recent passport-size photograph</li><li>Valid ID proof (Aadhar/Voter ID/Passport)</li><li>10th & 12th mark sheets</li><li>Degree certificate / final year mark sheet</li><li>Community certificate (if applicable)</li><li>Income certificate (for scholarship)</li></ul>
            </div>
          </div>
          <div className="admissions-cta-panel">
            <div className="card cta-card">
              <h2>Apply Online</h2>
              <p>Start your journey towards becoming a civil servant. Our multi-step application process is simple and straightforward.</p>
              <Link to="/admissions/apply" className="btn btn-primary w-100">Start Application</Link>
              <div className="cta-divider">or</div>
              <Link to="/admissions/track" className="btn btn-outline w-100">Track Application</Link>
            </div>
            <div className="card faq-card">
              <h2>FAQs</h2>
              {[
                { q: 'Is the program fully residential?', a: 'Yes, all students must stay on campus throughout the program duration.' },
                { q: 'Can I choose my optional subject?', a: 'Yes, we offer coaching for popular optional subjects. Discuss with your mentor during admission.' },
                { q: 'Is scholarship available?', a: 'Yes, merit-based, need-based and social support scholarships are available.' },
              ].map((faq, i) => (
                <div className="faq-item" key={i}><div className="faq-q">{faq.q}</div><div className="faq-a">{faq.a}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Admissions;
