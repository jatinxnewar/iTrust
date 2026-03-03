import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icons } from '../constants/icons';

/**
 * Navigation Items Configuration
 */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard },
  { id: 'reports', label: 'Reports', icon: Icons.reports },
  { id: 'consultations', label: 'Consultations', icon: Icons.consultations },
  { id: 'ai-prediction', label: 'AI Health', icon: Icons.aiHealth },
  { id: 'nutrition', label: 'Nutrition', icon: Icons.nutrition },
  { id: 'emedicines', label: 'E-Medicines', icon: Icons.medicines }
];

/**
 * Dropdown Menu Section Component
 */
const DropdownItem = ({ icon, label, onClick }) => (
  <div className="dropdown-item" onClick={onClick}>
    {icon}
    <span>{label}</span>
  </div>
);

DropdownItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

/**
 * User Dropdown Menu Component
 */
const UserDropdown = ({ user, onNavigate, onLogout, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="user-dropdown">
      <div className="dropdown-header">
        <p className="dropdown-user-name">{user?.name || 'Arjun Mehta'}</p>
        <p className="dropdown-user-email">{user?.email || 'arjun.mehta@example.com'}</p>
      </div>
      <div className="dropdown-divider"></div>

      <DropdownItem
        icon={Icons.profile}
        label="Profile"
        onClick={() => onNavigate('profile')}
      />
      <DropdownItem
        icon={Icons.settings}
        label="Settings"
        onClick={() => onNavigate('account')}
      />

      <div className="dropdown-divider"></div>

      <DropdownItem
        icon={Icons.logout}
        label="Logout"
        onClick={onLogout}
      />
    </div>
  );
};

UserDropdown.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  onNavigate: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

/**
 * Navigation Link Component
 */
const NavLink = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`nav-link ${isActive ? 'active' : ''}`}
    aria-current={isActive ? 'page' : undefined}
  >
    <span className="nav-icon">{item.icon}</span>
    {item.label}
  </button>
);

NavLink.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

/**
 * Main Navigation Component
 */
const Navigation = ({ currentPage, setCurrentPage, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNavigation = useCallback((page) => {
    setCurrentPage(page);
    setShowUserMenu(false);
  }, [setCurrentPage]);

  const handleUserMenuToggle = useCallback(() => {
    setShowUserMenu(prev => !prev);
  }, []);

  const handleNotificationClick = useCallback(() => {
    handleNavigation('notifications');
  }, [handleNavigation]);

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {/* Brand Logo */}
        <div className="nav-brand">
          <div className="brand-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2563eb"/>
              <path d="M16 8v16M8 16h16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="brand-name">iTrust Health</span>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              onClick={() => handleNavigation(item.id)}
            />
          ))}
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Notification Button */}
          <button
            className="notification-btn"
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            {Icons.notification}
            <span className="notification-badge">3</span>
          </button>

          {/* User Menu */}
          <div className="user-menu-container">
            <button
              className="user-avatar"
              onClick={handleUserMenuToggle}
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMale&backgroundColor=2563eb&mouth=serious"
                alt={user?.name || 'User avatar'}
              />
            </button>
            <UserDropdown
              user={user}
              onNavigate={handleNavigation}
              onLogout={onLogout}
              isOpen={showUserMenu}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired
};

Navigation.defaultProps = {
  user: null
};

export default Navigation;
