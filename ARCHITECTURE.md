# iTrust Application - Code Architecture & Patterns

This document outlines the refactored architecture, custom hooks, utilities, and best practices used throughout the iTrust health application.

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [Custom Hooks](#custom-hooks)
3. [Utilities & Helpers](#utilities--helpers)
4. [Constants & Configuration](#constants--configuration)
5. [Component Patterns](#component-patterns)
6. [Styling System](#styling-system)
7. [Best Practices](#best-practices)

---

## Directory Structure

```
src/
├── components/          # Reusable React components
├── pages/              # Page-level components (routes)
├── hooks/              # Custom React hooks
├── utils/              # Utility and helper functions
├── constants/          # Application constants and configuration
├── types/              # PropTypes and type definitions
├── data/               # Mock data and seed data
├── App.js              # Root application component
└── index.js            # Application entry point
```

---

## Custom Hooks

### `useApi(url, options)`

Handles API calls with built-in error handling, retry logic, caching, and common HTTP patterns.

**File:** `src/hooks/useApi.js`

**Features:**
- Automatic retry on server errors (configurable)
- Request/response caching
- Timeout handling
- AbortController for cleanup
- Success/error callbacks
- Multiple status states (idle, loading, success, error)

**Usage Example:**

```jsx
import { useApi } from '../hooks/useApi';

function DoctorsList() {
  const { data, isLoading, error, refetch } = useApi('/doctors', {
    autoFetch: true,
    retryAttempts: 3
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

**API:**
- `data`: Response data from API
- `error`: Error object if request failed
- `isLoading`: Boolean indicating loading state
- `status`: Current status (idle, loading, success, error)
- `execute(url, body)`: Manually execute API call
- `refetch()`: Refetch with same parameters
- `clearCache(url)`: Clear cache for specific or all URLs
- `reset()`: Reset hook to initial state
- `isSuccess`, `isError`, `isIdle`: Computed booleans

---

### `useForm(initialValues, onSubmit)`

Manages form state, validation, and submission logic.

**File:** `src/hooks/useForm.js`

**Features:**
- Form state management
- Field-level validation
- Touched state tracking
- Submit handling
- Form reset capabilities
- Helper methods for common operations

**Usage Example:**

```jsx
import { useForm } from '../hooks/useForm';
import { required, email, password } from '../utils/validation';

function LoginForm() {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '', password: '' },
    async (values) => {
      await api.post('/auth/login', values);
    }
  );

  const validate = {
    email: required('Email'),
    password: required('Password')
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, validate)}>
      <input
        {...getFieldProps('email')}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        {...getFieldProps('password')}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

**API:**
- `values`: Current form values object
- `errors`: Field errors object
- `touched`: Which fields have been touched
- `isSubmitting`: Boolean during submission
- `submitError`: Overall form submission error
- `handleChange(e)`: Input change handler
- `handleBlur(e)`: Input blur handler
- `handleSubmit(e, validators)`: Form submission handler
- `getFieldProps(name)`: Returns value, onChange, onBlur for input binding
- `getFieldState(name)`: Returns {value, error, touched, hasError}
- `setFieldValue(name, value)`: Update single field
- `setFieldError(name, error)`: Set field error
- `resetForm()`: Reset to initial state
- `validate(validators)`: Run validation with custom validators

---

### `useLocalStorage(key, initialValue)` / `useSessionStorage(key, initialValue)`

Persists state to browser storage with automatic serialization.

**File:** `src/hooks/useLocalStorage.js`

**Features:**
- Automatic JSON serialization
- SSR-safe implementation
- Cross-tab synchronization (localStorage)
- Error handling
- Type-safe storage

**Usage Example:**

```jsx
import { useLocalStorage } from '../hooks/useLocalStorage';

function UserPreferences() {
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme: {theme}
    </button>
  );
}
```

**API:**
- `value`: Currently stored value
- `setValue(newValue | fn)`: Set value (supports updater function)
- `removeValue()`: Remove from storage
- `clearAll()`: Clear all storage

---

### `usePagination(items, itemsPerPage)`

Manages pagination state and provides navigation utilities.

**File:** `src/hooks/usePagination.js`

**Features:**
- Page navigation methods
- Automatic total page calculation
- Pagination info
- Page number generation with ellipsis
- First/last page shortcuts

**Usage Example:**

```jsx
import { usePagination } from '../hooks/usePagination';

function ReportsList({ reports }) {
  const {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    getPageNumbers
  } = usePagination(reports, 10);

  return (
    <div>
      {currentItems.map(report => (
        <ReportCard key={report.id} report={report} />
      ))}

      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => page.number && goToPage(page.number)}
            disabled={page.isEllipsis}
          >
            {page.isEllipsis ? '...' : page.number}
          </button>
        ))}

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
```

**API:**
- `currentPage`: Current page number
- `totalPages`: Total number of pages
- `currentItems`: Array of items for current page
- `goToPage(page)`: Jump to specific page
- `nextPage()`: Move to next page
- `previousPage()`: Move to previous page
- `goToFirstPage()`: Go to first page
- `goToLastPage()`: Go to last page
- `getPageNumbers(maxButtons)`: Get page numbers for pagination UI
- Pagination info object with hasNextPage, hasPreviousPage, etc.

---

### `useModal()`

Manages modal state and provides show/hide utilities.

**File:** `src/hooks/useModal.js`

**Features:**
- Modal open/close state
- Modal type tracking
- Utility methods for common operations

**Usage Example:**

```jsx
import { useModal } from '../hooks/useModal';

function Dashboard() {
  const modal = useModal();

  return (
    <div>
      <button onClick={() => modal.open('ADD_MEDICINE')}>
        Add Medicine
      </button>

      {modal.isOpen && (
        <Modal
          type={modal.modalType}
          onClose={modal.close}
        />
      )}
    </div>
  );
}
```

**API:**
- `isOpen`: Boolean indicating modal open state
- `modalType`: Current modal type
- `open(type)`: Open modal with specific type
- `close()`: Close modal
- `toggle()`: Toggle modal state
- `reset()`: Reset to initial state
- `setModalType(type)`: Set modal type

---

### `useTimeFilter()`

Manages time period selection (weekly, monthly, yearly).

**File:** `src/hooks/useTimeFilter.js`

**Features:**
- Time period state management
- Helper methods for period checking and labels
- Optimized with useCallback

**Usage Example:**

```jsx
import { useTimeFilter } from '../hooks/useTimeFilter';

function HealthMetrics() {
  const { timeFilter, setTimeFilter, isActive, getFilterLabel } = useTimeFilter();

  return (
    <div>
      <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <p>Showing {getFilterLabel()} data</p>
    </div>
  );
}
```

---

## Utilities & Helpers

### `formatters.js`

Data formatting utilities for consistent presentation across the app.

**File:** `src/utils/formatters.js`

**Available Functions:**

```javascript
import {
  formatNumber,           // 12500 → "12,500"
  formatPercentageChange, // 5 → "+5%"
  formatDate,            // Date → "Jan 15, 2026"
  formatTime,            // Date → "2:30 PM"
  formatPhone,           // "1234567890" → "(123) 456-7890"
  capitalize,            // "hello" → "Hello"
  isValidEmail,          // Boolean validation
  getInitials,           // "John Doe" → "JD"
  truncateText,          // Limit string with ellipsis
  formatBytes,           // 1536000 → "1.5 MB"
  getStatusColorClasses, // Status → {bg, text} CSS classes
  formatTimePeriod       // 'weekly' → 'This Week'
} from '../utils/formatters';
```

---

### `validation.js`

Form validation utilities for use with `useForm` hook.

**File:** `src/utils/validation.js`

**Available Validators:**

```javascript
import {
  required,             // Field is required
  email,               // Valid email format
  minLength,           // Minimum string length
  maxLength,           // Maximum string length
  lengthRange,         // String length between min/max
  numberRange,         // Number between min/max
  phone,               // Valid phone format
  password,            // Strong password requirements
  passwordMatch,       // Password confirmation match
  url,                 // Valid URL format
  creditCard,          // Valid credit card (Luhn algorithm)
  dateFormat,          // Date in YYYY-MM-DD format
  futureDate,          // Date is in the future
  pastDate,            // Date is in the past
  minAge,              // Minimum age requirement
  custom,              // Custom validation function
  compose              // Combine multiple validators
} from '../utils/validation';
```

**Usage Examples:**

```javascript
// Single validator
const ageValidator = minAge(18);
// Returns error: "You must be at least 18 years old"

// Composed validators
const emailValidator = compose(
  required('Email'),
  email()
);

// In useForm
const { handleSubmit } = useForm(initialValues, onSubmit);
handleSubmit(event, {
  email: required('Email'),
  password: compose(required('Password'), password()),
  confirmPassword: passwordMatch('password'),
  age: minAge(18)
});
```

---

## Constants & Configuration

### `theme.js`

Design system tokens for consistent theming.

**File:** `src/constants/theme.js`

**Includes:**
- Color palette (primary, secondary, status, metrics)
- Spacing scale (0-32rem)
- Border radius values
- Font sizes and weights
- Shadow definitions
- Transitions
- Z-index scale
- Breakpoints
- Button size variants
- Component variants (primary, secondary, danger, etc.)

**Usage:**

```javascript
import { COLORS, SPACING, SHADOWS } from '../constants/theme';

// In component styles
const style = {
  backgroundColor: COLORS.primary,
  padding: SPACING[4],
  boxShadow: SHADOWS.lg
};
```

---

### `api.js`

API configuration and endpoint definitions.

**File:** `src/constants/api.js`

**Includes:**
- API base URL and configuration
- Endpoint definitions (auth, user, metrics, reports, etc.)
- HTTP status codes
- Error messages
- Rate limiting config
- Pagination defaults
- Cache configuration

**Usage:**

```javascript
import { API_ENDPOINTS, API_CONFIG } from '../constants/api';

// Use endpoints
const response = await fetch(
  `${API_CONFIG.baseURL}${API_ENDPOINTS.doctors.list}`
);
```

---

### `dashboard.js`

Dashboard-specific configuration and mock data.

**File:** `src/constants/dashboard.js`

**Includes:**
- Time filter options
- Metric data and configurations
- Chart data
- Modal types
- Filter button options

---

### `types/propTypes.js`

Reusable PropTypes shape definitions.

**File:** `src/types/propTypes.js`

**Available Shapes:**
- UserShape
- HealthMetricShape
- AppointmentShape
- ReportShape
- NotificationShape
- DoctorShape
- MedicineShape
- NavItemShape
- ModalConfigShape
- AchievementShape
- HealthTipShape
- ActivityLogShape
- ApiResponseShape

**Usage:**

```jsx
import PropTypes from 'prop-types';
import { DoctorShape } from '../types/propTypes';

function DoctorCard({ doctor }) {
  return <div>{doctor.name}</div>;
}

DoctorCard.propTypes = {
  doctor: DoctorShape.isRequired
};
```

---

## Component Patterns

### Pattern 1: Container + Presentational Components

Separate data/logic from presentation:

```jsx
// Container (Dashboard.jsx)
function Dashboard() {
  const { data, isLoading } = useApi('/metrics');
  const { timeFilter, setTimeFilter } = useTimeFilter();

  return (
    <DashboardView
      data={data}
      isLoading={isLoading}
      timeFilter={timeFilter}
      onFilterChange={setTimeFilter}
    />
  );
}

// Presentational (DashboardView.jsx or inline)
function DashboardView({ data, isLoading, timeFilter, onFilterChange }) {
  return (
    <div>
      <TimeFilterSelect value={timeFilter} onChange={onFilterChange} />
      {isLoading ? <Spinner /> : <MetricsGrid metrics={data} />}
    </div>
  );
}
```

### Pattern 2: Extract Sub-components

Break large components into smaller, focused components:

```jsx
// Instead of one large component
function DashboardPage() {
  // ... 300+ lines of code
}

// Create smaller components
const FilterButton = ({ ... }) => { ... };
const MetricCard = ({ ... }) => { ... };
const HealthTipItem = ({ ... }) => { ... };
const AchievementCard = ({ ... }) => { ... };

function DashboardPage() {
  return (
    <>
      <div className="filters">
        <FilterButton />
      </div>
      <div className="metrics">
        <MetricCard />
      </div>
    </>
  );
}
```

### Pattern 3: Props Validation

Always add PropTypes to components:

```jsx
function HealthMetricCard({ title, value, unit, icon, status, trend, onClick }) {
  return (
    <div onClick={onClick}>
      {icon}
      <h3>{title}</h3>
      <p>{value} {unit}</p>
      {trend && <Badge trend={trend} />}
    </div>
  );
}

HealthMetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  icon: PropTypes.node,
  status: PropTypes.oneOf(['normal', 'warning', 'critical', 'info']),
  trend: PropTypes.string,
  onClick: PropTypes.func
};

HealthMetricCard.defaultProps = {
  status: 'normal',
  onClick: () => {}
};
```

### Pattern 4: Configuration-Driven Components

Use constants to drive component behavior:

```jsx
// Constants
const METRIC_CONFIG = {
  steps: { color: 'blue', unit: 'steps', label: 'Steps' },
  heartRate: { color: 'red', unit: 'bpm', label: 'Heart Rate' }
};

// Component
function MetricCard({ metricType, value }) {
  const config = METRIC_CONFIG[metricType];

  return (
    <div className={`metric metric-${config.color}`}>
      <p>{config.label}</p>
      <p>{value} {config.unit}</p>
    </div>
  );
}
```

---

## Styling System

### CSS Organization

- **Custom Properties:** Define in CSS root or use `COLORS`, `SPACING`, etc. from theme.js
- **Utility Classes:** Use pre-defined utility classes from App.css
- **Component Styles:** BEM or inline styles for component-specific styling
- **Responsive Design:** Use breakpoints from `BREAKPOINTS` constant

### CSS Variables Usage

```css
:root {
  --color-primary: #2563eb;
  --spacing-md: 1rem;
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --transition-base: 0.2s ease-in-out;
}

.element {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
}
```

### Using Theme Constants in JS

```jsx
import { COLORS, SPACING, SHADOWS } from '../constants/theme';

function StyledComponent() {
  return (
    <div
      style={{
        backgroundColor: COLORS.primary,
        padding: SPACING[4],
        boxShadow: SHADOWS.lg
      }}
    >
      Content
    </div>
  );
}
```

---

## Best Practices

### 1. **Use Custom Hooks for Logic**
- Extract complex state logic into custom hooks
- Keep components focused on rendering
- Example: `useApi` for data fetching, `useForm` for form handling

### 2. **Centralize Configuration**
- Store constants in appropriate files
- Use configuration objects instead of hardcoded values
- Makes changes easier across the entire application

### 3. **PropTypes for Type Safety**
- Define PropTypes for all components
- Use shape definitions from `types/propTypes.js`
- Helps catch bugs early and documents component expectations

### 4. **Error Handling**
- Use try-catch in async functions
- Handle API errors appropriately in useApi
- Show user-friendly error messages
- Log errors for debugging

### 5. **Performance Optimization**
- Use `useCallback` for event handlers in hooks
- Memoize expensive computations with `useMemo`
- Split large components into smaller ones
- Use lazy loading for routes

### 6. **Code Organization**
- One component per file (except sub-components)
- Keep files under 200 lines when possible
- Use descriptive file names
- Group related files in folders

### 7. **Naming Conventions**
- Components: PascalCase (Dashboard.jsx)
- Hooks: camelCase with 'use' prefix (useApi.js)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS)
- Functions/variables: camelCase (formatNumber)

### 8. **Documentation**
- Add JSDoc comments to hooks and utilities
- Document complex logic with inline comments
- Keep README updated with new patterns/hooks

### 9. **Testing**
- Write unit tests for utilities and hooks
- Test component rendering and interactions
- Use mock data for testing

### 10. **Git Workflow**
- Create feature branches for new features
- Commit frequently with descriptive messages
- Use hooks consistently across the app

---

## File Structure Summary

```
src/
├── components/
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   ├── HealthMetricCard.jsx
│   └── ... (other components)
├── pages/
│   ├── Dashboard.jsx
│   ├── Reports.jsx
│   └── ... (page components)
├── hooks/
│   ├── useApi.js
│   ├── useForm.js
│   ├── useLocalStorage.js
│   ├── usePagination.js
│   ├── useModal.js
│   └── useTimeFilter.js
├── utils/
│   ├── formatters.js
│   └── validation.js
├── constants/
│   ├── theme.js
│   ├── api.js
│   ├── dashboard.js
│   ├── icons.jsx
│   └── ... (other constants)
├── types/
│   └── propTypes.js
├── data/
│   └── mockData.js
├── App.js
├── App.css
└── index.js
```

---

## Getting Started

1. **Review the custom hooks** before building features
2. **Check constants files** for existing configurations
3. **Use validation utilities** in forms
4. **Follow component patterns** for consistency
5. **Reference theme constants** for styling

---

*Last Updated: 2026*
*Maintained by: Development Team*
