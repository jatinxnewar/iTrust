import React from 'react';

const NutritionStatus = ({ nutritionStatus }) => {
  const calculatePercentage = (consumed, goal) => {
    return Math.min(Math.round((consumed / goal) * 100), 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Nutrition Status
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          AI-powered analysis of your daily nutritional intake
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(nutritionStatus).map(([key, data]) => {
            const percentage = calculatePercentage(data.consumed, data.goal);
            return (
              <div key={key} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">{key}</h3>
                  <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{data.consumed} {data.unit}</span>
                    <span>{data.goal} {data.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(percentage)} transition-all duration-500 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">
                  {percentage >= 100 ? '✅ Goal achieved!' : `${data.goal - data.consumed} ${data.unit} remaining`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NutritionStatus;
