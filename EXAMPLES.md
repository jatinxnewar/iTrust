/**
 * Example: Refactoring a Login Form Component
 * Shows how to use custom hooks and validation utilities
 */

import { useForm } from '../hooks/useForm';
import { useApi } from '../hooks/useApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { required, email, password } from '../utils/validation';
import PropTypes from 'prop-types';

// ==================== BEFORE (Old Pattern) ====================
function LoginFormOld() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!re.test(email)) {
      setEmailError('Invalid email');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      // Navigate to dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        {emailError && <span className="error">{emailError}</span>}
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        {passwordError && <span className="error">{passwordError}</span>}
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// ==================== AFTER (New Pattern) ====================
function LoginForm({ onSuccess }) {
  const { value: rememberedEmail, setValue: setRememberedEmail } = useLocalStorage('email', '');
  const { execute: login, isLoading } = useApi('/auth/login', {
    method: 'POST',
    autoFetch: false,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      onSuccess?.(data);
    }
  });

  const { values, errors, handleChange, handleBlur, handleSubmit, getFieldProps } = useForm(
    { email: rememberedEmail, password: '' },
    async (formValues) => {
      await login('/auth/login', formValues);
    }
  );

  const validators = {
    email: required('Email'),
    password: password()
  };

  const handleLoginSubmit = async (e) => {
    const success = await handleSubmit(e, validators);
    if (success) {
      setRememberedEmail(values.email);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="login-form">
      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...getFieldProps('email')}
          onBlur={handleBlur}
          className={errors.email ? 'input-error' : ''}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-error"
        />
        {errors.email && (
          <span id="email-error" className="error-message">
            {errors.email}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...getFieldProps('password')}
          onBlur={handleBlur}
          className={errors.password ? 'input-error' : ''}
          aria-invalid={Boolean(errors.password)}
          aria-describedby="password-error"
        />
        {errors.password && (
          <span id="password-error" className="error-message">
            {errors.password}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary btn-lg"
        aria-busy={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSuccess: null
};

export default LoginForm;

/**
 * Benefits of the new pattern:
 * 
 * 1. **Reduced Code:** 50% less code, more readable
 * 2. **Reusable Logic:** useForm, useApi, useLocalStorage can be used in other components
 * 3. **Better Error Handling:** Built into useApi with retry logic
 * 4. **Validation:** Centralized validators, easier to maintain
 * 5. **Type Safety:** PropTypes validation
 * 6. **Persistence:** Automatic localStorage management
 * 7. **Accessibility:** Proper ARIA attributes
 * 8. **Testing:** Hooks can be tested independently
 * 
 * =====================================================
 */

/**
 * Example 2: Refactoring a Doctor List Component
 * Shows how to use useApi, usePagination, and filtering
 */

import { useApi } from '../hooks/useApi';
import { usePagination } from '../hooks/usePagination';
import { useState } from 'react';
import { DoctorShape } from '../types/propTypes';

function DoctorListComponent({ specialty = null }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch doctors with caching
  const { data: doctors, isLoading, error, refetch } = useApi('/doctors', {
    autoFetch: true,
    retryAttempts: 3
  });

  // Filter doctors
  const filteredDoctors = doctors?.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialty || doctor.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  }) || [];

  // Paginate filtered doctors
  const {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    getPageNumbers
  } = usePagination(filteredDoctors, 6);

  return (
    <div className="doctor-list-container">
      {/* Search Bar */}
      <div className="search-section">
        <input
          type="search"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            goToPage(1); // Reset to first page on search
          }}
          aria-label="Search doctors"
        />
        <button onClick={refetch} aria-label="Refresh doctors list">
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSpinner />}

      {/* Error State */}
      {error && (
        <ErrorAlert
          message={error.message}
          onRetry={refetch}
        />
      )}

      {/* Doctor Grid */}
      {!isLoading && !error && currentItems.length > 0 && (
        <>
          <div className="doctor-grid">
            {currentItems.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Previous
            </button>

            {getPageNumbers(7).map((page, idx) => (
              <button
                key={idx}
                onClick={() => page.number && goToPage(page.number)}
                disabled={page.isEllipsis || page.number === currentPage}
                className={page.number === currentPage ? 'active' : ''}
                aria-label={`Go to page ${page.number}`}
                aria-current={page.number === currentPage ? 'page' : undefined}
              >
                {page.isEllipsis ? '...' : page.number}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>

          <p className="result-count">
            Showing {currentItems.length} results
          </p>
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && currentItems.length === 0 && (
        <EmptyState message="No doctors found matching your criteria" />
      )}
    </div>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card" role="article">
      <img src={doctor.image} alt={doctor.name} />
      <h3>{doctor.name}</h3>
      <p className="specialty">{doctor.specialty}</p>
      <p className="credentials">{doctor.credentials}</p>
      <div className="rating">
        <span className="stars">{'⭐'.repeat(Math.round(doctor.rating))}</span>
        <span className="reviews">({doctor.reviews} reviews)</span>
      </div>
      <button className="btn btn-primary">
        {doctor.available ? 'Book Appointment' : 'Join Waitlist'}
      </button>
    </div>
  );
}

DoctorCard.propTypes = {
  doctor: DoctorShape.isRequired
};

export { DoctorListComponent, DoctorCard };

/**
 * Example 3: Creating a Form with Complex Validation
 * Shows advanced useForm usage with custom validators
 */

import { useForm } from '../hooks/useForm';
import {
  required,
  email,
  phone,
  minAge,
  compose,
  validationPresets
} from '../utils/validation';

function ProfileForm({ onSubmit }) {
  const { values, errors, handleSubmit, getFieldProps, touched, isValid } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      phone: '',
      address: ''
    },
    onSubmit
  );

  const validators = {
    firstName: required('First name'),
    lastName: required('Last name'),
    email: compose(required('Email'), email()),
    dateOfBirth: compose(required('Date of birth'), minAge(18)),
    phone: compose(required('Phone'), phone()),
    address: required('Address')
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, validators)}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            {...getFieldProps('firstName')}
            className={touched.firstName && errors.firstName ? 'input-error' : ''}
          />
          {touched.firstName && errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            {...getFieldProps('lastName')}
            className={touched.lastName && errors.lastName ? 'input-error' : ''}
          />
          {touched.lastName && errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          {...getFieldProps('email')}
          className={touched.email && errors.email ? 'input-error' : ''}
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth *</label>
        <input
          id="dateOfBirth"
          type="date"
          {...getFieldProps('dateOfBirth')}
          className={touched.dateOfBirth && errors.dateOfBirth ? 'input-error' : ''}
        />
        {touched.dateOfBirth && errors.dateOfBirth && (
          <span className="error-message">{errors.dateOfBirth}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          id="phone"
          type="tel"
          {...getFieldProps('phone')}
          placeholder="(123) 456-7890"
          className={touched.phone && errors.phone ? 'input-error' : ''}
        />
        {touched.phone && errors.phone && (
          <span className="error-message">{errors.phone}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address *</label>
        <textarea
          id="address"
          {...getFieldProps('address')}
          className={touched.address && errors.address ? 'input-error' : ''}
          rows={3}
        />
        {touched.address && errors.address && (
          <span className="error-message">{errors.address}</span>
        )}
      </div>

      <button type="submit" disabled={!isValid} className="btn btn-primary btn-lg">
        Save Profile
      </button>
    </form>
  );
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ProfileForm;

/**
 * Example 4: Using Multiple Hooks Together
 * Shows how to combine hooks for a complete feature
 */

function HealthMetricsPage() {
  // Fetch metrics data
  const { data: metrics, isLoading: metricsLoading, error: metricsError, refetch: refetchMetrics } = useApi('/metrics', {
    autoFetch: true
  });

  // Manage time filter
  const { timeFilter, setTimeFilter, getFilterLabel } = useTimeFilter();

  // Manage modal state
  const modal = useModal();

  // Persist user preferences
  const { value: viewMode, setValue: setViewMode } = useLocalStorage('metrics-view', 'grid');

  // Filter data by time period
  const filteredMetrics = metrics?.filter(m => m.period === timeFilter) || [];

  // Paginate if needed
  const { currentItems, ...pagination } = usePagination(filteredMetrics, 6);

  return (
    <div className="health-metrics-page">
      {/* Header with Controls */}
      <div className="page-header">
        <h1>Health Metrics</h1>

        <div className="controls">
          <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>

          <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
            <option value="grid">Grid View</option>
            <option value="list">List View</option>
          </select>

          <button onClick={refetchMetrics}>Refresh</button>

          <button onClick={() => modal.open('ADD_METRIC')} className="btn btn-primary">
            + Add Metric
          </button>
        </div>
      </div>

      {/* Loading State */}
      {metricsLoading && <LoadingSpinner />}

      {/* Error State */}
      {metricsError && <ErrorAlert error={metricsError} onRetry={refetchMetrics} />}

      {/* Content */}
      {!metricsLoading && !metricsError && (
        <>
          <p className="subtitle">Showing {getFilterLabel()} data</p>

          {/* Metrics Grid/List */}
          <div className={`metrics-${viewMode}`}>
            {currentItems.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination {...pagination} />
        </>
      )}

      {/* Modal */}
      {modal.isOpen && (
        <AddMetricModal type={modal.modalType} onClose={modal.close} />
      )}
    </div>
  );
}

export default HealthMetricsPage;

/**
 * Summary of Refactoring Benefits:
 * 
 * 1. DRY (Don't Repeat Yourself)
 *    - Hooks encapsulate logic for reuse
 *    - Validators are centralized and composable
 *    - Constants prevent magic numbers/strings
 * 
 * 2. Maintainability
 *    - Easier to debug (isolated concerns)
 *    - Easier to test (pure functions, hooks)
 *    - Easier to modify (changes in one place)
 * 
 * 3. Readability
 *    - Less code, clearer intent
 *    - Clear separation of concerns
 *    - Better naming and organization
 * 
 * 4. Scalability
 *    - Reusable patterns across app
 *    - Easy to add new features
 *    - Consistent architecture
 * 
 * 5. User Experience
 *    - Better error handling
 *    - Loading states
 *    - Accessibility features
 *    - Persistence
 */
