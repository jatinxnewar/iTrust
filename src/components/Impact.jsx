import React from 'react';

const Impact = () => {
  const stats = [
    { value: '50K+', label: 'Active Users', icon: '👥' },
    { value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
    { value: '1M+', label: 'Health Insights', icon: '📊' },
    { value: '24/7', label: 'AI Monitoring', icon: '🤖' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      text: 'iTrust has transformed how I manage my health. The AI predictions caught early warning signs that my regular checkups missed!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Business Executive',
      text: 'Having a dedicated doctor and 24/7 monitoring gives me peace of mind. The nutrition tracking is incredibly accurate.',
      rating: 5,
    },
    {
      name: 'Dr. Emily Parker',
      role: 'Medical Professional',
      text: 'As a doctor, I appreciate the comprehensive data iTrust provides. It enables more informed medical decisions.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4 text-gray-800">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Empowering individuals worldwide with intelligent health management
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">
            Start Your Health Journey Today
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust iTrust for their health management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
