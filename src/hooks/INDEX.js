/**
 * Hooks Index: Complete reference of all custom hooks
 * This file is for documentation and discovery purposes
 */

/**
 * 1. useApi(url, options)
 * Location: src/hooks/useApi.js
 * Purpose: Handle API calls with error handling, retry logic, and caching
 * 
 * Features:
 * - Automatic retry on server errors
 * - Request/response caching
 * - Timeout handling
 * - AbortController for cleanup
 * - Success/error callbacks
 * - Multiple status states
 * 
 * Returns:
 * {
 *   data,                // API response data
 *   error,               // Error object if failed
 *   isLoading,          // Boolean
 *   status,             // 'idle' | 'loading' | 'success' | 'error'
 *   execute(url, body),  // Manually execute request
 *   refetch(),          // Refetch with same params
 *   clearCache(url),    // Clear cache
 *   reset(),            // Reset to initial state
 *   isSuccess,          // Computed boolean
 *   isError,            // Computed boolean
 *   isIdle              // Computed boolean
 * }
 * 
 * Example:
 * const { data, error, isLoading, refetch } = useApi('/doctors', {
 *   autoFetch: true,
 *   retryAttempts: 3
 * });
 */

/**
 * 2. useForm(initialValues, onSubmit)
 * Location: src/hooks/useForm.js
 * Purpose: Manage form state, validation, and submission
 * 
 * Features:
 * - Form state management
 * - Field-level validation
 * - Touched state tracking
 * - Submit handling
 * - Form reset capabilities
 * 
 * Returns:
 * {
 *   values,                    // Current form values
 *   errors,                    // Field errors
 *   touched,                   // Which fields touched
 *   isSubmitting,             // Boolean during submission
 *   submitError,              // Overall submission error
 *   handleChange(e),          // Input change handler
 *   handleBlur(e),            // Input blur handler
 *   handleSubmit(e, validators), // Form submit
 *   getFieldProps(name),      // Get input props
 *   getFieldState(name),      // Get field state
 *   setFieldValue(name, val),
 *   setFieldError(name, err),
 *   resetForm(),
 *   validate(validators),
 *   isValid,                  // Computed
 *   isDirty,                  // Computed
 *   isAllTouched              // Computed
 * }
 * 
 * Example:
 * const { values, errors, handleSubmit, getFieldProps } = useForm(
 *   { email: '', password: '' },
 *   async (values) => { await login(values); }
 * );
 */

/**
 * 3. useLocalStorage(key, initialValue)
 * Location: src/hooks/useLocalStorage.js
 * Purpose: Persist state to browser localStorage
 * 
 * Features:
 * - Automatic JSON serialization
 * - SSR-safe implementation
 * - Cross-tab synchronization
 * - Error handling
 * - Type-safe storage
 * 
 * Returns:
 * {
 *   value,                     // Stored value
 *   setValue(newVal | fn),    // Set value
 *   removeValue(),            // Remove from storage
 *   clearAll()                // Clear all storage
 * }
 * 
 * Example:
 * const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');
 */

/**
 * 4. useSessionStorage(key, initialValue)
 * Location: src/hooks/useLocalStorage.js
 * Purpose: Persist state to browser sessionStorage
 * 
 * Features:
 * - Similar to useLocalStorage but for session duration
 * - Cleared when tab closes
 * - Automatic JSON serialization
 * 
 * Returns:
 * Same as useLocalStorage
 * 
 * Example:
 * const { value: token, setValue: setToken } = useSessionStorage('auth-token', null);
 */

/**
 * 5. usePagination(items, itemsPerPage)
 * Location: src/hooks/usePagination.js
 * Purpose: Manage pagination state
 * 
 * Features:
 * - Page navigation methods
 * - Automatic total page calculation
 * - Pagination info
 * - Page number generation with ellipsis
 * 
 * Returns:
 * {
 *   currentPage,             // Current page number
 *   totalPages,              // Total number of pages
 *   currentItems,            // Array of items for current page
 *   goToPage(page),          // Navigate to specific page
 *   nextPage(),              // Go to next page
 *   previousPage(),          // Go to previous page
 *   goToFirstPage(),
 *   goToLastPage(),
 *   resetPagination(),
 *   getPageNumbers(maxButtons), // Array of page objects
 *   getPaginationInfo(),     // Detailed pagination info
 *   hasNextPage,             // Computed
 *   hasPreviousPage,         // Computed
 *   isFirstPage,             // Computed
 *   isLastPage               // Computed
 * }
 * 
 * Example:
 * const { currentItems, nextPage, previousPage, getPageNumbers } = 
 *   usePagination(allReports, 10);
 */

