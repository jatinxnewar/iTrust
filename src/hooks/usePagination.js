import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing pagination
 * Provides page navigation and utility functions
 */
export const usePagination = (items = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!items || items.length === 0) return 1;
    return Math.ceil(items.length / itemsPerPage);
  }, [items, itemsPerPage]);

  // Get current page items
  const currentItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  /**
   * Navigate to specific page
   */
  const goToPage = useCallback((page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  /**
   * Go to previous page
   */
  const previousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  /**
   * Go to first page
   */
  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  /**
   * Go to last page
   */
  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  /**
   * Reset pagination
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  /**
   * Get page numbers to display (with ellipsis support)
   */
  const getPageNumbers = useCallback((maxButtons = 7) => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust start page if near end
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Add first page and ellipsis
    if (startPage > 1) {
      pages.push({ number: 1, isEllipsis: false });
      if (startPage > 2) {
        pages.push({ number: null, isEllipsis: true });
      }
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push({ number: i, isEllipsis: false });
    }

    // Add last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push({ number: null, isEllipsis: true });
      }
      pages.push({ number: totalPages, isEllipsis: false });
    }

    return pages;
  }, [currentPage, totalPages]);

  /**
   * Get pagination info
   */
  const getPaginationInfo = useCallback(() => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, items.length);

    return {
      currentPage,
      totalPages,
      totalItems: items.length,
      itemsPerPage,
      startItem,
      endItem,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === totalPages
    };
  }, [currentPage, totalPages, itemsPerPage, items.length]);

  return {
    // State
    currentPage,
    totalPages,
    currentItems,

    // Methods
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    getPageNumbers,
    getPaginationInfo,

    // Computed
    ...getPaginationInfo()
  };
};

export default usePagination;
