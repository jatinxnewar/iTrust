import PropTypes from 'prop-types';

/**
 * Common PropTypes definitions
 * Centralizes reusable prop type definitions to reduce duplication
 */

// User shape
export const UserShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string
});

// Health metric shape
export const HealthMetricShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  status: PropTypes.oneOf(['normal', 'warning', 'critical', 'info']),
  trend: PropTypes.string,
  icon: PropTypes.node
});

// Appointment shape
export const AppointmentShape = PropTypes.shape({
  id: PropTypes.string,
  doctorName: PropTypes.string,
  specialty: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  type: PropTypes.oneOf(['virtual', 'in-person'])
});

// Report shape
export const ReportShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.oneOf(['completed', 'pending', 'failed']),
  icon: PropTypes.node
});

// Notification shape
export const NotificationShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  timestamp: PropTypes.string,
  read: PropTypes.bool
});

// Doctor shape
export const DoctorShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  credentials: PropTypes.string,
  specialty: PropTypes.string,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  available: PropTypes.bool,
  image: PropTypes.string
});

// Medicine shape
export const MedicineShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  manufacturer: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  originalPrice: PropTypes.number,
  rating: PropTypes.number,
  inStock: PropTypes.bool,
  requiresPrescription: PropTypes.bool
});

// Navigation item shape
export const NavItemShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  href: PropTypes.string,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

// Modal configuration shape
export const ModalConfigShape = PropTypes.shape({
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
});

// Filter option shape
export const FilterOptionShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

// Achievement shape
export const AchievementShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.string
});

// Health tip shape
export const HealthTipShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  priority: PropTypes.oneOf(['high', 'medium', 'low'])
});

// Activity log shape
export const ActivityLogShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  timestamp: PropTypes.string,
  status: PropTypes.oneOf(['completed', 'pending', 'scheduled', 'reviewed'])
});

// Common callback shapes
export const OnClickHandler = PropTypes.func;
export const OnChangeHandler = PropTypes.func;
export const OnSubmitHandler = PropTypes.func;
export const OnSelectHandler = PropTypes.func;

// API response shape
export const ApiResponseShape = PropTypes.shape({
  status: PropTypes.oneOf(['success', 'error', 'loading']),
  data: PropTypes.any,
  error: PropTypes.shape({
    message: PropTypes.string,
    code: PropTypes.string
  }),
  isLoading: PropTypes.bool
});

export default {
  UserShape,
  HealthMetricShape,
  AppointmentShape,
  ReportShape,
  NotificationShape,
  DoctorShape,
  MedicineShape,
  NavItemShape,
  ModalConfigShape,
  FilterOptionShape,
  AchievementShape,
  HealthTipShape,
  ActivityLogShape,
  OnClickHandler,
  OnChangeHandler,
  OnSubmitHandler,
  OnSelectHandler,
  ApiResponseShape
};