/**
 * 6. useModal()
 * Location: src/hooks/useModal.js
 * Purpose: Manage modal state
 * 
 * Features:
 * - Modal open/close state
 * - Modal type tracking
 * - Utility methods
 * 
 * Returns:
 * {
 *   isOpen,              // Boolean
 *   modalType,           // Current modal type
 *   open(type),          // Open with specific type
 *   close(),             // Close modal
 *   toggle(),            // Toggle open/close
 *   reset(),             // Reset to initial state
 *   setModalType(type)   // Set modal type
 * }
 * 
 * Example:
 * const modal = useModal();
 * <button onClick={() => modal.open('ADD_MEDICINE')}>Add</button>
 * {modal.isOpen && <Modal type={modal.modalType} onClose={modal.close} />}
 */

/**
 * 7. useTimeFilter()
 * Location: src/hooks/useTimeFilter.js
 * Purpose: Manage time period selection
 * 
 * Features:
 * - Time period state
 * - Helper methods
 * - Optimized with useCallback
 * 
 * Returns:
 * {
 *   timeFilter,              // 'weekly' | 'monthly' | 'yearly'
 *   setTimeFilter(period),   // Set time period
 *   isActive(period),        // Check if period is active
 *   getFilterLabel()         // Get human-readable label
 * }
 * 
 * Example:
 * const { timeFilter, setTimeFilter, getFilterLabel } = useTimeFilter();
 */

/**
 * ============================================================
 * UTILITY FUNCTIONS (Not Hooks)
 * ============================================================
 */

/**
 * 8. Validation Utilities
 * Location: src/utils/validation.js
 * Purpose: Form field validation
 * 
 * Available Validators:
 * - required(fieldName)
 * - email()
 * - minLength(length, fieldName)
 * - maxLength(length, fieldName)
 * - lengthRange(min, max, fieldName)
 * - numberRange(min, max, fieldName)
 * - phone()
 * - password()
 * - passwordMatch(passwordFieldName)
 * - url()
 * - creditCard()
 * - dateFormat()
 * - futureDate()
 * - pastDate()
 * - minAge(years)
 * - custom(validatorFn, errorMessage)
 * - unique(value, checkFn) - async
 * - compose(...validators)
 * - validationPresets (pre-composed validators)
 * 
 * Example:
 * import { required, email, password } from '../utils/validation';
 * 
 * handleSubmit(e, {
 *   email: required('Email'),
 *   password: password()
 * });
 */

/**
 * 9. Formatter Utilities
 * Location: src/utils/formatters.js
 * Purpose: Data formatting
 * 
 * Available Functions:
 * - formatNumber(num)              // 12500 → "12,500"
 * - formatPercentageChange(value)  // 5 → "+5%"
 * - formatDate(date)               // → "Jan 15, 2026"
 * - formatTime(date)               // → "2:30 PM"
 * - formatPhone(phone)             // → "(123) 456-7890"
 * - capitalize(text)               // "hello" → "Hello"
 * - isValidEmail(email)            // Boolean
 * - getInitials(name)              // "John Doe" → "JD"
 * - truncateText(text, maxLength)
 * - formatBytes(bytes)             // 1536000 → "1.5 MB"
 * - getStatusColorClasses(status)  // → {bg, text}
 * - formatTimePeriod(period)       // 'weekly' → "This Week"
 * 
 * Example:
 * import { formatNumber, formatDate } from '../utils/formatters';
 * 
 * <p>{formatNumber(user.stepCount)} steps on {formatDate(new Date())}</p>
 */

/**
 * ============================================================
 * CONSTANTS & CONFIGURATION
 * ============================================================
 */

/**
 * 10. Theme Constants
 * Location: src/constants/theme.js
 * Purpose: Design system tokens
 * 
 * Available:
 * - COLORS (primary, secondary, status, metrics, etc.)
 * - SPACING (0-32rem scale)
 * - BORDER_RADIUS (all sizes)
 * - FONT_SIZE (xs to 4xl)
 * - FONT_WEIGHT (light to extrabold)
 * - SHADOWS (sm to 2xl)
 * - TRANSITIONS (fast, base, slow, slower)
 * - Z_INDEX (all layers)
 * - BREAKPOINTS (responsive)
 * - BUTTON_SIZES (sm to xl)
 * - VARIANTS (button and component styles)
 * - OPACITY (0-100)
 * 
 * Example:
 * import { COLORS, SPACING } from '../constants/theme';
 * 
 * const style = {
 *   backgroundColor: COLORS.primary,
 *   padding: SPACING[4]
 * };
 */

/**
 * 11. API Constants
 * Location: src/constants/api.js
 * Purpose: API configuration and endpoints
 * 
 * Available:
 * - API_CONFIG (baseURL, timeout, retry settings)
 * - API_ENDPOINTS (all backend endpoints)
 * - HTTP_STATUS (status codes)
 * - ERROR_MESSAGES (user-friendly messages)
 * - REQUEST_HEADERS (default headers)
 * - CACHE_CONFIG (caching behavior)
 * - PAGINATION (default page, limit)
 * - RATE_LIMIT (request limiting)
 * - QUERY_PARAMS (standard parameter names)
 * 
 * Example:
 * import { API_ENDPOINTS, API_CONFIG } from '../constants/api';
 * 
 * const url = `${API_CONFIG.baseURL}${API_ENDPOINTS.doctors.list}`;
 */

