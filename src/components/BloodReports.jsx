import React from 'react';

const BloodReports = ({ bloodReports }) => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Blood Reports
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Track and analyze your blood test results over time
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bloodReports.map((report) => (
            <div 
              key={report.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{report.month}</p>
                    <h3 className="text-2xl font-bold mt-1">{report.type}</h3>
                  </div>
                  <div className="text-5xl">{report.image}</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    {report.date}
                  </span>
                  <span className="px-3 py-1 bg-green-400 bg-opacity-30 rounded-full text-sm">
                    {report.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Report Details</h4>
                <div className="space-y-3">
                  {Object.entries(report.details).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Normal: {value.normal}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">{value.value}</p>
                        <p className="text-xs text-gray-500">{value.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodReports;
