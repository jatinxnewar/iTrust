import React, { useState } from 'react';

const Navigation = ({ currentPage, setCurrentPage, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/></svg>
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/></svg>
    },
    { 
      id: 'consultations', 
      label: 'Consultations', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/></svg>
    }
  ];

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setShowUserMenu(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2563eb"/>
              <path d="M16 8v16M8 16h16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="brand-name">iTrust Health</span>
        </div>

        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className="notification-btn"
            onClick={() => handleNavigation('notifications')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6.68629 2 4 4.68629 4 8V12L2 14V15H18V14L16 12V8C16 4.68629 13.3137 2 10 2Z" fill="currentColor"/>
              <path d="M9 17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17H9Z" fill="currentColor"/>
            </svg>
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu-container">
            <button 
              className="user-avatar"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John&style=circle&backgroundColor=e0e7ff&accessories=prescription02&accessoriesProbability=100&clothing=blazerShirt&clothingColor=3c4f76&eyebrows=default&eyes=default&facialHair=beardMajestic&facialHairColor=4a312c&mouth=smile&top=shortHair&topColor=4a312c" alt="User" />
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <p className="dropdown-user-name">{user?.name || 'Arjun Mehta'}</p>
                  <p className="dropdown-user-email">{user?.email || 'arjun.mehta@example.com'}</p>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={() => handleNavigation('profile')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                  </svg>
                  <span>Profile</span>
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('account')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
                  </svg>
                  <span>Settings</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={onLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                  </svg>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
