import { useState, useCallback } from 'react';

/**
 * Custom hook for handling form state and validation
 * Provides form values, error handling, and submission logic
 */
export const useForm = (initialValues = {}, onSubmit = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /**
   * Handle input change
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user modifies field
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  }, [errors]);

  /**
   * Handle field blur
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;

    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
  }, []);

  /**
   * Validate form using custom validators
   */
  const validate = useCallback((validators = {}) => {
    const newErrors = {};

    Object.keys(validators).forEach(fieldName => {
      const validator = validators[fieldName];
      const fieldValue = values[fieldName];

      if (typeof validator === 'function') {
        const error = validator(fieldValue, values);
        if (error) {
          newErrors[fieldName] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e, validators = {}) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate form
    const isValid = validate(validators);

    if (!isValid) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (onSubmit) {
        await onSubmit(values);
      }
      return true;
    } catch (error) {
      setSubmitError(error.message || 'Form submission failed');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  /**
   * Set field value programmatically
   */
  const setFieldValue = useCallback((name, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }, []);

  /**
   * Set field error programmatically
   */
  const setFieldError = useCallback((name, error) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  }, []);

  /**
   * Set multiple field errors
   */
  const setFieldErrors = useCallback((newErrors) => {
    setErrors(newErrors);
  }, []);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError(null);
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Reset form to custom values
   */
  const resetFormValues = useCallback((newValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  }, []);

  /**
   * Get field props for binding to input elements
   */
  const getFieldProps = useCallback((name) => {
    return {
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur
    };
  }, [values, handleChange, handleBlur]);

  /**
   * Get field state (value, error, touched)
   */
  const getFieldState = useCallback((name) => {
    return {
      value: values[name] || '',
      error: errors[name],
      touched: touched[name] || false,
      hasError: touched[name] && Boolean(errors[name])
    };
  }, [values, errors, touched]);

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    submitError,

    // Methods
    handleChange,
    handleBlur,
    handleSubmit,
    validate,
    setFieldValue,
    setFieldError,
    setFieldErrors,
    resetForm,
    resetFormValues,
    getFieldProps,
    getFieldState,

    // Computed
    isValid: Object.keys(errors).length === 0,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialValues),
    isAllTouched: Object.keys(values).every(key => touched[key])
  };
};

export default useForm;
