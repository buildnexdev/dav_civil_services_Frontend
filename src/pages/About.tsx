import './About.css';

const About = () => (
  <div className="about-page">
    <section className="page-hero">
      <div className="container">
        <h1>About DAV Civil Services</h1>
        <p className="lead">A flagship residential initiative dedicated to mentoring aspirants for UPSC, SSC, TNPSC, IFoS and other competitive examinations.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="card about-card">
            <h2>Our History</h2>
            <p>DAV Civil Services Residential Program was established with the vision of creating a world-class preparation ecosystem for competitive examination aspirants. Starting with a batch of 30 students, we have grown to become one of the premier residential coaching institutes, mentoring over 1000 aspirants and producing 250+ successful candidates across various civil services examinations. (Demo content)</p>
          </div>
          <div className="card about-card">
            <h2>Vision</h2>
            <p>"To nurture disciplined, socially responsible and academically strong aspirants capable of contributing meaningfully to public administration and society."</p>
          </div>
          <div className="card about-card">
            <h2>Mission</h2>
            <ul>
              <li>✓ Quality mentorship & structured preparation</li>
              <li>✓ Focused residential learning environment</li>
              <li>✓ Equal opportunity through scholarship support</li>
              <li>✓ Continuous assessment & holistic development</li>
              <li>✓ Interview guidance & personality development</li>
            </ul>
          </div>
          <div className="card about-card">
            <h2>Objectives</h2>
            <ul>
              <li>✓ Provide comprehensive coaching for UPSC, TNPSC, SSC & IFoS</li>
              <li>✓ Create a disciplined residential ecosystem for aspirants</li>
              <li>✓ Bridge the urban-rural preparation gap through scholarships</li>
              <li>✓ Develop well-rounded civil servants for the nation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-soft">
      <div className="container">
        <h2 className="section-title">Residential Facilities</h2>
        <div className="facilities-grid">
          {['24/7 Library', 'Individual Study Cabins', 'Fully Furnished Hostel', 'Dining Hall', 'Recreation Room', 'Computer Lab', 'Sports Facilities', 'Medical Support'].map((f, i) => (
            <div className="card facility-card" key={i}>
              <div className="facility-icon">🏛️</div>
              <h3>{f}</h3>
              <p>Modern infrastructure designed to support focused preparation and comfortable living.</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <h2 className="section-title">Student Life at DAV</h2>
        <div className="student-life-grid">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" alt="Students studying" className="student-life-img" />
          <div>
            <p>Life at DAV is structured yet enriching. Students follow a rigorous daily schedule from 5:30 AM to 10:30 PM, balanced with recreational activities, peer discussions, and mentorship sessions. The residential environment fosters camaraderie, healthy competition, and a sense of shared purpose among aspirants.</p>
            <p style={{marginTop:'1rem'}}>Weekly sessions include group discussions, essay writing, current affairs debates, and personality development workshops. Physical fitness is integral — morning PT, yoga, and sports ensure that students remain physically and mentally agile throughout their preparation journey.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
