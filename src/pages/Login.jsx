import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    const userData = {
      name: isSignup ? formData.name : 'Arjun Mehta',
      email: formData.email || 'arjun.mehta@example.com',
      phone: isSignup ? formData.phone : '+91 98765 43210',
      bloodGroup: 'O+',
      age: 32,
      gender: 'Male',
      id: 'USR' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
    onLogin(userData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <svg className="brand-logo" width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="#2563eb"/>
              <path d="M12 11.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V9c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-7v1.99z" fill="white"/>
            </svg>
            <h1>iTrust Healthcare</h1>
          </div>
          <p className="login-tagline">Professional healthcare management platform for modern medical practices.</p>
          <div className="login-features">
            <div className="feature-item">
              <svg className="feature-icon" width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" fill="currentColor"/>
              </svg>
              <div>
                <h4>Expert Doctors</h4>
                <p>Connect with verified healthcare professionals</p>
              </div>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
              </svg>
              <div>
                <h4>Health Tracking</h4>
                <p>Monitor your vitals and medical reports</p>
              </div>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M4.22 11.29l1.42 1.42L7.5 11l-1.86-1.71-1.42 1.42zM20 8.69l-1.41-1.42L16.73 9.1l1.41 1.42L20 8.69zM13 3h-2v3h2V3zm-1 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm-7-5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z" fill="currentColor"/>
                <circle cx="12" cy="14" r="2" fill="currentColor"/>
              </svg>
              <div>
                <h4>Medicine Management</h4>
                <p>Never miss your medication schedule</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <div className="login-form-header">
              <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
              <p>{isSignup ? 'Sign up to get started' : 'Sign in to continue'}</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {isSignup && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {isSignup && (
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isSignup && (
                <div className="form-footer-links">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="btn-primary large">
                {isSignup ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="login-toggle">
              {isSignup ? (
                <p>Already have an account? <button type="button" onClick={() => setIsSignup(false)} className="toggle-link">Sign In</button></p>
              ) : (
                <p>Don't have an account? <button type="button" onClick={() => setIsSignup(true)} className="toggle-link">Sign Up</button></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
