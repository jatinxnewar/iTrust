import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing localStorage
 * Provides type-safe storage with automatic serialization
 */
export const useLocalStorage = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Check if window is defined (for SSR compatibility)
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      try {
        return JSON.parse(item);
      } catch (error) {
        console.warn(`Failed to parse localStorage item '${key}':`, error);
        return initialValue;
      }
    } catch (error) {
      console.warn(`Failed to read from localStorage: ${error.message}`);
      return initialValue;
    }
  });

  /**
   * Set value in localStorage
   */
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        if (valueToStore === null || valueToStore === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.warn(`Failed to write to localStorage: ${error.message}`);
    }
  }, [key, storedValue]);

  /**
   * Remove value from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Failed to remove from localStorage: ${error.message}`);
    }
  }, [key, initialValue]);

  /**
   * Clear all localStorage
   */
  const clearAll = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
    } catch (error) {
      console.warn(`Failed to clear localStorage: ${error.message}`);
    }
  }, [initialValue]);

  /**
   * Listen to storage changes in other tabs/windows
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Failed to parse storage change: ${error.message}`);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue, clearAll };
};

/**
 * Custom hook for managing sessionStorage
 */
export const useSessionStorage = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.sessionStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      try {
        return JSON.parse(item);
      } catch (error) {
        console.warn(`Failed to parse sessionStorage item '${key}':`, error);
        return initialValue;
      }
    } catch (error) {
      console.warn(`Failed to read from sessionStorage: ${error.message}`);
      return initialValue;
    }
  });

  /**
   * Set value in sessionStorage
   */
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        if (valueToStore === null || valueToStore === undefined) {
          window.sessionStorage.removeItem(key);
        } else {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.warn(`Failed to write to sessionStorage: ${error.message}`);
    }
  }, [key, storedValue]);

  /**
   * Remove value from sessionStorage
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Failed to remove from sessionStorage: ${error.message}`);
    }
  }, [key, initialValue]);

  /**
   * Clear all sessionStorage
   */
  const clearAll = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        window.sessionStorage.clear();
      }
    } catch (error) {
      console.warn(`Failed to clear sessionStorage: ${error.message}`);
    }
  }, [initialValue]);

  return { value: storedValue, setValue, removeValue, clearAll };
};

export default useLocalStorage;
