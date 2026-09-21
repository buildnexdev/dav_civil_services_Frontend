import { useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import './TrackApplication.css';

const TRACK_STEPS = [
  'Submitted',
  'Under Review',
  'Documents Verified',
  'Exam Scheduled',
  'Shortlisted',
  'Interview',
  'Selected'
];

type Tracked = {
  applicationCode: string;
  name: string;
  program: string;
  status: string;
  remarks: string;
  createdAt: string;
};

const TrackApplication = () => {
  const [appId, setAppId] = useState('');
  const [lookup, setLookup] = useState('');
  const [tracked, setTracked] = useState<Tracked | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ code: appId.trim() });
      if (lookup.trim()) params.set('lookup', lookup.trim());
      const data = await api<{ application: Tracked }>(`/api/public/applications/track?${params.toString()}`);
      setTracked(data.application);
    } catch (err) {
      setTracked(null);
      setError(err instanceof Error ? err.message : 'No application found.');
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = tracked ? TRACK_STEPS.indexOf(tracked.status) : -1;
  const rejected = tracked?.status === 'Rejected';

  return (
    <div className="track-page">
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <LoadingSpinner label="Fetching application status..." />
          ) : !tracked ? (
            <form className="card track-form-card" onSubmit={handleTrack}>
              <h2>Enter Details</h2>
              {error && <p className="text-muted" style={{ color: 'var(--danger)' }}>{error}</p>}
              <div className="form-grid">
                <div className="form-group">
                  <label>Application Number</label>
                  <input className="form-control" value={appId} onChange={(e) => setAppId(e.target.value)} placeholder="e.g. APP001" required />
                </div>
                <div className="form-group">
                  <label>Date of Birth / Mobile</label>
                  <input className="form-control" value={lookup} onChange={(e) => setLookup(e.target.value)} placeholder="YYYY-MM-DD or mobile" />
                </div>
              </div>
              <button className="btn btn-primary mt-4" type="submit">Track</button>
            </form>
          ) : (
            <div className="card track-result-card">
              <h2>Application Status: <span className="badge badge-primary">{tracked.applicationCode}</span></h2>
              <p className="text-muted">{tracked.name} · {tracked.program || 'Program not set'} · Applied {tracked.createdAt || '—'}</p>
              {rejected ? (
                <p style={{ color: 'var(--danger)', fontWeight: 600 }}>This application was rejected.{tracked.remarks ? ` ${tracked.remarks}` : ''}</p>
              ) : (
                <div className="timeline">
                  {TRACK_STEPS.map((status, i) => (
                    <div className={`timeline-step ${i <= currentIndex ? 'completed' : ''} ${i === currentIndex ? 'current' : ''}`} key={status}>
                      <div className="tl-dot">{i <= currentIndex ? '✓' : i + 1}</div>
                      <div className="tl-content">
                        <div className="tl-title">{status}</div>
                        {i <= currentIndex && <div className="tl-date">{i === currentIndex ? 'Current' : 'Completed'}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button className="btn btn-outline mt-4" onClick={() => { setTracked(null); setError(''); }}>Track Another</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrackApplication;
