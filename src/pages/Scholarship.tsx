import './Scholarship.css';

const scholarships = [
  { name: 'Merit Scholarship', amount: '₹25,000/year', criteria: 'Top 10% in entrance exam & consistent test performance', color: 'var(--primary-light)' },
  { name: 'Need-Based Scholarship', amount: '₹40,000/year', criteria: 'Family income below ₹3,00,000 per annum with valid income certificate', color: 'var(--accent)' },
  { name: 'Social Support Scholarship', amount: '₹35,000/year', criteria: 'SC/ST/OBC candidates with community certificate & financial need', color: 'var(--success)' },
  { name: 'Academic Excellence', amount: '₹25,000/year', criteria: 'Graduation percentage above 80% from recognized university', color: 'var(--primary-mid)' },
];

const Scholarship = () => (
  <div className="scholarship-page">
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">Scholarship Categories</h2>
        <div className="scholarship-grid">{scholarships.map((s, i) => (
          <div className="card scholarship-card" key={i} style={{borderTop: `4px solid ${s.color}`}}>
            <h3>{s.name}</h3><div className="sch-amount">{s.amount}</div><p>{s.criteria}</p>
          </div>
        ))}</div>
      </div>
    </section>
    <section className="section-padding bg-soft">
      <div className="container">
        <div className="about-grid">
          <div className="card about-card"><h2>Eligibility</h2><ul><li>Must be enrolled in DAV residential program</li><li>Maintain minimum 80% attendance</li><li>Clear entrance exam or meet category-specific criteria</li><li>Submit required documents within deadline</li></ul></div>
          <div className="card about-card"><h2>Application Process</h2><ol style={{paddingLeft:'1.25rem', listStyle:'decimal'}}><li>Fill scholarship application form during admission</li><li>Submit supporting documents</li><li>Verification by scholarship committee</li><li>Announcement of results within 30 days</li></ol></div>
          <div className="card about-card"><h2>Required Documents</h2><ul><li>Income certificate from Tahsildar</li><li>Community certificate (if applicable)</li><li>Mark sheets (10th, 12th, Degree)</li><li>Bank account details</li><li>Aadhar card copy</li></ul></div>
          <div className="card about-card"><h2>Beneficiary Statistics (Demo)</h2><div className="sch-stats"><div><span className="stat-big">500+</span><span>Total Beneficiaries</span></div><div><span className="stat-big">₹75L+</span><span>Scholarships Disbursed</span></div></div></div>
        </div>
      </div>
    </section>
  </div>
);

export default Scholarship;
