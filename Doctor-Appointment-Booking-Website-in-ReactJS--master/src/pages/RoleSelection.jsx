import { Link } from 'react-router-dom';
import { FaUser, FaUserMd, FaUserCog } from 'react-icons/fa';

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2">Welcome to MediConnect</h1>
      <p className="text-gray-600 mb-8">Please select your role to continue</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {/* Patient Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Patient</h2>
          <p className="text-gray-600 mb-4">Find doctors and book appointments</p>
          <div className="space-x-2">
            <Link to="/login/patient" className="text-blue-600 px-4 py-2 border border-blue-600 rounded">
              Login
            </Link>
            <Link to="/register/patient" className="bg-blue-600 text-white px-4 py-2 rounded">
              Register
            </Link>
          </div>
        </div>

        {/* Doctor Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserMd className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Doctor</h2>
          <p className="text-gray-600 mb-4">Manage your practice and patients</p>
          <div className="space-x-2">
            <Link to="/login/doctor" className="text-blue-600 px-4 py-2 border border-blue-600 rounded">
              Login
            </Link>
            <Link to="/register/doctor" className="bg-blue-600 text-white px-4 py-2 rounded">
              Register
            </Link>
          </div>
        </div>

        {/* Admin Card */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserCog className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Admin</h2>
          <p className="text-gray-600 mb-4">Manage the MediConnect platform</p>
          <Link 
            to="/admin/login" 
            className="bg-blue-600 text-white px-8 py-2 rounded block w-32 mx-auto"
          >
            Admin Login
          </Link>
        </div>
      </div>

      <Link to="/" className="text-blue-600 mt-8 hover:underline">
        Return to Home
      </Link>
    </div>
  );
};

export default RoleSelection;
