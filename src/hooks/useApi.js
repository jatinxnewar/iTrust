import { useState, useCallback, useRef, useEffect } from 'react';
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from '../constants/api';

/**
 * Custom hook for handling API calls
 * Provides loading, error, and success states
 * Includes error handling, retry logic, and caching
 */
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const abortControllerRef = useRef(null);
  const cacheRef = useRef({});
  const retryCountRef = useRef(0);

  const {
    method = 'GET',
    body = null,
    headers = {},
    skipCache = false,
    autoFetch = true,
    onSuccess = null,
    onError = null,
    retryAttempts = API_CONFIG.retryAttempts,
    retryDelay = API_CONFIG.retryDelay,
    timeout = API_CONFIG.timeout
  } = options;

  /**
   * Execute API request
   */
  const execute = useCallback(async (customUrl = null, customBody = null) => {
    const requestUrl = customUrl || url;
    const requestBody = customBody || body;

    // Check cache
    if (!skipCache && cacheRef.current[requestUrl] && method === 'GET') {
      const { data: cachedData, timestamp } = cacheRef.current[requestUrl];
      const cacheAge = Date.now() - timestamp;

      if (cacheAge < API_CONFIG.timeout) {
        setData(cachedData);
        setStatus('success');
        return cachedData;
      }
    }

    // Cancel previous request if ongoing
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setStatus('loading');
    setError(null);

    try {
      const fetchOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        signal: abortControllerRef.current.signal,
        timeout
      };

      if (requestBody && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        fetchOptions.body = JSON.stringify(requestBody);
      }

      const response = await fetch(
        `${API_CONFIG.baseURL}${requestUrl}`,
        fetchOptions
      );

      // Handle various HTTP status codes
      if (!response.ok) {
        let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;

        switch (response.status) {
          case HTTP_STATUS.UNAUTHORIZED:
            errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
            // Trigger re-authentication flow here
            break;
          case HTTP_STATUS.FORBIDDEN:
            errorMessage = ERROR_MESSAGES.FORBIDDEN;
            break;
          case HTTP_STATUS.NOT_FOUND:
            errorMessage = ERROR_MESSAGES.NOT_FOUND;
            break;
          case HTTP_STATUS.BAD_REQUEST:
          case HTTP_STATUS.UNPROCESSABLE_ENTITY:
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || ERROR_MESSAGES.VALIDATION_ERROR;
            } catch (e) {
              errorMessage = ERROR_MESSAGES.VALIDATION_ERROR;
            }
            break;
          case HTTP_STATUS.TOO_MANY_REQUESTS:
            errorMessage = 'Too many requests. Please wait before trying again.';
            break;
          case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          case HTTP_STATUS.BAD_GATEWAY:
          case HTTP_STATUS.SERVICE_UNAVAILABLE:
            errorMessage = ERROR_MESSAGES.SERVER_ERROR;
            break;
          default:
            errorMessage = `Error: ${response.status}`;
        }

        // Implement retry logic for server errors
        if (
          [500, 502, 503].includes(response.status) &&
          retryCountRef.current < retryAttempts
        ) {
          retryCountRef.current++;
          await new Promise(resolve => setTimeout(resolve, retryDelay * retryCountRef.current));
          return execute(requestUrl, requestBody);
        }

        throw new Error(errorMessage);
      }

      // Parse response
      let responseData = null;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      }

      // Cache successful GET requests
      if (method === 'GET' && !skipCache) {
        cacheRef.current[requestUrl] = {
          data: responseData,
          timestamp: Date.now()
        };
      }

      setData(responseData);
      setStatus('success');
      retryCountRef.current = 0;

      // Call success callback
      if (onSuccess) {
        onSuccess(responseData);
      }

      return responseData;
    } catch (err) {
      // Skip error handling for aborted requests
      if (err.name === 'AbortError') {
        return null;
      }

      // Handle timeout
      if (err.name === 'TimeoutError') {
        const timeoutError = new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
        setError(timeoutError);
        setStatus('error');

        if (onError) {
          onError(timeoutError);
        }

        return null;
      }

      // Handle network errors
      if (err instanceof TypeError && err.message.includes('fetch')) {
        const networkError = new Error(ERROR_MESSAGES.NETWORK_ERROR);
        setError(networkError);
        setStatus('error');

        if (onError) {
          onError(networkError);
        }

        return null;
      }

      // Handle other errors
      setError(err);
      setStatus('error');

      if (onError) {
        onError(err);
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [url, method, body, headers, skipCache, onSuccess, onError, retryAttempts, retryDelay, timeout]);

  /**
   * Clear cache for a specific URL or all URLs
   */
  const clearCache = useCallback((cacheUrl = null) => {
    if (cacheUrl) {
      delete cacheRef.current[cacheUrl];
    } else {
      cacheRef.current = {};
    }
  }, []);

  /**
   * Refetch data
   */
  const refetch = useCallback(() => {
    clearCache(url);
    return execute(url, body);
  }, [url, body, execute, clearCache]);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
    setStatus('idle');
    retryCountRef.current = 0;
  }, []);

  /**
   * Auto-fetch on mount if specified
   */
  useEffect(() => {
    if (autoFetch && url) {
      execute();
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, autoFetch, execute]);

  return {
    data,
    error,
    isLoading,
    status,
    execute,
    refetch,
    clearCache,
    reset,
    isSuccess: status === 'success',
    isError: status === 'error',
    isIdle: status === 'idle'
  };
};

export default useApi;
