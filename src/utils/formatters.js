/**
 * Utility functions for data formatting and manipulation
 */

/**
 * Format large numbers with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  return num.toLocaleString('en-US', {
    maximumFractionDigits: 1
  });
};

/**
 * Format percentage change
 * @param {number} value - The change value
 * @returns {string} Formatted percentage with + or - prefix
 */
export const formatPercentageChange = (value) => {
  if (typeof value !== 'number') return value;
  return value > 0 ? `+${value}%` : `${value}%`;
};

/**
 * Format time period label
 * @param {string} period - The time period (weekly, monthly, yearly)
 * @returns {string} Human readable period
 */
export const formatTimePeriod = (period) => {
  const labels = {
    weekly: 'week',
    monthly: 'month',
    yearly: 'year'
  };
  return labels[period?.toLowerCase()] || period;
};

/**
 * Format date to readable format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format time to HH:MM format
 * @param {Date|string} date - Date/time to format
 * @returns {string} Formatted time
 */
export const formatTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: 'short'
  });
};

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\\D/g, '');
  const match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Get color based on status
 * @param {string} status - Status value (normal, warning, critical, etc.)
 * @returns {Object} Color object with bg and text properties
 */
export const getStatusColorClasses = (status) => {
  const colors = {
    normal: { bg: 'bg-green-50', text: 'text-green-700' },
    warning: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
    critical: { bg: 'bg-red-50', text: 'text-red-700' },
    info: { bg: 'bg-blue-50', text: 'text-blue-700' },
    success: { bg: 'bg-green-50', text: 'text-green-700' }
  };
  return colors[status?.toLowerCase()] || colors.info;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to append
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalize first letter of string
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format bytes to human readable size
 * @param {number} bytes - Size in bytes
 * @returns {string} Human readable size
 */
export const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(n => n.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

export default {
  formatNumber,
  formatPercentageChange,
  formatTimePeriod,
  formatDate,
  formatTime,
  formatPhone,
  getStatusColorClasses,
  truncateText,
  capitalize,
  formatBytes,
  isValidEmail,
  getInitials
};
