import React, { useState } from 'react';

const Account = ({ user, onLogout }) => {
  const [notifications, setNotifications] = useState({
    appointments: true,
    reports: true,
    medicines: true,
    healthTips: false
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    profileVisibility: 'private'
  });

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy({ ...privacy, [key]: value });
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1 className="page-title">Account Settings</h1>
          <p className="page-subtitle">Manage your account preferences and security</p>
        </div>

        <div className="account-sections">
          {/* Account Information */}
          <div className="account-section">
            <div className="section-header">
              <h2 className="section-title">Account Information</h2>
            </div>
            <div className="account-info-card">
              <div className="account-info-row">
                <div className="account-info-item">
                  <label>User ID</label>
                  <p>{user?.id || 'USR12345'}</p>
                </div>
                <div className="account-info-item">
                  <label>Account Status</label>
                  <span className="status-badge active">Active</span>
                </div>
              </div>
              <div className="account-info-row">
                <div className="account-info-item">
                  <label>Member Since</label>
                  <p>January 2024</p>
                </div>
                <div className="account-info-item">
                  <label>Last Login</label>
                  <p>Today at 9:30 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="account-section">
            <div className="section-header">
              <h2 className="section-title">Security</h2>
            </div>
            <div className="security-options">
              <div className="security-item">
                <div className="security-info">
                  <h4>Password</h4>
                  <p>Last changed 3 months ago</p>
                </div>
                <button className="btn-secondary">Change Password</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security</p>
                </div>
                <button className="btn-secondary">Enable 2FA</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Active Sessions</h4>
                  <p>Manage your active sessions</p>
                </div>
                <button className="btn-secondary">View Sessions</button>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="account-section">
            <div className="section-header">
              <h2 className="section-title">Notification Preferences</h2>
            </div>
            <div className="preferences-list">
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Appointment Reminders</h4>
                  <p>Get notified about upcoming appointments</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.appointments}
                    onChange={() => handleNotificationChange('appointments')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Lab Reports</h4>
                  <p>Notify when new reports are available</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.reports}
                    onChange={() => handleNotificationChange('reports')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Medicine Reminders</h4>
                  <p>Never miss your medication schedule</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.medicines}
                    onChange={() => handleNotificationChange('medicines')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Health Tips</h4>
                  <p>Receive daily health tips and recommendations</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.healthTips}
                    onChange={() => handleNotificationChange('healthTips')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="account-section">
            <div className="section-header">
              <h2 className="section-title">Privacy Settings</h2>
            </div>
            <div className="preferences-list">
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Data Sharing</h4>
                  <p>Allow anonymous data for health research</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={privacy.shareData}
                    onChange={() => handlePrivacyChange('shareData', !privacy.shareData)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Profile Visibility</h4>
                  <p>Control who can see your profile</p>
                </div>
                <select 
                  className="form-input"
                  value={privacy.profileVisibility}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  style={{maxWidth: '200px'}}
                >
                  <option value="private">Private</option>
                  <option value="doctors">Doctors Only</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="account-section danger-zone">
            <div className="section-header">
              <h2 className="section-title">Danger Zone</h2>
            </div>
            <div className="danger-actions">
              <div className="danger-item">
                <div className="danger-info">
                  <h4>Download Your Data</h4>
                  <p>Download all your health data and reports</p>
                </div>
                <button className="btn-secondary">Download Data</button>
              </div>
              <div className="danger-item">
                <div className="danger-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all data</p>
                </div>
                <button className="btn-danger">Delete Account</button>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="account-section">
            <button className="btn-logout" onClick={onLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
