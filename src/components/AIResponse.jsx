import React from 'react';

const AIResponse = ({ aiInsights }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      default:
        return '🤖';
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          AI Health Insights
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Predictive analysis and personalized recommendations powered by advanced AI
        </p>
        
        <div className="space-y-6">
          {aiInsights.map((insight, index) => (
            <div 
              key={index}
              className={`border-l-4 ${getPriorityColor(insight.priority)} p-6 rounded-r-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{getTypeIcon(insight.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      insight.priority === 'high' ? 'bg-red-200 text-red-800' :
                      insight.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {insight.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-sm text-gray-500">{insight.date}</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{insight.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">🤖 AI-Powered Predictions</h3>
          <p className="text-lg opacity-90 mb-6">
            Our advanced machine learning models analyze your health data continuously to predict potential risks and provide preventive care recommendations.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
            View Full Analysis
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIResponse;
