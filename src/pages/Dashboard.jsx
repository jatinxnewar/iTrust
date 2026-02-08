import React, { useState } from 'react';
import { healthTips, achievements } from '../data/mockData';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };

  const getMetricData = (metric) => {
    const data = {
      weekly: { steps: 8250, heartRate: 72, spo2: 98, temp: 98.2, change: '+5%' },
      monthly: { steps: 7800, heartRate: 74, spo2: 97, temp: 98.3, change: '+12%' },
      yearly: { steps: 7200, heartRate: 73, spo2: 97, temp: 98.4, change: '+8%' }
    };
    return data[timeFilter];
  };

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Health Dashboard</h1>
          <p className="page-subtitle">Monitor your health metrics and track your wellness journey</p>
        </div>
        <div className="header-actions">
          <div className="time-filter">
            <button 
              onClick={() => setTimeFilter('weekly')}
              className={`filter-btn ${timeFilter === 'weekly' ? 'active' : ''}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeFilter('monthly')}
              className={`filter-btn ${timeFilter === 'monthly' ? 'active' : ''}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setTimeFilter('yearly')}
              className={`filter-btn ${timeFilter === 'yearly' ? 'active' : ''}`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Vital Stats Grid */}
      <div className="metrics-grid">
        <div className="metric-card blue">
          <div className="metric-header">
            <div className="metric-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="metric-label">Daily Steps</p>
              <h3 className="metric-value">{getMetricData().steps.toLocaleString()}</h3>
            </div>
          </div>
          <div className="metric-footer">
            <span className="metric-change positive">{getMetricData().change}</span>
            <span className="metric-period">vs last {timeFilter === 'weekly' ? 'week' : timeFilter === 'monthly' ? 'month' : 'year'}</span>
          </div>
          <div className="metric-chart">
            <div className="chart-bar" style={{height: '60%'}}></div>
            <div className="chart-bar" style={{height: '75%'}}></div>
            <div className="chart-bar" style={{height: '65%'}}></div>
            <div className="chart-bar" style={{height: '85%'}}></div>
            <div className="chart-bar" style={{height: '90%'}}></div>
            <div className="chart-bar" style={{height: '80%'}}></div>
            <div className="chart-bar" style={{height: '95%'}}></div>
          </div>
        </div>

        <div className="metric-card red">
          <div className="metric-header">
            <div className="metric-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="metric-label">Heart Rate</p>
              <h3 className="metric-value">{getMetricData().heartRate} <span className="metric-unit">bpm</span></h3>
            </div>
          </div>
          <div className="metric-footer">
            <span className="metric-change positive">{getMetricData().change}</span>
            <span className="metric-period">Normal range</span>
          </div>
          <div className="metric-chart">
            <div className="chart-bar" style={{height: '70%'}}></div>
            <div className="chart-bar" style={{height: '65%'}}></div>
            <div className="chart-bar" style={{height: '72%'}}></div>
            <div className="chart-bar" style={{height: '68%'}}></div>
            <div className="chart-bar" style={{height: '75%'}}></div>
            <div className="chart-bar" style={{height: '70%'}}></div>
            <div className="chart-bar" style={{height: '72%'}}></div>
          </div>
        </div>

        <div className="metric-card purple">
          <div className="metric-header">
            <div className="metric-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="metric-label">Blood Oxygen</p>
              <h3 className="metric-value">{getMetricData().spo2}<span className="metric-unit">%</span></h3>
            </div>
          </div>
          <div className="metric-footer">
            <span className="metric-change positive">{getMetricData().change}</span>
            <span className="metric-period">Excellent</span>
          </div>
          <div className="metric-chart">
            <div className="chart-bar" style={{height: '95%'}}></div>
            <div className="chart-bar" style={{height: '97%'}}></div>
            <div className="chart-bar" style={{height: '96%'}}></div>
            <div className="chart-bar" style={{height: '98%'}}></div>
            <div className="chart-bar" style={{height: '97%'}}></div>
            <div className="chart-bar" style={{height: '98%'}}></div>
            <div className="chart-bar" style={{height: '99%'}}></div>
          </div>
        </div>

        <div className="metric-card orange">
          <div className="metric-header">
            <div className="metric-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9.24 2 7 4.24 7 7c0 1.35.54 2.57 1.41 3.47L12 14l3.59-3.53C16.46 9.57 17 8.35 17 7c0-2.76-2.24-5-5-5z" fill="currentColor"/>
                <path d="M12 14v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="metric-label">Temperature</p>
              <h3 className="metric-value">{getMetricData().temp}<span className="metric-unit">°F</span></h3>
            </div>
          </div>
          <div className="metric-footer">
            <span className="metric-change neutral">Normal</span>
            <span className="metric-period">Stable</span>
          </div>
          <div className="metric-chart">
            <div className="chart-bar" style={{height: '50%'}}></div>
            <div className="chart-bar" style={{height: '52%'}}></div>
            <div className="chart-bar" style={{height: '51%'}}></div>
            <div className="chart-bar" style={{height: '50%'}}></div>
            <div className="chart-bar" style={{height: '51%'}}></div>
            <div className="chart-bar" style={{height: '50%'}}></div>
            <div className="chart-bar" style={{height: '52%'}}></div>
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Health Tips</h2>
        </div>
        <div className="tips-list">
          {healthTips.map(tip => (
            <div key={tip.id} className="tip-item">
              <div className={`tip-priority ${tip.priority}`}></div>
              <div className="tip-content">
                <div className="tip-header">
                  <span className="tip-category">{tip.category}</span>
                  <h4 className="tip-title">{tip.title}</h4>
                </div>
                <p className="tip-description">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Your Achievements</h2>
          <button className="section-link">View All</button>
        </div>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon-svg">
                {achievement.category === 'consistency' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" fill="currentColor"/>
                  </svg>
                )}
                {achievement.category === 'fitness' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" fill="currentColor"/>
                  </svg>
                )}
                {achievement.category === 'health' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M4.22 11.29l1.42 1.42L7.5 11l-1.86-1.71-1.42 1.42zM20 8.69l-1.41-1.42L16.73 9.1l1.41 1.42L20 8.69zM13 3h-2v3h2V3zm-1 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm-7-5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z" fill="currentColor"/>
                    <circle cx="12" cy="14" r="2" fill="currentColor"/>
                  </svg>
                )}
                {achievement.category === 'checkup' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <h4 className="achievement-title">{achievement.title}</h4>
              <p className="achievement-description">{achievement.description}</p>
              <span className="achievement-date">
                Earned on {new Date(achievement.earnedDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-grid">
        <div className="action-card" onClick={() => openAddModal('appointment')}>
          <div className="action-icon">
            <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop" alt="Book Appointment" />
          </div>
          <h3 className="action-title">Book Appointment</h3>
          <p className="action-description">Schedule with your doctor</p>
        </div>

        <div className="action-card" onClick={() => openAddModal('report')}>
          <div className="action-icon">
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop" alt="Upload Report" />
          </div>
          <h3 className="action-title">Upload Report</h3>
          <p className="action-description">Add lab test results</p>
        </div>

        <div className="action-card" onClick={() => openAddModal('reminder')}>
          <div className="action-icon">
            <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop" alt="Set Reminder" />
          </div>
          <h3 className="action-title">Set Reminder</h3>
          <p className="action-description">Never miss your medicine</p>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add {modalType}</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'medicine' && (
                <form className="add-form">
                  <div className="form-group">
                    <label>Medicine Name</label>
                    <input type="text" placeholder="Enter medicine name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Dosage</label>
                    <input type="text" placeholder="e.g., 500mg" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Frequency</label>
                    <select className="form-input">
                      <option>Once daily</option>
                      <option>Twice daily</option>
                      <option>Three times daily</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" className="form-input" />
                  </div>
                  <button type="submit" className="btn-primary">Add Medicine</button>
                </form>
              )}
              {modalType === 'appointment' && (
                <form className="add-form">
                  <div className="form-group">
                    <label>Select Doctor</label>
                    <select className="form-input">
                      <option>Dr. Priya Sharma</option>
                      <option>Dr. Rajesh Kumar</option>
                      <option>Dr. Anita Patel</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Reason</label>
                    <textarea placeholder="Describe your symptoms..." className="form-input" rows="3"></textarea>
                  </div>
                  <button type="submit" className="btn-primary">Book Appointment</button>
                </form>
              )}
              {modalType === 'report' && (
                <form className="add-form">
                  <div className="form-group">
                    <label>Report Type</label>
                    <select className="form-input">
                      <option>Blood Test</option>
                      <option>X-Ray</option>
                      <option>MRI Scan</option>
                      <option>CT Scan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Upload File</label>
                    <input type="file" className="form-input" accept=".pdf,.jpg,.png" />
                  </div>
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea placeholder="Any additional notes..." className="form-input" rows="3"></textarea>
                  </div>
                  <button type="submit" className="btn-primary">Upload Report</button>
                </form>
              )}
              {modalType === 'reminder' && (
                <form className="add-form">
                  <div className="form-group">
                    <label>Reminder For</label>
                    <input type="text" placeholder="e.g., Take Medicine" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Date & Time</label>
                    <input type="datetime-local" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Repeat</label>
                    <select className="form-input">
                      <option>Never</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary">Set Reminder</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
