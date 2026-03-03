/**
 * Migration Guide: Converting Old Components to New Patterns
 * This guide helps you refactor existing components using the new infrastructure
 */

// ============================================================
// MIGRATION PATTERN 1: API Calls
// ============================================================

/**
 * BEFORE: Using fetch directly
 */
class OldDoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/doctors')
      .then(res => res.json())
      .then(data => this.setState({ doctors: data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const { doctors, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div>
        {doctors.map(doctor => (
          <div key={doctor.id}>{doctor.name}</div>
        ))}
      </div>
    );
  }
}

/**
 * AFTER: Using useApi hook
 */
function NewDoctorList() {
  const { data: doctors, isLoading, error } = useApi('/doctors', {
    autoFetch: true
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {doctors?.map(doctor => (
        <div key={doctor.id}>{doctor.name}</div>
      ))}
    </div>
  );
}

/**
 * Migration Checklist:
 * ✓ Remove componentDidMount or useEffect
 * ✓ Remove useState for data, loading, error
 * ✓ Replace fetch with useApi
 * ✓ Use data, isLoading, error from hook
 * ✓ Delete error handling code (built-in)
 * ✓ Test that it still works
 */

// ============================================================
// MIGRATION PATTERN 2: Form Handling
// ============================================================

/**
 * BEFORE: Manual form state management
 */
function OldLoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be 8+ characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      localStorage.setItem('token', data.token);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      {emailError && <span>{emailError}</span>}
      <input value={password} onChange={e => setPassword(e.target.value)} />
      {passwordError && <span>{passwordError}</span>}
      <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
    </form>
  );
}

/**
 * AFTER: Using useForm hook
 */
function NewLoginForm() {
  const { values, errors, handleSubmit, getFieldProps } = useForm(
    { email: '', password: '' },
    async (values) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      localStorage.setItem('token', data.token);
    }
  );

  const validators = {
    email: required('Email'),
    password: password()
  };

  return (
    <form onSubmit={e => handleSubmit(e, validators)}>
      <input {...getFieldProps('email')} />
      {errors.email && <span>{errors.email}</span>}
      <input {...getFieldProps('password')} />
      {errors.password && <span>{errors.password}</span>}
      <button type="submit">Login</button>
    </form>
  );
}

/**
 * Migration Checklist:
 * ✓ Create validators object from validation utils
 * ✓ Replace useState calls with useForm
 * ✓ Use getFieldProps for input binding
 * ✓ Replace validateForm() with validators object
 * ✓ Pass validators to handleSubmit
 * ✓ Remove manual validation code
 * ✓ Remove manual error state management
 * ✓ Test form validation still works
 */

// ============================================================
// MIGRATION PATTERN 3: Local Storage / Preferences
// ============================================================

/**
 * BEFORE: Manual localStorage
 */
function OldThemeToggle() {
  const [theme, setTheme] = React.useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}

/**
 * AFTER: Using useLocalStorage hook
 */
function NewThemeToggle() {
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}

/**
 * Migration Checklist:
 * ✓ Replace useState and localStorage.getItem/setItem with useLocalStorage
 * ✓ Remove JSON.parse/stringify (handled by hook)
 * ✓ Remove error handling for storage (handled by hook)
 * ✓ Test persistence across page reloads
 */

// ============================================================
// MIGRATION PATTERN 4: Lists with Pagination
// ============================================================

/**
 * BEFORE: Manual pagination
 */
function OldReportsList() {
  const [reports, setReports] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = reports.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  React.useEffect(() => {
    fetch('/api/reports')
      .then(r => r.json())
      .then(data => setReports(data));
  }, []);

  return (
    <div>
      {currentItems.map(report => (
        <div key={report.id}>{report.title}</div>
      ))}

      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

/**
 * AFTER: Using useApi + usePagination
 */
function NewReportsList() {
  const { data: reports } = useApi('/reports', { autoFetch: true });

  const {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage
  } = usePagination(reports, 10);

  return (
    <div>
      {currentItems.map(report => (
        <div key={report.id}>{report.title}</div>
      ))}

      <button onClick={previousPage} disabled={currentPage === 1}>
        Previous
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

/**
 * Migration Checklist:
 * ✓ Replace fetch with useApi
 * ✓ Replace useState pagination with usePagination
 * ✓ Remove totalPages calculation
 * ✓ Remove startIndex/endIndex calculation
 * ✓ Replace goToNextPage/goToPreviousPage with hook methods
 * ✓ Account for loading/error states from useApi
 * ✓ Test pagination works correctly
 */

// ============================================================
// MIGRATION PATTERN 5: Data Formatting
// ============================================================

/**
 * BEFORE: Inline formatting logic
 */
function OldMetricCard() {
  const metric = { value: 12500, date: new Date() };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      <h3>Steps: {formatNumber(metric.value)}</h3>
      <p>On: {formatDate(metric.date)}</p>
    </div>
  );
}

/**
 * AFTER: Using formatter utilities
 */
function NewMetricCard() {
  const metric = { value: 12500, date: new Date() };

  return (
    <div>
      <h3>Steps: {formatNumber(metric.value)}</h3>
      <p>On: {formatDate(metric.date)}</p>
    </div>
  );
}

/**
 * Migration Checklist:
 * ✓ Import formatters from utils/formatters.js
 * ✓ Replace inline formatting functions
 * ✓ Update all components using the same formatters
 * ✓ Test formatting still works correctly
 */

// ============================================================
// MIGRATION PATTERN 6: PropTypes
// ============================================================

/**
 * BEFORE: Inline PropTypes definitions
 */
function OldDoctorCard(props) {
  return <div>{props.name}</div>;
}

OldDoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    specialty: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number
  }).isRequired
};