/**
 * 12. Dashboard Constants
 * Location: src/constants/dashboard.js
 * Purpose: Dashboard-specific configuration
 * 
 * Available:
 * - TIME_FILTERS (weekly, monthly, yearly)
 * - METRIC_DATA (sample data)
 * - CHART_DATA (visualization data)
 * - METRIC_CONFIG (metric definitions)
 * - MODAL_TYPES (modal types)
 * - FILTER_OPTIONS (filter buttons)
 */

/**
 * 13. Icon Constants
 * Location: src/constants/icons.jsx
 * Purpose: SVG icon definitions
 * 
 * Available: 20+ icons
 * - Icons.dashboard
 * - Icons.notification
 * - Icons.settings
 * - Icons.heart
 * - Icons.temperature
 * - And many more...
 * 
 * Example:
 * import { Icons } from '../constants/icons';
 * 
 * <button>{Icons.heart} View Reports</button>
 */

/**
 * 14. PropTypes Definitions
 * Location: src/types/propTypes.js
 * Purpose: Reusable PropTypes shapes
 * 
 * Available:
 * - UserShape
 * - HealthMetricShape
 * - DoctorShape
 * - AppointmentShape
 * - ReportShape
 * - NotificationShape
 * - MedicineShape
 * - And more...
 * 
 * Example:
 * import { DoctorShape } from '../types/propTypes';
 * 
 * DoctorCard.propTypes = {
 *   doctor: DoctorShape.isRequired
 * };
 */

/**
 * ============================================================
 * HOOK SELECTION GUIDE
 * ============================================================
 * 
 * Choose based on your need:
 * 
 * For API calls:
 *   → useApi (automatic caching, retry, error handling)
 * 
 * For form handling:
 *   → useForm (state, validation, submit)
 * 
 * For persistence:
 *   → useLocalStorage (across sessions)
 *   → useSessionStorage (current session only)
 * 
 * For lists:
 *   → usePagination (divide into pages)
 * 
 * For modals:
 *   → useModal (open/close state)
 * 
 * For time periods:
 *   → useTimeFilter (weekly/monthly/yearly)
 * 
 * For validation:
 *   → validation utils (with useForm)
 * 
 * For data display:
 *   → formatter utils (format values)
 * 
 * For styling:
 *   → theme constants (colors, spacing, etc.)
 * 
 * For API endpoints:
 *   → api constants (centralized URLs)
 * 
 * For component props:
 *   → propTypes definitions (type safety)
 */

/**
 * ============================================================
 * QUICK START CHECKLIST
 * ============================================================
 * 
 * When creating a new component, consider:
 * 
 * □ Does it need API data? → Use useApi
 * □ Does it have a form? → Use useForm + validation
 * □ Should it remember user preferences? → Use useLocalStorage
 * □ Does it show a list? → Use usePagination
 * □ Does it have a modal? → Use useModal
 * □ Does it select a time period? → Use useTimeFilter
 * □ Does it display numbers/dates? → Use formatters
 * □ Does it need styling? → Use theme constants
 * □ Does it need PropTypes? → Use propTypes definitions
 * 
 * Most new features can be built with 2-3 of these hooks!
 */

export const HOOKS_INDEX = {
  'useApi': {
    file: 'src/hooks/useApi.js',
    purpose: 'API calls with caching and error handling',
    usesIn: ['data fetching', 'CRUD operations']
  },
  'useForm': {
    file: 'src/hooks/useForm.js',
    purpose: 'Form state and validation',
    usesIn: ['login forms', 'signup forms', 'profile updates']
  },
  'useLocalStorage': {
    file: 'src/hooks/useLocalStorage.js',
    purpose: 'Persist state across sessions',
    usesIn: ['theme preferences', 'saved filters', 'user data']
  },
  'useSessionStorage': {
    file: 'src/hooks/useLocalStorage.js',
    purpose: 'Persist state during session',
    usesIn: ['auth tokens', 'temporary data']
  },
  'usePagination': {
    file: 'src/hooks/usePagination.js',
    purpose: 'Manage pagination',
    usesIn: ['lists', 'tables', 'search results']
  },
  'useModal': {
    file: 'src/hooks/useModal.js',
    purpose: 'Modal state management',
    usesIn: ['dialogs', 'modals', 'popups']
  },
  'useTimeFilter': {
    file: 'src/hooks/useTimeFilter.js',
    purpose: 'Time period selection',
    usesIn: ['dashboards', 'analytics', 'reports']
  }
};

export default HOOKS_INDEX;
