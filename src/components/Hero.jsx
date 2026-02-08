import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white border-b border-gray-200">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 text-white py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              +1 (555) 123-4567
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              support@itrust.health
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                iT
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">iTrust Health</h1>
                <p className="text-xs text-gray-500">Professional Health Management System</p>
              </div>
            </div>
            <nav className="flex gap-8 items-center">
              <a href="#dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Dashboard</a>
              <a href="#reports" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reports</a>
              <a href="#doctor" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Consultations</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Patient Portal
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              HIPAA Compliant Healthcare Platform
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Health<br/>Monitoring & Analytics
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Enterprise-grade health management platform combining real-time biometric monitoring, 
              predictive analytics, and professional medical consultation services.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl">
                Access Dashboard
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all font-semibold">
                Schedule Consultation
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600 mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600 mt-1">Patients</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Live Health Monitor</h3>
                <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  Active
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Heart Rate</div>
                      <div className="text-2xl font-bold text-gray-900">72 BPM</div>
                    </div>
                  </div>
                  <div className="text-green-600 text-sm font-medium">Normal</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Blood Oxygen</div>
                      <div className="text-2xl font-bold text-gray-900">98%</div>
                    </div>
                  </div>
                  <div className="text-green-600 text-sm font-medium">Optimal</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Daily Steps</div>
                      <div className="text-2xl font-bold text-gray-900">8,547</div>
                    </div>
                  </div>
                  <div className="text-blue-600 text-sm font-medium">85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
