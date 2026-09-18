import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = login(username, password);
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
          <div className="login-logo-icon">DAV</div>
          <h1>DAV Civil Services<br/>Residential Program</h1>
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
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" className="form-control" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="form-row">
              <label className="checkbox-label">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-primary w-100 btn-login">Sign In</button>
          </form>
          
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
