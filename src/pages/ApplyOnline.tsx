import { useState } from 'react';
import { api } from '../lib/api';
import { payWithRazorpay, type RazorpayOrderResponse } from '../lib/razorpay';
import './ApplyOnline.css';

const steps = ['Personal Info', 'Education', 'Exam', 'Documents', 'Review', 'Payment'];

const ApplyOnline = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ fullName: '', dob: '', gender: '', mobile: '', email: '', address: '', district: '', state: '', tenth: '', twelfth: '', degree: '', university: '', percentage: '', gradYear: '', exam: '' });
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  const update = (field: string, val: string) => setForm({ ...form, [field]: val });
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const payAndSubmit = async () => {
    setPaying(true);
    setPayError('');
    try {
      const order = await api<RazorpayOrderResponse>('/api/payments/order', {
        method: 'POST',
        body: JSON.stringify({
          category: 'Application Fee',
          amount: 500,
          payerName: form.fullName,
          email: form.email,
          phone: form.mobile,
        }),
      });
      await payWithRazorpay(order, { name: form.fullName, email: form.email, contact: form.mobile });
      setAppId('APP' + Date.now().toString().slice(-8));
      setSubmitted(true);
    } catch (err) {
      setPayError(err instanceof Error ? err.message : 'Payment was not completed.');
    } finally {
      setPaying(false);
    }
  };

  if (submitted) {
    return (
      <div className="apply-page"><div className="container section-padding text-center">
        <div className="card success-card">
          <div className="success-icon">✓</div>
          <h2>Application Submitted Successfully!</h2>
          <p>Your Application ID: <strong>{appId}</strong></p>
          <p className="text-muted">Please save this ID for tracking your application status.</p>
        </div>
      </div></div>
    );
  }

  return (
    <div className="apply-page">
      <section className="page-hero"><div className="container"><h1>Online Application</h1><p className="lead">Complete the form below to apply for admission.</p></div></section>
      <section className="section-padding">
        <div className="container">
          <div className="stepper">{steps.map((s, i) => (
            <div className={`step ${i === step ? 'active' : i < step ? 'completed' : ''}`} key={i}><div className="step-num">{i < step ? '✓' : i + 1}</div><div className="step-label">{s}</div></div>
          ))}</div>

          <div className="card form-card">
            {step === 0 && (
              <div className="form-grid">
                <div className="form-group"><label>Full Name *</label><input className="form-control" value={form.fullName} onChange={e => update('fullName', e.target.value)} required /></div>
                <div className="form-group"><label>Date of Birth *</label><input type="date" className="form-control" value={form.dob} onChange={e => update('dob', e.target.value)} /></div>
                <div className="form-group"><label>Gender *</label><select className="form-control" value={form.gender} onChange={e => update('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                <div className="form-group"><label>Mobile *</label><input className="form-control" value={form.mobile} onChange={e => update('mobile', e.target.value)} /></div>
                <div className="form-group"><label>Email *</label><input type="email" className="form-control" value={form.email} onChange={e => update('email', e.target.value)} /></div>
                <div className="form-group full-width"><label>Address</label><textarea className="form-control" rows={2} value={form.address} onChange={e => update('address', e.target.value)} /></div>
                <div className="form-group"><label>District</label><input className="form-control" value={form.district} onChange={e => update('district', e.target.value)} /></div>
                <div className="form-group"><label>State</label><input className="form-control" value={form.state} onChange={e => update('state', e.target.value)} /></div>
              </div>
            )}
            {step === 1 && (
              <div className="form-grid">
                <div className="form-group"><label>10th Percentage</label><input className="form-control" value={form.tenth} onChange={e => update('tenth', e.target.value)} /></div>
                <div className="form-group"><label>12th Percentage</label><input className="form-control" value={form.twelfth} onChange={e => update('twelfth', e.target.value)} /></div>
                <div className="form-group"><label>Degree</label><input className="form-control" value={form.degree} onChange={e => update('degree', e.target.value)} /></div>
                <div className="form-group"><label>University</label><input className="form-control" value={form.university} onChange={e => update('university', e.target.value)} /></div>
                <div className="form-group"><label>Percentage</label><input className="form-control" value={form.percentage} onChange={e => update('percentage', e.target.value)} /></div>
                <div className="form-group"><label>Graduation Year</label><input className="form-control" value={form.gradYear} onChange={e => update('gradYear', e.target.value)} /></div>
              </div>
            )}
            {step === 2 && (
              <div className="form-grid">
                <div className="form-group full-width"><label>Target Examination *</label><select className="form-control" value={form.exam} onChange={e => update('exam', e.target.value)}><option value="">Select Exam</option><option>UPSC CSE</option><option>TNPSC</option><option>SSC CGL</option><option>IFoS</option><option>CAPF</option><option>Other</option></select></div>
              </div>
            )}
            {step === 3 && (
              <div className="form-grid">
                {['Photograph', 'ID Proof', 'Marksheets', 'Community Certificate', 'Income Certificate'].map((doc, i) => (
                  <div className="form-group" key={i}><label>{doc}</label><input type="file" className="form-control file-input" /></div>
                ))}
              </div>
            )}
            {step === 4 && (
              <div className="review-section">
                <h3>Application Review</h3>
                <div className="review-grid">
                  <div><strong>Name:</strong> {form.fullName || '—'}</div>
                  <div><strong>DOB:</strong> {form.dob || '—'}</div>
                  <div><strong>Gender:</strong> {form.gender || '—'}</div>
                  <div><strong>Mobile:</strong> {form.mobile || '—'}</div>
                  <div><strong>Email:</strong> {form.email || '—'}</div>
                  <div><strong>Degree:</strong> {form.degree || '—'}</div>
                  <div><strong>Target Exam:</strong> {form.exam || '—'}</div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="payment-section">
                <h3>Application Fee: ₹500</h3>
                <p className="text-muted">Pay securely with Razorpay Test Mode. Use card 4111 1111 1111 1111, any future expiry, and any CVV. No real money is charged.</p>
                {payError && <p className="text-muted" style={{ color: 'var(--danger)' }}>{payError}</p>}
              </div>
            )}

            <div className="form-actions">
              {step > 0 && <button className="btn btn-outline" onClick={prev}>Previous</button>}
              {step < 5 && <button className="btn btn-primary" onClick={next}>Next</button>}
              {step === 5 && <button className="btn btn-primary" onClick={payAndSubmit} disabled={paying}>{paying ? 'Opening Razorpay...' : 'Pay ₹500 with Razorpay'}</button>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyOnline;
