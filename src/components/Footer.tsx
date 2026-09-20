import { Link } from 'react-router-dom';
import davLogo from '../assets/dav-group-logo.jpg';
import vedritamLogo from '../assets/vedritam-logo.jpg';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-brand-logos">
            <img src={davLogo} alt="D.A.V. Group" className="footer-logo-img" />
            <img src={vedritamLogo} alt="Vedritam" className="footer-logo-img vedritam" />
          </div>
          <div className="footer-logo">DAV Civil Services</div>
          <p className="footer-desc">
            Residential Program dedicated to empowering aspirants through structured coaching, mentorship, and scholarship support for UPSC, SSC, TNPSC, and other competitive examinations.
          </p>
        </div>
        <div>
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/academics">Academics</Link>
            <Link to="/faculty">Faculty</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        </div>
        <div>
          <h4 className="footer-title">Admissions</h4>
          <div className="footer-links">
            <Link to="/admissions">Information</Link>
            <Link to="/admissions/apply">Apply Online</Link>
            <Link to="/admissions/track">Track Application</Link>
            <Link to="/scholarship">Scholarships</Link>
          </div>
        </div>
        <div>
          <h4 className="footer-title">Student Resources</h4>
          <div className="footer-links">
            <Link to="/success-stories">Success Stories</Link>
            <Link to="/alumni">Alumni</Link>
            <Link to="/news">News</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="footer-title">Contact</h4>
          <div className="footer-contact">
            <p>Anna Nagar, Chennai, Tamil Nadu</p>
            <p>+91 98765 43210</p>
            <p>info@davcivilservices.edu</p>
          </div>
          <div className="social-links">
            <button type="button" className="social-icon" aria-label="Facebook">f</button>
            <button type="button" className="social-icon" aria-label="X">𝕏</button>
            <button type="button" className="social-icon" aria-label="LinkedIn">in</button>
            <button type="button" className="social-icon" aria-label="YouTube">▶</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2026 DAV Civil Services Residential Program • Vedritam. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
