import React from 'react';

const HealthMetricCard = ({ title, value, unit, icon, status, trend, onClick }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'normal':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        {trend && (
          <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        {unit && <span className="text-gray-500 text-sm">{unit}</span>}
      </div>
      {status && (
        <p className={`mt-2 text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default HealthMetricCard;
