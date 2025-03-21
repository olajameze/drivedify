import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-lg">© 2024 DrivEdify. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Contact Support</a>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Registered in England & Wales • Company Number: 12345678
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;