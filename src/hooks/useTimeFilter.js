import { useState, useCallback } from 'react';

/**
 * Custom hook for managing time filter state
 * Useful for dashboard and report pages
 */
const useTimeFilter = (initialFilter = 'weekly') => {
  const [timeFilter, setTimeFilter] = useState(initialFilter);

  const updateFilter = useCallback((newFilter) => {
    setTimeFilter(newFilter);
  }, []);

  const isActive = useCallback((filter) => {
    return timeFilter === filter;
  }, [timeFilter]);

  const getFilterLabel = useCallback(() => {
    const labels = {
      weekly: 'Week',
      monthly: 'Month',
      yearly: 'Year'
    };
    return labels[timeFilter] || timeFilter;
  }, [timeFilter]);

  return {
    timeFilter,
    setTimeFilter: updateFilter,
    isActive,
    getFilterLabel
  };
};

export default useTimeFilter;
