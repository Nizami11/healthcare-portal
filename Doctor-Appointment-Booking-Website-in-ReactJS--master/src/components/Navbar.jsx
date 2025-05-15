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
          
          <Link 
            to="/select-role" 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login / Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
