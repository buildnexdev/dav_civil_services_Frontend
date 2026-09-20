import { useState } from 'react';
import { CONTACT_INFO } from '../constants/links';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (f: string, v: string) => setForm({ ...form, [f]: v });

  return (
    <div className="contact-page">
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-accent">Get in Touch</span>
            <h1 className="section-title">Contact Us</h1>
            <p className="contact-lead-subtitle">
              Have questions regarding admissions, scholarship eligibility, or campus facilities? Reach out to our admissions helpdesk.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-panel">
              <div className="card contact-detail">
                <h3>📍 Campus Address</h3>
                <p>
                  <strong>DAV Civil Services Residential Program • Vedritam</strong><br />
                  {CONTACT_INFO.fullAddress}
                </p>
              </div>

              <div className="card contact-detail">
                <h3>📞 Admissions Helpline</h3>
                <p>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="contact-link">{CONTACT_INFO.displayPhone}</a><br />
                  <span className="text-muted text-sm">Mon - Sat: 9:00 AM - 6:00 PM</span>
                </p>
              </div>

              <div className="card contact-detail">
                <h3>✉️ Email Support</h3>
                <p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="contact-link">{CONTACT_INFO.email}</a>
                </p>
              </div>

              <div className="card contact-detail">
                <h3>🕐 Campus Hours</h3>
                <p>
                  <strong>Office:</strong> Monday - Saturday: 9:00 AM - 6:00 PM<br />
                  <strong>Residential Campus:</strong> 24/7 Supervised Learning Environment
                </p>
              </div>

              <div className="card map-card">
                <h3>🗺️ Location Map</h3>
                <div className="map-wrapper">
                  <iframe
                    title="DAV Civil Services Location"
                    src="https://maps.google.com/maps?q=213%2C%20Avvai%20Shanmugham%20Salai%2C%20Gopalapuram%2C%20Chennai%2C%20Tamil%20Nadu%20600086&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="220"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="card contact-form-card">
              {sent ? (
                <div className="text-center py-4">
                  <div className="success-icon mb-3">✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p className="text-muted">Thank you for reaching out. Our admissions team will get back to you shortly.</p>
                  <button className="btn btn-outline mt-4" onClick={() => setSent(false)}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2>Send us a Message</h2>
                  <p className="text-muted mb-4">Fill out the form below and our team will get in touch with you.</p>

                  <div className="form-group">
                    <label>Full Name *</label>
                    <input className="form-control" placeholder="Enter your full name" value={form.name} onChange={e => update('name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input className="form-control" type="email" placeholder="name@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input className="form-control" placeholder="10-digit mobile number" value={form.phone} onChange={e => update('phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input className="form-control" placeholder="e.g. UPSC Super-30 Scholarship Inquiry" value={form.subject} onChange={e => update('subject', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea className="form-control" rows={5} placeholder="Write your query here..." value={form.message} onChange={e => update('message', e.target.value)} />
                  </div>
                  <button className="btn btn-accent btn-lg w-100 mt-2" onClick={() => setSent(true)}>Send Message →</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