/**
 * AFTER: Using centralized PropTypes
 */
function NewDoctorCard(props) {
  return <div>{props.doctor.name}</div>;
}

NewDoctorCard.propTypes = {
  doctor: DoctorShape.isRequired
};

/**
 * Migration Checklist:
 * ✓ Find matching shape in types/propTypes.js
 * ✓ Replace inline shape with import
 * ✓ Test that PropTypes validation still works
 * ✓ Update multiple components at once for consistency
 */

// ============================================================
// MIGRATION PATTERN 7: Constants
// ============================================================

/**
 * BEFORE: Hardcoded values
 */
function OldStatusBadge(props) {
  const colors = {
    normal: 'green',
    warning: 'orange',
    critical: 'red'
  };

  const statusLabels = {
    normal: 'Normal',
    warning: 'Warning',
    critical: 'Critical'
  };

  return (
    <span style={{ color: colors[props.status] }}>
      {statusLabels[props.status]}
    </span>
  );
}

/**
 * AFTER: Using constants
 */
import { COLORS } from '../constants/theme';

function NewStatusBadge(props) {
  const STATUS_CONFIG = {
    normal: { color: COLORS.status.normal, label: 'Normal' },
    warning: { color: COLORS.status.warning, label: 'Warning' },
    critical: { color: COLORS.status.critical, label: 'Critical' }
  };

  const config = STATUS_CONFIG[props.status];

  return (
    <span style={{ color: config.color }}>
      {config.label}
    </span>
  );
}

/**
 * Migration Checklist:
 * ✓ Extract hardcoded values to constants file
 * ✓ Use theme constants (COLORS, SPACING, etc.)
 * ✓ Use API_ENDPOINTS instead of hardcoded URLs
 * ✓ Test that component behavior unchanged
 */

// ============================================================
// COMPLETE MIGRATION EXAMPLE
// ============================================================

/**
 * BEFORE: A complete component with old patterns
 */
const OldHealthDashboard = () => {
  const [metrics, setMetrics] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [timeFilter, setTimeFilter] = React.useState('weekly');
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    fetch('http://localhost:3001/api/metrics')
      .then(r => r.json())
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const filteredMetrics = metrics.filter(m => m.period === timeFilter);

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {!loading && (
        <>
          <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button onClick={() => setModalOpen(true)}>Add Metric</button>

          {filteredMetrics.map(metric => (
            <div key={metric.id}>
              <h3>{metric.title}</h3>
              <p>{formatNumber(metric.value)} {metric.unit}</p>
            </div>
          ))}

          {modalOpen && (
            <div>
              <button onClick={() => setModalOpen(false)}>Close</button>
              {/* Modal content */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

/**
 * AFTER: Same component with new patterns
 */
import { useApi } from '../hooks/useApi';
import { useTimeFilter } from '../hooks/useTimeFilter';
import { useModal } from '../hooks/useModal';
import { formatNumber } from '../utils/formatters';

const NewHealthDashboard = () => {
  const { data: metrics, isLoading, error } = useApi('/metrics', {
    autoFetch: true
  });

  const { timeFilter, setTimeFilter } = useTimeFilter();
  const modal = useModal();

  const filteredMetrics = metrics?.filter(m => m.period === timeFilter) || [];

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {!isLoading && (
        <>
          <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button onClick={() => modal.open('ADD_METRIC')}>Add Metric</button>

          {filteredMetrics.map(metric => (
            <div key={metric.id}>
              <h3>{metric.title}</h3>
              <p>{formatNumber(metric.value)} {metric.unit}</p>
            </div>
          ))}

          {modal.isOpen && (
            <div>
              <button onClick={modal.close}>Close</button>
              {/* Modal content */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

/**
 * Migration Summary:
 * ✓ Lines of code: 70 → 50 (-28%)
 * ✓ Complexity: Reduced with hooks
 * ✓ Reusability: Multiple hooks can be reused
 * ✓ Testing: Easier to test individual hooks
 * ✓ Maintenance: Less manual state management
 */

// ============================================================
// MIGRATION CHECKLIST SUMMARY
// ============================================================

/**
 * When migrating a component:
 * 
 * □ Step 1: Identify all state management (useState)
 * □ Step 2: Identify all side effects (useEffect)
 * □ Step 3: Map to appropriate hooks:
 *   □ API calls → useApi
 *   □ Forms → useForm
 *   □ Storage → useLocalStorage/useSessionStorage
 *   □ Lists → usePagination
 *   □ Modals → useModal
 *   □ Time filters → useTimeFilter
 * □ Step 4: Replace hardcoded values with constants
 * □ Step 5: Add PropTypes from types/propTypes.js
 * □ Step 6: Use formatter utilities
 * □ Step 7: Test thoroughly
 * □ Step 8: Remove old code and imports
 * □ Step 9: Commit with clear message
 * □ Step 10: Update documentation
 * 
 * Typical reduction:
 * - Code: 30-50% less
 * - Complexity: Significantly reduced
 * - Maintainability: Much improved
 * - Testability: Much improved
 */

export const MIGRATION_GUIDE = {
  patterns: ['API', 'Forms', 'Storage', 'Lists', 'Formatting', 'PropTypes', 'Constants'],
  benefits: ['Less code', 'Reusability', 'Better errors', 'Easier testing', 'Simpler maintenance'],
  avgReduction: '30-50%'
};
