import './Academics.css';

const Academics = () => (
  <div className="academics-page">
    <section className="section-padding bg-soft">
      <div className="container">
        <h2 className="section-title">Academic Programs</h2>
        <div className="academic-grid">
          {[
            { title: 'Test Series', desc: 'Weekly mock tests for Prelims & Mains with detailed analysis and ranking.' },
            { title: 'Mock Tests', desc: 'Full-length simulated exams under real exam conditions.' },
            { title: 'Study Plan', desc: 'Personalized study plans crafted by mentors based on individual strengths.' },
            { title: 'Optional Subjects', desc: 'Dedicated coaching for popular optional subjects with expert faculty.' },
            { title: 'Current Affairs', desc: 'Daily current affairs sessions covering national and international events.' },
            { title: 'Essay Writing', desc: 'Regular essay practice with evaluation by experienced faculty.' },
            { title: 'Interview Preparation', desc: 'Mock interviews with panels of retired civil servants and subject experts.' },
            { title: 'Academic Calendar', desc: 'Structured yearly calendar with milestones, tests, and review sessions.' },
          ].map((item, i) => (
            <div className="card academic-card" key={i}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Academics;
