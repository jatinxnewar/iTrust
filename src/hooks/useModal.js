import { useState, useCallback } from 'react';

/**
 * Custom hook for managing modal state
 * @returns {Object} Modal state and handlers
 */
const useModal = (initialType = '') => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(initialType);

  const open = useCallback((type = '') => {
    if (type) setModalType(type);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback((type = '') => {
    if (type) setModalType(type);
    setIsOpen(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsOpen(false);
    setModalType(initialType);
  }, [initialType]);

  return {
    isOpen,
    modalType,
    open,
    close,
    toggle,
    reset,
    setModalType
  };
};

export default useModal;
