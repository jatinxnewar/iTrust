import React, { useState } from 'react';

const HealthStatusGrid = ({ healthMetrics }) => {
  const MetricCard = ({ title, value, unit, status, icon, chart, trend, details, color }) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const colorClasses = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
      red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
      orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" }
    }[color];

    return (
      <div 
        className={`bg-white border-2 ${colorClasses.border} rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer`}
        onClick={() => setShowDetails(!showDetails)}
      >
        {!showDetails ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center ${colorClasses.text}`}>
                {icon}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === 'Normal' || status === 'Good' || status === 'Optimal' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {status}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-gray-900">{value}</span>
              <span className="text-lg text-gray-500">{unit}</span>
            </div>
            {chart && (
              <div className="h-16 flex items-end gap-1">
                {chart.map((val, idx) => (
                  <div 
                    key={idx} 
                    className={`flex-1 ${colorClasses.bg} rounded-t`}
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            )}
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">Tap for details</span>
              <span className={`font-semibold ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {trend > 0 ? '↑' : trend < 0 ? '↓' : '−'} {Math.abs(trend)}%
              </span>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">{title} Details</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {details.map((detail, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">{detail.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const metrics = [
    {
      title: "Daily Steps",
      value: healthMetrics.steps.current.toLocaleString(),
      unit: "steps",
      status: "Good",
      color: "blue",
      trend: 12,
      chart: [45, 67, 52, 78, 85, 72, 90, 67, 82, 95, 88, 75],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      details: [
        { label: "Goal Progress", value: `${Math.round((healthMetrics.steps.current / healthMetrics.steps.goal) * 100)}%` },
        { label: "Weekly Average", value: "7,845 steps" },
        { label: "Calories Burned", value: "342 kcal" },
        { label: "Distance", value: "6.8 km" }
      ]
    },
    {
      title: "Heart Rate",
      value: healthMetrics.heartRate.current,
      unit: "BPM",
      status: "Normal",
      color: "red",
      trend: -3,
      chart: [65, 72, 68, 75, 70, 73, 69, 74, 71, 68, 72, 70],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
        </svg>
      ),
      details: [
        { label: "Resting HR", value: "68 BPM" },
        { label: "Max Today", value: "125 BPM" },
        { label: "Recovery Time", value: "< 2 min" },
        { label: "Variability", value: "45 ms" }
      ]
    },
    {
      title: "Blood Oxygen",
      value: healthMetrics.spo2.current,
      unit: "%",
      status: "Optimal",
      color: "purple",
      trend: 0,
      chart: [96, 97, 98, 97, 98, 98, 97, 98, 99, 98, 97, 98],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        { label: "24h Average", value: "97%" },
        { label: "Minimum", value: "95%" },
        { label: "Maximum", value: "99%" },
        { label: "Readings", value: "1,440" }
      ]
    },
    {
      title: "Body Temperature",
      value: healthMetrics.bodyTemp.current,
      unit: "°F",
      status: "Normal",
      color: "orange",
      trend: 1,
      chart: [98, 98.2, 98.4, 98.3, 98.6, 98.5, 98.4, 98.6, 98.5, 98.4, 98.6, 98.5],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      details: [
        { label: "Normal Range", value: "97.0-99.0°F" },
        { label: "24h Average", value: "98.4°F" },
        { label: "Morning Temp", value: "97.8°F" },
        { label: "Status", value: "Stable" }
      ]
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Real-Time Health Metrics
            </h2>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Continuous Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">All Normal</div>
              <div className="text-sm text-gray-600 mt-1">Overall Health Status</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5,760</div>
              <div className="text-sm text-gray-600 mt-1">Data Points Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-gray-600 mt-1">Sync Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthStatusGrid;
