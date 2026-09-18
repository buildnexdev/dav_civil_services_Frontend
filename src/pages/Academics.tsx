import './Academics.css';

const schedule = [
  { time: '05:30 AM', activity: 'Wake Up & Morning Routine' },
  { time: '06:00 AM', activity: 'Newspaper Reading / Current Affairs' },
  { time: '07:00 AM', activity: 'Breakfast' },
  { time: '08:00 AM', activity: 'Classroom Session I' },
  { time: '11:00 AM', activity: 'Subject Preparation / Self Study' },
  { time: '01:00 PM', activity: 'Lunch Break' },
  { time: '02:00 PM', activity: 'Classroom Session II / Study Session' },
  { time: '04:00 PM', activity: 'Test / Group Discussion' },
  { time: '06:00 PM', activity: 'Mentorship / Doubt Clearing' },
  { time: '08:00 PM', activity: 'Revision & Self Study' },
  { time: '10:30 PM', activity: 'Study Review / Lights Out' },
];

const Academics = () => (
  <div className="academics-page">
    <section className="page-hero">
      <div className="container"><h1>Academics</h1><p className="lead">Structured preparation through a disciplined daily routine, comprehensive test series, and expert mentorship.</p></div>
    </section>

    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">Daily Routine</h2>
        <div className="card schedule-card">
          <div className="schedule-list">
            {schedule.map((s, i) => (
              <div className="schedule-item" key={i}>
                <div className="schedule-time">{s.time}</div>
                <div className="schedule-dot"></div>
                <div className="schedule-activity">{s.activity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

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
