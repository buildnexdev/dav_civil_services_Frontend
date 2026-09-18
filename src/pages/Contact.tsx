import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (f: string, v: string) => setForm({ ...form, [f]: v });

  return (
    <div className="contact-page">
      <section className="page-hero"><div className="container"><h1>Contact Us</h1><p className="lead">Get in touch with DAV Civil Services Residential Program.</p></div></section>
      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-panel">
              <div className="card contact-detail"><h3>📍 Address</h3><p>DAV Civil Services Residential Campus, Anna Nagar, Chennai - 600040, Tamil Nadu (Demo Address)</p></div>
              <div className="card contact-detail"><h3>📞 Phone</h3><p>+91 98765 43210<br/>+91 44 2856 7890</p></div>
              <div className="card contact-detail"><h3>✉️ Email</h3><p>admissions@davcivilservices.edu<br/>info@davcivilservices.edu</p></div>
              <div className="card contact-detail"><h3>🕐 Office Hours</h3><p>Monday - Saturday: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p></div>
              <div className="card map-placeholder">
                <div className="map-box">Google Map Placeholder</div>
              </div>
            </div>
            <div className="card contact-form-card">
              {sent ? (
                <div className="text-center"><div className="success-icon" style={{marginBottom:'1rem'}}>✓</div><h3>Message Sent Successfully!</h3><p className="text-muted">We'll get back to you within 24 hours.</p><button className="btn btn-outline mt-4" onClick={() => setSent(false)}>Send Another</button></div>
              ) : (
                <>
                  <h2>Send a Message</h2>
                  <div className="form-group"><label>Name *</label><input className="form-control" value={form.name} onChange={e => update('name', e.target.value)} /></div>
                  <div className="form-group"><label>Email *</label><input className="form-control" type="email" value={form.email} onChange={e => update('email', e.target.value)} /></div>
                  <div className="form-group"><label>Phone</label><input className="form-control" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
                  <div className="form-group"><label>Subject *</label><input className="form-control" value={form.subject} onChange={e => update('subject', e.target.value)} /></div>
                  <div className="form-group"><label>Message *</label><textarea className="form-control" rows={5} value={form.message} onChange={e => update('message', e.target.value)} /></div>
                  <button className="btn btn-primary w-100" onClick={() => setSent(true)}>Send Message</button>
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
