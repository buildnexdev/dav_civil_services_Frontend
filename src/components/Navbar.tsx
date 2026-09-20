import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import davLogo from '../assets/dav-group-logo.jpg';
import vedritamLogo from '../assets/vedritam-logo.jpg';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown & mobile menu on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      {/* <div className="top-bar">
        <div className="container top-bar-content">
          <div className="contact-info">
            <VedicSunMotif style={{ marginRight: '0.4rem' }} />
            <span>D.A.V. Group • Chennai • Estd. 1970</span>
            <span className="top-bar-divider">|</span>
            <span className="top-bar-email">admissions@davcivilservices.edu</span>
          </div>
          <div className="top-actions">
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <a href={ZOHO_APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-sm">Apply Now</a>
          </div>
        </div>
      </div> */}

      <nav className="main-nav">
        <div className="container nav-container">
          <Link to="/" className="nav-logo">
            <img src={davLogo} alt="D.A.V. Group Chennai" className="brand-logo dav-logo" />
            <img src={vedritamLogo} alt="Vedritam" className="brand-logo vedritam-logo" />
            <div className="logo-text">
              <span className="logo-title">DAV Civil Services</span>
              <span className="logo-subtitle">Residential Program • Vedritam</span>
            </div>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>

          {/* Navigation Links */}
          <div className={`nav-links ${mobileMenuOpen ? 'is-mobile-open' : ''}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>

            {/* About Dropdown */}
            <div
              className={`nav-dropdown ${dropdownOpen ? 'is-open' : ''}`}
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'nav-link dropdown-toggle active' : 'nav-link dropdown-toggle'}
                onClick={() => {
                  setDropdownOpen(prev => !prev);
                }}
              >
                About <span className="dropdown-arrow">▾</span>
              </NavLink>

              <div className="dropdown-menu">
                <Link to="/about#history" className="dropdown-item" onClick={handleDropdownItemClick}>
                  <span className="dropdown-icon">📜</span>
                  <span>History of the initiative</span>
                </Link>
                <Link to="/about#objectives" className="dropdown-item" onClick={handleDropdownItemClick}>
                  <span className="dropdown-icon">🎯</span>
                  <span>Objectives</span>
                </Link>
                <Link to="/about#residential-facilities" className="dropdown-item" onClick={handleDropdownItemClick}>
                  <span className="dropdown-icon">🏛️</span>
                  <span>Residential facilities</span>
                </Link>
                <Link to="/about#academic-structure" className="dropdown-item" onClick={handleDropdownItemClick}>
                  <span className="dropdown-icon">📚</span>
                  <span>Academic structure</span>
                </Link>
                <Link to="/about#scholarship-support" className="dropdown-item" onClick={handleDropdownItemClick}>
                  <span className="dropdown-icon">🎓</span>
                  <span>Scholarship support</span>
                </Link>
              </div>
            </div>

            <NavLink to="/programs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Programs</NavLink>
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
