import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">DAV Civil Services</div>
          <p className="footer-desc">Residential Program dedicated to empowering aspirants through structured coaching, mentorship, and scholarship support for UPSC, SSC, TNPSC, and other competitive examinations.</p>
        </div>
        <div>
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <Link to="/">Home</Link><Link to="/about">About</Link><Link to="/academics">Academics</Link><Link to="/faculty">Faculty</Link><Link to="/gallery">Gallery</Link>
          </div>
        </div>
        <div>
          <h4 className="footer-title">Admissions</h4>
          <div className="footer-links">
            <Link to="/admissions">Information</Link><Link to="/admissions/apply">Apply Online</Link><Link to="/admissions/track">Track Application</Link><Link to="/scholarship">Scholarships</Link>
          </div>
        </div>
        <div>
          <h4 className="footer-title">Student Resources</h4>
          <div className="footer-links">
            <Link to="/success-stories">Success Stories</Link><Link to="/alumni">Alumni</Link><Link to="/news">News</Link><Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="footer-title">Contact</h4>
          <div className="footer-contact">
            <p>📍 Anna Nagar, Chennai, Tamil Nadu (Demo)</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@davcivilservices.edu</p>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">f</a><a href="#" className="social-icon">𝕏</a><a href="#" className="social-icon">in</a><a href="#" className="social-icon">▶</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 DAV Civil Services Residential Program. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms</a> | <a href="#">Accessibility</a></p>
      </div>
    </div>
  </footer>
);

export default Footer;
