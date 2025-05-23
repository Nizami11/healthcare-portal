import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorRegistration from './DoctorRegistration';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle patient registration
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center">Patient Registration</h2>
          <p className="mt-2 text-center text-gray-600">Create your patient account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register as Patient
          </button>
        </form>

        <div className="text-sm text-center">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const handlePatientClick = () => {
    navigate('/register/patient');
  };

  const handleDoctorClick = () => {
    navigate('/register/doctor');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow text-center">
        <h2 className="text-3xl font-bold">Choose Registration Type</h2>
        <div className="space-y-4 mt-8">
          <button
            onClick={handlePatientClick}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register as Patient
          </button>
          <button
            onClick={handleDoctorClick}
            className="w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
          >
            Register as Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
