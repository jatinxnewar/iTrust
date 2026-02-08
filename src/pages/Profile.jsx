import React, { useState } from 'react';

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Arjun Mehta',
    email: user?.email || 'arjun.mehta@example.com',
    phone: user?.phone || '+91 98765 43210',
    bloodGroup: user?.bloodGroup || 'O+',
    age: user?.age || 32,
    gender: user?.gender || 'Male',
    address: '123, MG Road, Bangalore, Karnataka 560001',
    emergencyContact: '+91 98765 12345',
    emergencyName: 'Priya Mehta (Wife)'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header-card">
          <div className="profile-banner"></div>
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMale&backgroundColor=2563eb&mouth=serious" 
                alt="Profile" 
                className="profile-avatar-large"
              />
              <button className="avatar-change-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 16c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" fill="currentColor"/>
                  <path d="M20 6h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65H9.88c-.56 0-1.1.24-1.48.65L7.17 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div className="profile-header-info">
              <h1 className="profile-name">{formData.name}</h1>
              <p className="profile-id">Patient ID: {user?.id || 'USR12345'}</p>
              <div className="profile-quick-stats">
                <div className="quick-stat">
                  <svg className="stat-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ef4444"/>
                  </svg>
                  <span>{formData.bloodGroup}</span>
                </div>
                <div className="quick-stat">
                  <svg className="stat-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#64748b"/>
                  </svg>
                  <span>{formData.age} years, {formData.gender}</span>
                </div>
              </div>
            </div>
            <div className="profile-header-actions">
              {!isEditing ? (
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div style={{display: 'flex', gap: '0.75rem'}}>
                  <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button className="btn-primary" onClick={handleSubmit}>Save Changes</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="profile-content-grid">
          {/* Personal Information */}
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Personal Information</h2>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p>{formData.name}</p>
                )}
              </div>
              <div className="info-item">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p>{formData.email}</p>
                )}
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p>{formData.phone}</p>
                )}
              </div>
              <div className="info-item">
                <label>Blood Group</label>
                {isEditing ? (
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-input">
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                ) : (
                  <p>{formData.bloodGroup}</p>
                )}
              </div>
              <div className="info-item">
                <label>Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p>{formData.age} years</p>
                )}
              </div>
              <div className="info-item">
                <label>Gender</label>
                {isEditing ? (
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p>{formData.gender}</p>
                )}
              </div>
              <div className="info-item full-width">
                <label>Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input"
                    rows="2"
                  />
                ) : (
                  <p>{formData.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Emergency Contact</h2>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Contact Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p>{formData.emergencyName}</p>
                )}
              </div>
              <div className="info-item">
                <label>Contact Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p>{formData.emergencyContact}</p>
                )}
              </div>
            </div>
          </div>

          {/* Health Overview */}
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Health Overview</h2>
            </div>
            <div className="health-stats-grid">
              <div className="health-stat-card">
                <svg className="health-stat-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#2563eb"/>
                </svg>
                <div className="health-stat-content">
                  <h4>Total Reports</h4>
                  <p className="health-stat-value">24</p>
                </div>
              </div>
              <div className="health-stat-card">
                <svg className="health-stat-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#2563eb"/>
                </svg>
                <div className="health-stat-content">
                  <h4>Consultations</h4>
                  <p className="health-stat-value">12</p>
                </div>
              </div>
              <div className="health-stat-card">
                <svg className="health-stat-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M4.22 11.29l1.42 1.42L7.5 11l-1.86-1.71-1.42 1.42zM20 8.69l-1.41-1.42L16.73 9.1l1.41 1.42L20 8.69zM13 3h-2v3h2V3zm-1 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm-7-5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z" fill="#2563eb"/>
                  <circle cx="12" cy="14" r="2" fill="#2563eb"/>
                </svg>
                <div className="health-stat-content">
                  <h4>Active Medications</h4>
                  <p className="health-stat-value">3</p>
                </div>
              </div>
              <div className="health-stat-card">
                <svg className="health-stat-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" fill="#2563eb"/>
                </svg>
                <div className="health-stat-content">
                  <h4>Upcoming Appointments</h4>
                  <p className="health-stat-value">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="profile-section full-width">
            <div className="section-header">
              <h2 className="section-title">Medical History</h2>
              <button className="section-link">+ Add Condition</button>
            </div>
            <div className="medical-history-list">
              <div className="history-item">
                <svg className="history-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" fill="#2563eb"/>
                </svg>
                <div className="history-content">
                  <h4>Type 2 Diabetes</h4>
                  <p>Diagnosed in 2019 • Managed with medication</p>
                </div>
                <span className="history-status active">Active</span>
              </div>
              <div className="history-item">
                <svg className="history-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ef4444"/>
                </svg>
                <div className="history-content">
                  <h4>Hypertension</h4>
                  <p>Diagnosed in 2020 • Regular monitoring required</p>
                </div>
                <span className="history-status active">Active</span>
              </div>
              <div className="history-item">
                <svg className="history-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#64748b"/>
                </svg>
                <div className="history-content">
                  <h4>Fracture - Right Arm</h4>
                  <p>Occurred in 2018 • Fully recovered</p>
                </div>
                <span className="history-status resolved">Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
