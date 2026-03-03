import React from 'react';
import PropTypes from 'prop-types';

/**
 * Status color mapping constants
 */
const STATUS_COLORS = {
  normal: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' },
  warning: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },
  critical: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
  info: { bg: 'rgba(37, 99, 235, 0.1)', text: '#2563eb' }
};

/**
 * Get status color styles
 */
const getStatusColor = (status = 'info') => {
  return STATUS_COLORS[status?.toLowerCase()] || STATUS_COLORS.info;
};

/**
 * Metric Trend Badge Component
 */
const TrendBadge = ({ trend }) => {
  if (!trend) return null;

  const isPositive = trend.startsWith('+');

  return (
    <span className={`text-sm font-medium px-2 py-1 rounded ${
      isPositive
        ? 'bg-green-50 text-green-600'
        : 'bg-red-50 text-red-600'
    }`}>
      {trend}
    </span>
  );
};

TrendBadge.propTypes = {
  trend: PropTypes.string
};

/**
 * Status Badge Component
 */
const StatusBadge = ({ status }) => {
  if (!status) return null;

  const colors = getStatusColor(status);

  return (
    <div
      className="mt-2 text-sm font-medium px-2 py-1 rounded"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {status}
    </div>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string
};

/**
 * Improved Health Metric Card Component
 * Refactored version using custom CSS classes and better organization
 */
const HealthMetricCard = ({
  title,
  value,
  unit,
  icon,
  status,
  trend,
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`metric-card hover-lift transition-slow ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={onClick ? 0 : -1}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Header Section */}
      <div className="metric-header">
        <div className="metric-icon-wrapper">
          {icon}
        </div>
        <div className="flex-1">
          <p className="metric-label">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="metric-value">{typeof value === 'number' ? value.toLocaleString() : value}</h3>
            {unit && <span className="metric-unit">{unit}</span>}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="metric-footer">
        {trend && <TrendBadge trend={trend} />}
        {status && <StatusBadge status={status} />}
      </div>
    </div>
  );
};

HealthMetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  icon: PropTypes.node.isRequired,
  status: PropTypes.oneOf(['normal', 'warning', 'critical', 'info']),
  trend: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

HealthMetricCard.defaultProps = {
  unit: '',
  status: null,
  trend: null,
  onClick: null,
  className: ''
};

export default HealthMetricCard;
