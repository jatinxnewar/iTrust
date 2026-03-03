/**
 * Form validation utilities
 * Reusable validation functions for common fields
 */

// Email regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone regex pattern (international format)
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;

// Password regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// URL regex pattern
const URL_REGEX = /^https?:\/\/.+/;

// Credit card regex (Luhn algorithm)
const CARD_REGEX = /^\d{13,19}$/;

/**
 * Validate required field
 */
export const required = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate email format
 */
export const email = (value) => {
  if (!value) return null;

  if (!EMAIL_REGEX.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Validate minimum length
 */
export const minLength = (length, fieldName = 'This field') => {
  return (value) => {
    if (!value) return null;

    if (value.length < length) {
      return `${fieldName} must be at least ${length} characters`;
    }
    return null;
  };
};

/**
 * Validate maximum length
 */
export const maxLength = (length, fieldName = 'This field') => {
  return (value) => {
    if (!value) return null;

    if (value.length > length) {
      return `${fieldName} must be at most ${length} characters`;
    }
    return null;
  };
};

/**
 * Validate length range
 */
export const lengthRange = (min, max, fieldName = 'This field') => {
  return (value) => {
    if (!value) return null;

    if (value.length < min || value.length > max) {
      return `${fieldName} must be between ${min} and ${max} characters`;
    }
    return null;
  };
};

/**
 * Validate number range
 */
export const numberRange = (min, max, fieldName = 'This field') => {
  return (value) => {
    if (value === null || value === '') return null;

    const num = Number(value);

    if (isNaN(num) || num < min || num > max) {
      return `${fieldName} must be between ${min} and ${max}`;
    }
    return null;
  };
};

/**
 * Validate phone number format
 */
export const phone = (value) => {
  if (!value) return null;

  // Remove all non-digit characters
  const cleanPhone = value.replace(/\D/g, '');

  if (cleanPhone.length < 10) {
    return 'Please enter a valid phone number';
  }

  if (!PHONE_REGEX.test(value)) {
    return 'Phone number format is invalid';
  }

  return null;
};

/**
 * Validate password strength
 */
export const password = (value) => {
  if (!value) return null;

  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }

  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/\d/.test(value)) {
    return 'Password must contain at least one number';
  }

  if (!/[@$!%*?&]/.test(value)) {
    return 'Password must contain at least one special character (@$!%*?&)';
  }

  return null;
};

/**
 * Validate password confirmation
 */
export const passwordMatch = (passwordFieldName = 'password') => {
  return (value, formValues) => {
    if (!value) return null;

    if (value !== formValues[passwordFieldName]) {
      return 'Passwords do not match';
    }
    return null;
  };
};

/**
 * Validate URL format
 */
export const url = (value) => {
  if (!value) return null;

  if (!URL_REGEX.test(value)) {
    return 'Please enter a valid URL starting with http:// or https://';
  }
  return null;
};

/**
 * Validate credit card number (basic check + Luhn algorithm)
 */
export const creditCard = (value) => {
  if (!value) return null;

  const cardNumber = value.replace(/\s/g, '');

  if (!CARD_REGEX.test(cardNumber)) {
    return 'Please enter a valid credit card number';
  }

  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return 'Credit card number is invalid';
  }

  return null;
};

/**
 * Validate date format (YYYY-MM-DD)
 */
export const dateFormat = (value) => {
  if (!value) return null;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(value)) {
    return 'Date must be in YYYY-MM-DD format';
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return 'Please enter a valid date';
  }

  return null;
};

/**
 * Validate date is in the future
 */
export const futureDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  const now = new Date();

  if (date <= now) {
    return 'Date must be in the future';
  }

  return null;
};

/**
 * Validate date is in the past
 */
export const pastDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  const now = new Date();

  if (date >= now) {
    return 'Date must be in the past';
  }

  return null;
};

/**
 * Validate age (must be at least specified years old)
 */
export const minAge = (minimumAge) => {
  return (value) => {
    if (!value) return null;

    const birthDate = new Date(value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < minimumAge) {
      return `You must be at least ${minimumAge} years old`;
    }

    return null;
  };
};

/**
 * Custom validator
 */
export const custom = (validatorFn, errorMessage = 'Invalid value') => {
  return (value) => {
    if (!value) return null;

    const isValid = validatorFn(value);

    if (!isValid) {
      return errorMessage;
    }

    return null;
  };
};

/**
 * Validate field is unique (async)
 */
export const unique = async (value, checkFn) => {
  if (!value) return null;

  const isUnique = await checkFn(value);

  if (!isUnique) {
    return 'This value is already taken';
  }

  return null;
};

/**
 * Combine multiple validators
 */
export const compose = (...validators) => {
  return (value, formValues = {}) => {
    for (const validator of validators) {
      const error = validator(value, formValues);
      if (error) {
        return error;
      }
    }
    return null;
  };
};

/**
 * Common validation presets
 */
export const validationPresets = {
  email: compose(required('Email'), email()),
  password: compose(required('Password'), password()),
  phone: compose(required('Phone'), phone()),
  url: compose(required('URL'), url()),
  username: compose(required('Username'), lengthRange(3, 20, 'Username')),
  name: compose(required('Name'), minLength(2, 'Name')),
  creditCard: compose(required('Card number'), creditCard()),
  dateOfBirth: compose(required('Date of birth'), dateFormat(), pastDate())
};

export default {
  required,
  email,
  minLength,
  maxLength,
  lengthRange,
  numberRange,
  phone,
  password,
  passwordMatch,
  url,
  creditCard,
  dateFormat,
  futureDate,
  pastDate,
  minAge,
  custom,
  unique,
  compose,
  validationPresets
};
