import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import davLogo from '../assets/dav-group-logo.jpg';
import vedritamLogo from '../assets/vedritam-logo.jpg';
import LoadingSpinner from '../components/LoadingSpinner';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    setLoading(false);

    if (result.success && result.redirect) {
      navigate(result.redirect);
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <div className="login-brand-logos">
            <img src={davLogo} alt="D.A.V. Group" className="login-brand-logo" />
            <img src={vedritamLogo} alt="Vedritam" className="login-brand-logo vedritam" />
          </div>
          <h1>DAV Civil Services<br />Residential Program</h1>
          <p>"Empowering Aspirants. Building Civil Servants."</p>
          <div className="login-features">
            <div className="login-feature">✓ Structured Residential Coaching</div>
            <div className="login-feature">✓ Expert Faculty & Mentorship</div>
            <div className="login-feature">✓ Comprehensive Test Series</div>
            <div className="login-feature">✓ 24/7 Library & Study Cabins</div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <Link to="/" className="back-to-site">&larr; Back to Website</Link>
          <h2>Welcome Back</h2>
          <p className="login-sub">Sign in to your account</p>

          {error && <div className="login-error">{error}</div>}

          {loading ? (
            <LoadingSpinner label="Signing in..." size="md" />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-field">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="form-row">
                <label className="checkbox-label">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
                </label>
                <button type="button" className="forgot-link">Forgot Password?</button>
              </div>
              <button type="submit" className="btn btn-primary w-100 btn-login">Sign In</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
