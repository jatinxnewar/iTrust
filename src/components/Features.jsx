import React from 'react';

const Features = ({ platformFeatures }) => {
  const services = [
    {
      title: "Smart Health Tracking",
      description: "Seamlessly monitor vital parameters through smartwatch integration including heart rate, SPO2, sleep cycles, and daily activity.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "Nutrition Analysis",
      description: "Advanced food intake analysis tracking calories, macros, and micronutrients for optimal dietary planning.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "green"
    },
    {
      title: "Blood Report Integration",
      description: "Upload and analyze blood reports with trend identification and potential health concern alerts.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "red"
    },
    {
      title: "Predictive Health AI",
      description: "Machine learning models predict potential health risks, enabling preventive care and early intervention.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "purple"
    },
    {
      title: "Dedicated Doctor Access",
      description: "Monthly consultations with licensed physicians for personalized medical guidance and professional support.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "indigo"
    },
    {
      title: "Medicine Management",
      description: "Track medications, set reminders, and maintain a comprehensive diary of your treatment regimen.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "orange"
    }
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
    green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-100" },
    red: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-100" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-100" },
    indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-100" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-100" }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Health Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade healthcare solutions powered by advanced analytics and professional medical expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            return (
              <div 
                key={index}
                className={`bg-white border-2 ${colors.border} rounded-xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center ${colors.icon} mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <button className={`mt-6 ${colors.icon} font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all`}>
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
