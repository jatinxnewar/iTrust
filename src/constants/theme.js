/**
 * Color and styling constants
 * Centralized design system tokens for consistent theming
 */

// Primary color palette
export const COLORS = {
  // Primary colors
  primary: '#2563eb',
  secondary: '#7c3aed',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#06b6d4',

  // Neutral colors
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },

  // Status colors
  status: {
    normal: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
    info: '#06b6d4'
  },

  // Metric colors
  metric: {
    steps: '#3b82f6',
    heartRate: '#ef4444',
    spo2: '#a855f7',
    temperature: '#f97316'
  },

  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
    dark: '#1f2937'
  }
};

// Spacing scale (in rem)
export const SPACING = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem'
};

// Border radius scale
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
};

// Font sizes
export const FONT_SIZE = {
  xs: {
    size: '0.75rem',
    lineHeight: '1rem'
  },
  sm: {
    size: '0.875rem',
    lineHeight: '1.25rem'
  },
  base: {
    size: '1rem',
    lineHeight: '1.5rem'
  },
  lg: {
    size: '1.125rem',
    lineHeight: '1.75rem'
  },
  xl: {
    size: '1.25rem',
    lineHeight: '1.75rem'
  },
  '2xl': {
    size: '1.5rem',
    lineHeight: '2rem'
  },
  '3xl': {
    size: '1.875rem',
    lineHeight: '2.25rem'
  },
  '4xl': {
    size: '2.25rem',
    lineHeight: '2.5rem'
  }
};

// Font weights
export const FONT_WEIGHT = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
};

// Shadow definitions
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
};

// Transition definitions
export const TRANSITIONS = {
  fast: '0.15s ease-in-out',
  base: '0.2s ease-in-out',
  slow: '0.3s ease-in-out',
  slower: '0.5s ease-in-out'
};

// Z-index scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  offcanvas: 1050,
  modal: 1060,
  popover: 1070,
  tooltip: 1080,
  notification: 1090
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Button size variants
export const BUTTON_SIZES = {
  sm: {
    padding: `${SPACING[2]} ${SPACING[3]}`,
    fontSize: FONT_SIZE.sm.size,
    height: '32px'
  },
  md: {
    padding: `${SPACING[2]} ${SPACING[4]}`,
    fontSize: FONT_SIZE.base.size,
    height: '40px'
  },
  lg: {
    padding: `${SPACING[3]} ${SPACING[5]}`,
    fontSize: FONT_SIZE.lg.size,
    height: '48px'
  },
  xl: {
    padding: `${SPACING[4]} ${SPACING[6]}`,
    fontSize: FONT_SIZE.xl.size,
    height: '56px'
  }
};

// Component variant styles
export const VARIANTS = {
  primary: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderColor: COLORS.primary
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    borderColor: COLORS.secondary
  },
  danger: {
    backgroundColor: COLORS.danger,
    color: COLORS.white,
    borderColor: COLORS.danger
  },
  success: {
    backgroundColor: COLORS.success,
    color: COLORS.white,
    borderColor: COLORS.success
  },
  warning: {
    backgroundColor: COLORS.warning,
    color: COLORS.white,
    borderColor: COLORS.warning
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
    color: COLORS.primary
  },
  ghost: {
    backgroundColor: 'transparent',
    color: COLORS.primary
  }
};

// Opacity scale
export const OPACITY = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1'
};

export default {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SHADOWS,
  TRANSITIONS,
  Z_INDEX,
  BREAKPOINTS,
  BUTTON_SIZES,
  VARIANTS,
  OPACITY
};
