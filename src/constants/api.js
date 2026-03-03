/**
 * API configuration and endpoints
 * Centralized API configuration for all backend communication
 */

// API base configuration
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
};

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify: '/auth/verify',
    resetPassword: '/auth/reset-password'
  },

  // User profile
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile/update',
    avatar: '/user/avatar',
    settings: '/user/settings',
    updateSettings: '/user/settings/update'
  },

  // Health metrics
  metrics: {
    list: '/metrics',
    create: '/metrics/create',
    update: '/metrics/:id/update',
    delete: '/metrics/:id/delete',
    history: '/metrics/history',
    latest: '/metrics/latest',
    byType: '/metrics/:type'
  },

  // Reports
  reports: {
    list: '/reports',
    get: '/reports/:id',
    create: '/reports/create',
    delete: '/reports/:id/delete',
    export: '/reports/:id/export'
  },

  // Appointments
  appointments: {
    list: '/appointments',
    create: '/appointments/create',
    get: '/appointments/:id',
    update: '/appointments/:id/update',
    cancel: '/appointments/:id/cancel',
    reschedule: '/appointments/:id/reschedule'
  },

  // Doctors
  doctors: {
    list: '/doctors',
    search: '/doctors/search',
    get: '/doctors/:id',
    availability: '/doctors/:id/availability',
    reviews: '/doctors/:id/reviews'
  },

  // Medicines
  medicines: {
    list: '/medicines',
    search: '/medicines/search',
    get: '/medicines/:id',
    order: '/medicines/order',
    tracking: '/medicines/order/:orderId/tracking'
  },

  // Consultations
  consultations: {
    list: '/consultations',
    create: '/consultations/create',
    get: '/consultations/:id',
    messages: '/consultations/:id/messages',
    sendMessage: '/consultations/:id/messages/send',
    endCall: '/consultations/:id/end'
  },

  // Nutrition
  nutrition: {
    list: '/nutrition',
    create: '/nutrition/create',
    get: '/nutrition/:id',
    recommendations: '/nutrition/recommendations',
    analysis: '/nutrition/analysis'
  },

  // Notifications
  notifications: {
    list: '/notifications',
    markAsRead: '/notifications/:id/read',
    markAllAsRead: '/notifications/read-all',
    delete: '/notifications/:id/delete'
  },

  // Health tips
  tips: {
    list: '/tips',
    search: '/tips/search',
    get: '/tips/:id',
    byCategory: '/tips/category/:category'
  }
};

// HTTP status codes and their meanings
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirection
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // Client error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server error
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again later.',
  UNAUTHORIZED: 'Your session has expired. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
};

// Request headers
export const REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Cache configuration
export const CACHE_CONFIG = {
  enabled: true,
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  endpoints: {
    doctors: 30 * 60 * 1000, // 30 minutes
    medicines: 30 * 60 * 1000, // 30 minutes
    tips: 60 * 60 * 1000, // 1 hour
    metrics: 1 * 60 * 1000 // 1 minute
  }
};

// Pagination defaults
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  defaultSort: 'createdAt',
  defaultOrder: 'desc',
  maxLimit: 100
};

// Rate limiting
export const RATE_LIMIT = {
  enabled: true,
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30 // 30 requests per minute
};

// Query parameter keys
export const QUERY_PARAMS = {
  page: 'page',
  limit: 'limit',
  sort: 'sort',
  order: 'order',
  search: 'search',
  filter: 'filter',
  category: 'category',
  status: 'status',
  date: 'date',
  startDate: 'startDate',
  endDate: 'endDate'
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  REQUEST_HEADERS,
  CACHE_CONFIG,
  PAGINATION,
  RATE_LIMIT,
  QUERY_PARAMS
};
