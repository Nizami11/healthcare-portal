import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${userType === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setUserType('patient')}
          >
            Patient
          </button>
          <button
            className={`px-4 py-2 rounded ${userType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setUserType('doctor')}
          >
            Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border rounded"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
