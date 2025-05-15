import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 max-w-[1200px] mx-auto">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MediConnect
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
