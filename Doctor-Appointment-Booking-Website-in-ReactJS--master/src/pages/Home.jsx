import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen pt-16"> {/* Added padding-top to account for fixed navbar */}
      <main className="max-w-6xl mx-auto text-center py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Made Simple</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with doctors, schedule appointments, and manage your health with ease.
          MediConnect brings healthcare professionals and patients together on one platform.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Link to="/register/patient" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md">
            Register as Patient
          </Link>
          <Link to="/register/doctor" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md">
            Register as Doctor
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="far fa-calendar text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
            <p className="text-gray-600">Book appointments with your preferred doctors in just a few clicks.</p>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="far fa-comments text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
            <p className="text-gray-600">Ask questions and get answers from healthcare professionals.</p>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="far fa-file-alt text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Records</h3>
            <p className="text-gray-600">Keep all your medical information securely in one place.</p>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-600">
        © 2023 MediConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
