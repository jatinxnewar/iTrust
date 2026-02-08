import React from 'react';

const MedicineDiary = ({ medicineDiary }) => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Medicine Diary
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Track your medications and never miss a dose
        </p>
        
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-8">
          <div className="space-y-4">
            {medicineDiary.map((medicine) => (
              <div 
                key={medicine.id}
                className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
                  medicine.taken ? 'border-green-500' : 'border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      medicine.taken ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {medicine.taken ? '✅' : '💊'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.frequency}</p>
                      <p className="text-xs text-gray-500 mt-1">⏰ {medicine.time}</p>
                    </div>
                  </div>
                  <button 
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      medicine.taken 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                    }`}
                  >
                    {medicine.taken ? 'Taken' : 'Mark as Taken'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
            + Add New Medication
          </button>
        </div>
      </div>
    </section>
  );
};

export default MedicineDiary;
