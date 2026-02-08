import React, { useState } from 'react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Vikram Singh is scheduled for tomorrow at 11:00 AM',
      time: '2 hours ago',
      read: false,
      icon: '📅',
      color: '#3b82f6'
    },
    {
      id: 2,
      type: 'report',
      title: 'Lab Report Available',
      message: 'Your Complete Blood Count report is now available for download',
      time: '5 hours ago',
      read: false,
      icon: '📋',
      color: '#10b981'
    },
    {
      id: 3,
      type: 'medicine',
      title: 'Medicine Reminder',
      message: 'Time to take Metformin 500mg - After breakfast',
      time: '8 hours ago',
      read: true,
      icon: '💊',
      color: '#8b5cf6'
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Consultation Completed',
      message: 'Your video consultation with Dr. Priya Sharma has been completed. Prescription uploaded.',
      time: '1 day ago',
      read: true,
      icon: '✅',
      color: '#10b981'
    },
    {
      id: 5,
      type: 'system',
      title: 'Health Tip of the Day',
      message: 'Stay hydrated! Aim for 8 glasses of water daily to maintain optimal body functions.',
      time: '1 day ago',
      read: true,
      icon: '💡',
      color: '#f59e0b'
    },
    {
      id: 6,
      type: 'report',
      title: 'Report Uploaded Successfully',
      message: 'Your Lipid Profile report has been uploaded and is being reviewed by Dr. Rajesh Kumar',
      time: '2 days ago',
      read: true,
      icon: '📤',
      color: '#06b6d4'
    },
    {
      id: 7,
      type: 'medicine',
      title: 'Prescription Renewed',
      message: 'Dr. Anita Patel has renewed your prescription for Lisinopril for 30 days',
      time: '3 days ago',
      read: true,
      icon: '🔄',
      color: '#8b5cf6'
    },
    {
      id: 8,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Sunita Reddy on Feb 1, 2026 has been confirmed',
      time: '1 week ago',
      read: true,
      icon: '✓',
      color: '#10b981'
    }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const markAllRead = () => {
    // Mark all as read logic
  };

  const deleteNotification = (id) => {
    // Delete notification logic
  };

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-header">
          <div>
            <h1 className="page-title">Notifications</h1>
            <p className="page-subtitle">Stay updated with your health activities</p>
          </div>
          <button className="btn-secondary" onClick={markAllRead}>
            Mark all as read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`tab-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({notifications.filter(n => !n.read).length})
          </button>
          <button 
            className={`tab-btn ${filter === 'appointment' ? 'active' : ''}`}
            onClick={() => setFilter('appointment')}
          >
            Appointments
          </button>
          <button 
            className={`tab-btn ${filter === 'report' ? 'active' : ''}`}
            onClick={() => setFilter('report')}
          >
            Reports
          </button>
          <button 
            className={`tab-btn ${filter === 'medicine' ? 'active' : ''}`}
            onClick={() => setFilter('medicine')}
          >
            Medicines
          </button>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="no-notifications">
              <svg className="no-notifications-icon-svg" width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#cbd5e1"/>
              </svg>
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div 
                  className="notification-icon" 
                  style={{ backgroundColor: notification.color + '20', color: notification.color }}
                >
                  {notification.icon}
                </div>
                <div className="notification-content">
                  <div className="notification-header-row">
                    <h4 className="notification-title">{notification.title}</h4>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button className="notification-action-btn" title="Mark as read">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  )}
                  <button 
                    className="notification-action-btn" 
                    title="Delete"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
