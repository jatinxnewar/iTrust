import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icons } from '../constants/icons';
import { FILTER_OPTIONS, METRIC_CONFIG, METRIC_DATA, CHART_DATA } from '../constants/dashboard';
import useTimeFilter from '../hooks/useTimeFilter';
import useModal from '../hooks/useModal';
import { formatNumber, formatPercentageChange, formatTimePeriod } from '../utils/formatters';
import { healthTips, achievements } from '../data/mockData';

/**
 * Filter Button Component
 */
const FilterButton = ({ option, isActive, onClick }) => (
  <button
    className={`filter-btn ${isActive ? 'active' : ''}`}
    onClick={onClick}
    aria-pressed={isActive}
  >
    {option.label}
  </button>
);

FilterButton.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

/**
 * Chart Bar Component
 */
const ChartBar = ({ height }) => (
  <div
    className="chart-bar"
    style={{ height: `${height}%` }}
    aria-hidden="true"
  />
);

ChartBar.propTypes = {
  height: PropTypes.number.isRequired
};

/**
 * Metric Card Component
 */
const MetricCard = ({ config, data, chartData, timeFilter }) => {
  const metricData = data[timeFilter];

  return (
    <div className={`metric-card ${config.color}`}>
      <div className="metric-header">
        <div className="metric-icon-wrapper">
          {config.color === 'blue' && Icons.steps}
          {config.color === 'red' && Icons.heart}
          {config.color === 'purple' && Icons.oxygen}
          {config.color === 'orange' && Icons.temperature}
        </div>
        <div>
          <p className="metric-label">{config.label}</p>
          <h3 className="metric-value">
            {formatNumber(metricData[Object.keys(metricData).find(key => metricData[key] === Object.values(metricData)[0])])}
            {config.unit && <span className="metric-unit">{config.unit}</span>}
          </h3>
        </div>
      </div>

      <div className="metric-footer">
        <span className="metric-change positive">{metricData.change}</span>
        <span className="metric-period">
          vs last {formatTimePeriod(timeFilter)}
        </span>
      </div>

      <div className="metric-chart">
        {chartData.map((height, idx) => (
          <ChartBar key={idx} height={height} />
        ))}
      </div>
    </div>
  );
};

MetricCard.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  timeFilter: PropTypes.string.isRequired
};

/**
 * Health Tip Item Component
 */
const HealthTipItem = ({ tip }) => (
  <div className="tip-item">
    <div className={`tip-priority ${tip.priority}`}></div>
    <div className="tip-content">
      <div className="tip-header">
        <span className="tip-category">{tip.category}</span>
        <h4 className="tip-title">{tip.title}</h4>
      </div>
      <p className="tip-description">{tip.description}</p>
    </div>
  </div>
);

HealthTipItem.propTypes = {
  tip: PropTypes.shape({
    id: PropTypes.string,
    priority: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

/**
 * Achievement Card Component
 */
const AchievementCard = ({ achievement }) => (
  <div className="achievement-card">
    <div className="achievement-icon">{achievement.icon || '🏆'}</div>
    <h4 className="achievement-title">{achievement.title}</h4>
    <p className="achievement-description">{achievement.description}</p>
    <p className="achievement-date">{achievement.date}</p>
  </div>
);

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string
  }).isRequired
};

/**
 * Main Dashboard Component
 */
const Dashboard = () => {
  const { timeFilter, setTimeFilter, isActive } = useTimeFilter();
  const modal = useModal();

  const handleFilterClick = useCallback((filterId) => {
    setTimeFilter(filterId);
  }, [setTimeFilter]);

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Health Dashboard</h1>
          <p className="page-subtitle">
            Monitor your health metrics and track your wellness journey
          </p>
        </div>

        {/* Time Filter */}
        <div className="header-actions">
          <div className="time-filter">
            {FILTER_OPTIONS.map(option => (
              <FilterButton
                key={option.id}
                option={option}
                isActive={isActive(option.id)}
                onClick={() => handleFilterClick(option.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Vital Stats Grid */}
      <div className="metrics-grid">
        {Object.entries(METRIC_CONFIG).map(([key, config]) => (
          <MetricCard
            key={key}
            config={config}
            data={METRIC_DATA}
            chartData={CHART_DATA[key]}
            timeFilter={timeFilter}
          />
        ))}
      </div>

      {/* Health Tips Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Health Tips</h2>
        </div>
        <div className="tips-list">
          {healthTips.map(tip => (
            <HealthTipItem key={tip.id} tip={tip} />
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Your Achievements</h2>
          <button className="section-link">View All</button>
        </div>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
