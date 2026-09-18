import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="contact-info">
            <span>📞 +91 98765 43210</span>
            <span>✉️ admissions@davcivilservices.edu</span>
          </div>
          <div className="top-actions">
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/admissions/apply" className="btn btn-primary btn-sm">Apply Now</Link>
          </div>
        </div>
      </div>
      
      <nav className="main-nav">
        <div className="container nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">DAV</div>
            <div className="logo-text">
              <span className="logo-title">DAV Civil Services</span>
              <span className="logo-subtitle">Residential Program</span>
            </div>
          </Link>
          
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <NavLink to="/academics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Academics</NavLink>
            <NavLink to="/admissions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admissions</NavLink>
            <NavLink to="/scholarship" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Scholarship</NavLink>
            <NavLink to="/faculty" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Faculty</NavLink>
            <NavLink to="/success-stories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Success</NavLink>
            <NavLink to="/alumni" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Alumni</NavLink>
            <NavLink to="/news" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>News</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
