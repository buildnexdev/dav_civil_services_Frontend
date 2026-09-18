import { useState } from 'react';
import './TrackApplication.css';

const timelineSteps = ['Application Submitted', 'Document Verification', 'Entrance Examination', 'Shortlisted', 'Interview', 'Selected'];

const TrackApplication = () => {
  const [appId, setAppId] = useState('');
  const [dob, setDob] = useState('');
  const [tracked, setTracked] = useState(false);
  const currentStep = 2; // Demo: stopped at step 3

  return (
    <div className="track-page">
      <section className="page-hero"><div className="container"><h1>Track Application</h1><p className="lead">Enter your application details to check the current status.</p></div></section>
      <section className="section-padding">
        <div className="container">
          {!tracked ? (
            <div className="card track-form-card">
              <h2>Enter Details</h2>
              <div className="form-grid">
                <div className="form-group"><label>Application Number</label><input className="form-control" value={appId} onChange={e => setAppId(e.target.value)} placeholder="e.g. APP2025001" /></div>
                <div className="form-group"><label>Date of Birth / Mobile</label><input className="form-control" value={dob} onChange={e => setDob(e.target.value)} placeholder="DD/MM/YYYY or Mobile" /></div>
              </div>
              <button className="btn btn-primary mt-4" onClick={() => setTracked(true)}>Track</button>
            </div>
          ) : (
            <div className="card track-result-card">
              <h2>Application Status: <span className="badge badge-primary">{appId || 'APP2025001'}</span></h2>
              <div className="timeline">{timelineSteps.map((s, i) => (
                <div className={`timeline-step ${i <= currentStep ? 'completed' : ''} ${i === currentStep ? 'current' : ''}`} key={i}>
                  <div className="tl-dot">{i <= currentStep ? '✓' : i + 1}</div>
                  <div className="tl-content"><div className="tl-title">{s}</div>{i <= currentStep && <div className="tl-date">Completed</div>}</div>
                </div>
              ))}</div>
              <button className="btn btn-outline mt-4" onClick={() => setTracked(false)}>Track Another</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrackApplication;
