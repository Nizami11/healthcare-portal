import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { userType } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded credentials for testing
    if (userType === 'patient' && 
        credentials.email === 'patient@mediconnect.com' && 
        credentials.password === 'patient123') {
      login({ id: '3', email: credentials.email }, 'patient');
      navigate('/patient/dashboard');
    } else if (userType === 'doctor' && 
        credentials.email === 'doctor@mediconnect.com' && 
        credentials.password === 'doctor123') {
      login({ id: '2', email: credentials.email }, 'doctor');
      navigate('/doctor/dashboard');
    } else if (userType === 'admin' && 
        credentials.email === 'admin@mediconnect.com' && 
        credentials.password === 'admin123') {
      login({ id: '1', email: credentials.email }, 'admin');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. For patient testing use: patient@mediconnect.com / patient123');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center capitalize">
          {userType} Login
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
          </div>
          <div>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
