import React, { useState } from 'react';

const DoctorConsultant = ({ doctorInfo, doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const handleCall = () => {
    setShowCallModal(true);
    setTimeout(() => setShowCallModal(false), 3000);
  };

  const handleChat = () => {
    setShowChatModal(true);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Medical Professionals
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Consult with certified healthcare professionals for personalized medical guidance
        </p>
        
        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="bg-blue-600 p-6 text-white text-center">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                <p className="text-sm opacity-90">{doctor.specialty}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">License</span>
                    <span className="font-semibold text-gray-900">{doctor.license}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-900">{doctor.experience}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Hospital</span>
                    <span className="font-semibold text-gray-900 text-right">{doctor.hospital}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-gray-900">{doctor.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-semibold text-yellow-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {doctor.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-semibold ${doctor.availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                      {doctor.availability}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleBookAppointment(doctor)}
                  disabled={doctor.availability === 'Busy'}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    doctor.availability === 'Available'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {doctor.availability === 'Available' ? 'Book Consultation' : 'Currently Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl animate-slideUp max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Consultation</h3>
                <p className="text-gray-600">Schedule an appointment with {selectedDoctor.name}</p>
              </div>
              <button 
                onClick={() => setShowBooking(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mr-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{selectedDoctor.name}</h4>
                  <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.hospital}, {selectedDoctor.location}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time) => (
                    <button 
                      key={time}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors text-sm font-medium"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Consultation Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Video Call</option>
                  <option>In-Person Visit</option>
                  <option>Phone Call</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Consultation</label>
                <textarea 
                  rows="3"
                  placeholder="Brief description of your health concern..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleCall}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </button>
              <button 
                onClick={handleChat}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start Chat
              </button>
            </div>
            
            <button 
              onClick={() => setShowBooking(false)}
              className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl animate-slideUp">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Connecting...</h3>
              <p className="text-gray-600 mb-4">Calling {selectedDoctor.name}</p>
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl animate-slideUp flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">{selectedDoctor.name}</h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChatModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 shadow max-w-xs">
                    <p className="text-sm text-gray-800">Hello! How can I help you today?</p>
                    <span className="text-xs text-gray-500 mt-1">10:30 AM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 shadow max-w-xs">
                    <p className="text-sm">I'd like to discuss my recent blood test results.</p>
                    <span className="text-xs opacity-75 mt-1">10:31 AM</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 shadow max-w-xs">
                    <p className="text-sm text-gray-800">Of course! Please share your reports and I'll review them.</p>
                    <span className="text-xs text-gray-500 mt-1">10:32 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="border-t p-4 bg-white rounded-b-xl">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorConsultant;
