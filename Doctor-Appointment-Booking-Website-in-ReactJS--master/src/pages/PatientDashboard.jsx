import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaQuestionCircle, FaUserMd, FaUser } from 'react-icons/fa';

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [appointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'May 18, 2023',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: 'May 25, 2023',
      time: '2:30 PM',
      status: 'Pending'
    }
  ]);

  const [questions] = useState([
    {
      id: 1,
      question: 'Is it normal to experience dizziness after taking this medication?',
      to: 'Dr. Sarah Johnson',
      date: 'May 10, 2023',
      status: 'Answered'
    },
    {
      id: 2,
      question: 'How often should I apply the prescribed ointment?',
      to: 'Dr. Michael Chen',
      date: 'May 5, 2023',
      status: 'Answered'
    }
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">MediConnect</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/patient/dashboard" className="flex items-center p-2 bg-blue-50 text-blue-600 rounded">
            <FaUser className="mr-3" /> Dashboard
          </Link>
          <Link to="/patient/appointments" className="flex items-center p-2 text-gray-600 hover:bg-gray-50">
            <FaCalendarAlt className="mr-3" /> Appointments
          </Link>
          <Link to="/patient/find-doctors" className="flex items-center p-2 text-gray-600 hover:bg-gray-50">
            <FaUserMd className="mr-3" /> Find Doctors
          </Link>
          <Link to="/patient/questions" className="flex items-center p-2 text-gray-600 hover:bg-gray-50">
            <FaQuestionCircle className="mr-3" /> Questions
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Patient Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Upcoming Appointments</h3>
            <p className="text-3xl font-bold mt-2">2</p>
            <p className="text-sm text-gray-500">Your scheduled doctor appointments</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Active Questions</h3>
            <p className="text-3xl font-bold mt-2">1</p>
            <p className="text-sm text-gray-500">Questions waiting for answers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Find Doctors</h3>
            <button 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => navigate('/patient/find-doctors')}
            >
              Search Now
            </button>
            <p className="text-sm text-gray-500 mt-2">Search for specialists in your area</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <h3 className="font-semibold">{apt.doctorName}</h3>
                    <p className="text-sm text-gray-500">{apt.specialty}</p>
                    <p className="text-sm text-gray-500">
                      Date: {apt.date}
                      <br />
                      Time: {apt.time}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {apt.status}
                    </span>
                    <button className="block mt-2 text-blue-600 hover:text-blue-800">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Questions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Questions</h2>
            <div className="space-y-4">
              {questions.map(q => (
                <div key={q.id} className="p-4 border rounded">
                  <p className="font-medium mb-2">{q.question}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>To: {q.to}</span>
                    <span>Asked on {q.date}</span>
                  </div>
                  <button className="mt-2 text-blue-600 hover:text-blue-800">View Answer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
