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
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const result = login(username, password);
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <div className="demo-grid">
              <div className="demo-item"><span className="demo-role">Admin</span> admin / Admin@123</div>
              <div className="demo-item"><span className="demo-role">Student</span> testStuent / password#1</div>
              <div className="demo-item"><span className="demo-role">Staff</span> teststaff / password#1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
