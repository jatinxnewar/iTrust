import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold mb-4">iTrust</h3>
            <p className="text-gray-400 text-sm">
              AI-powered health management for a healthier tomorrow.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#hipaa" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 iTrust. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#twitter" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">🐦</span>
            </a>
            <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">💼</span>
            </a>
            <a href="#facebook" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">📘</span>
            </a>
            <a href="#instagram" className="text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">📷</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
