/**
 * Dashboard Constants and Configuration
 */

/**
 * Time filter options for dashboard
 */
export const TIME_FILTERS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

/**
 * Metric data based on time filter
 */
export const METRIC_DATA = {
  weekly: {
    steps: 8250,
    heartRate: 72,
    spo2: 98,
    temperature: 98.2,
    change: '+5%'
  },
  monthly: {
    steps: 7800,
    heartRate: 74,
    spo2: 97,
    temperature: 98.3,
    change: '+12%'
  },
  yearly: {
    steps: 7200,
    heartRate: 73,
    spo2: 97,
    temperature: 98.4,
    change: '+8%'
  }
};

/**
 * Chart data for metric cards
 */
export const CHART_DATA = {
  steps: [60, 75, 65, 85, 90, 80, 95],
  heartRate: [70, 65, 72, 68, 75, 70, 72],
  spo2: [95, 97, 96, 98, 97, 98, 99],
  temperature: [50, 52, 51, 50, 51, 50, 52]
};

/**
 * Modal types
 */
export const MODAL_TYPES = {
  ADD_MEDICINE: 'medicine',
  ADD_APPOINTMENT: 'appointment',
  ADD_HEALTH_TIP: 'health_tip'
};

/**
 * Dashboard sections configuration
 */
export const DASHBOARD_SECTIONS = {
  VITAL_STATS: 'vital_stats',
  HEALTH_TIPS: 'health_tips',
  ACHIEVEMENTS: 'achievements',
  APPOINTMENTS: 'appointments',
  ACTIVITY: 'activity'
};

/**
 * Metric card colors and icons
 */
export const METRIC_CONFIG = {
  steps: {
    color: 'blue',
    unit: 'steps',
    label: 'Daily Steps',
    status: 'Normal'
  },
  heartRate: {
    color: 'red',
    unit: 'bpm',
    label: 'Heart Rate',
    status: 'Normal range'
  },
  spo2: {
    color: 'purple',
    unit: '%',
    label: 'Blood Oxygen',
    status: 'Excellent'
  },
  temperature: {
    color: 'orange',
    unit: '°F',
    label: 'Temperature',
    status: 'Stable'
  }
};

/**
 * Filter button options
 */
export const FILTER_OPTIONS = [
  { id: TIME_FILTERS.WEEKLY, label: 'Weekly' },
  { id: TIME_FILTERS.MONTHLY, label: 'Monthly' },
  { id: TIME_FILTERS.YEARLY, label: 'Yearly' }
];

export default {
  TIME_FILTERS,
  METRIC_DATA,
  CHART_DATA,
  MODAL_TYPES,
  DASHBOARD_SECTIONS,
  METRIC_CONFIG,
  FILTER_OPTIONS
};
