import { Link } from 'react-router-dom';
import { ZOHO_APPLY_URL } from '../constants/links';
import './Admissions.css';

const Admissions = () => (
  <div className="admissions-page">
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-4">
          <span className="badge badge-accent">Enroll Today</span>
          <h1 className="section-title">Admissions & Guidelines</h1>
          <p className="admissions-lead-subtitle">
            Comprehensive information regarding eligibility criteria, application process, fee structure, and entrance deadlines for the 2027–28 residential batch.
          </p>
        </div>

        <div className="admissions-grid">
          <div className="admissions-info">
            <div className="card info-card">
              <h2>🎓 Eligibility Criteria</h2>
              <ul>
                <li>Graduate in any discipline from a recognized university.</li>
                <li>Age Limit: 21 to 32 years (Relaxation applicable as per Govt. norms).</li>
                <li>Committed to full-time 24/7 campus residential preparation.</li>
                <li>Qualify in the DAV Entrance Examination & Personal Interview.</li>
              </ul>
            </div>

            <div className="card info-card">
              <h2>📋 Admission Process</h2>
              <ol className="process-list">
                <li><strong>Online Registration:</strong> Submit online application form with academic credentials.</li>
                <li><strong>Entrance Exam:</strong> Appear for DAV All-India Civil Services Selection Test.</li>
                <li><strong>Personal Interview:</strong> Shortlisted candidates undergo a mentorship interview.</li>
                <li><strong>Final Merit List:</strong> Selection based on cumulative score in written exam & interview.</li>
                <li><strong>Enrollment & Hostel Allotment:</strong> Fee confirmation and campus room assignment.</li>
              </ol>
            </div>

            <div className="card info-card">
              <h2>📅 Important Dates (2027–28 Session)</h2>
              <div className="dates-grid">
                <div className="date-row"><span>Application Start:</span> <strong>January 15, 2026</strong></div>
                <div className="date-row"><span>Application Deadline:</span> <strong>March 31, 2026</strong></div>
                <div className="date-row"><span>DAV Entrance Exam:</span> <strong>April 20, 2026</strong></div>
                <div className="date-row"><span>Interview Schedule:</span> <strong>May 5–10, 2026</strong></div>
                <div className="date-row"><span>Final Selection List:</span> <strong>May 20, 2026</strong></div>
                <div className="date-row"><span>Batch Commencement:</span> <strong>June 15, 2026</strong></div>
              </div>
            </div>

            <div className="card info-card">
              <h2>💳 Fee Structure & Grants</h2>
              <ul className="fee-list">
                <li><strong>Application Fee:</strong> ₹500</li>
                <li><strong>Annual Program Coaching Fee:</strong> ₹50,000 / year</li>
                <li><strong>Hostel & Mess Accommodation:</strong> ₹30,000 / year</li>
                <li><strong>Comprehensive Test Series Fee:</strong> ₹5,000</li>
              </ul>
              <p className="note">* Up to 100% Super-30 scholarships available for top entrance exam rankers.</p>
            </div>

            <div className="card info-card">
              <h2>📂 Required Documents</h2>
              <ul className="docs-list">
                <li>Recent passport-size photograph</li>
                <li>Valid Photo ID (Aadhar / Voter ID / Passport)</li>
                <li>10th & 12th Marksheets</li>
                <li>Undergraduate Degree Certificate / Consolidated Marksheet</li>
                <li>Community Certificate (if applicable)</li>
                <li>Annual Family Income Certificate (for Super-30 / Merit Scholarship)</li>
              </ul>
            </div>
          </div>

          <div className="admissions-cta-panel">
            <div className="card cta-card">
              <span className="badge badge-accent mb-2">Direct Apply</span>
              <h2>Start Your Application</h2>
              <p>Ready to join DAV Civil Services Residential Program? Fill out our official application form online.</p>
              <a href={ZOHO_APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg w-100 mb-2">Apply Online Now →</a>
              <div className="cta-divider">or track existing application</div>
              <Link to="/admissions/track" className="btn btn-outline w-100">Track Application Status</Link>
            </div>

            <div className="card faq-card">
              <h2>Frequently Asked Questions</h2>
              {[
                { q: 'Is the program 100% residential?', a: 'Yes, all students reside in our dedicated Gopalapuram, Chennai campus with 24/7 library and mentorship facilities.' },
                { q: 'Can I select Optional subjects during coaching?', a: 'Yes, specialized guidance for popular optional subjects (Public Administration, Geography, History, PSIR, Tamil Literature) is provided.' },
                { q: 'How are scholarships awarded?', a: 'Top rankers in the entrance examination receive up to 100% fee waiver under the Vedritam Super-30 initiative.' },
              ].map((faq, i) => (
                <div className="faq-item" key={i}>
                  <div className="faq-q">Q: {faq.q}</div>
                  <div className="faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Admissions;
