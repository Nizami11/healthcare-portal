import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiCalendarLine, 
  RiQuestionLine, 
  RiUserLine 
} from 'react-icons/ri';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'John Smith', type: 'Regular Checkup', time: '9:00 AM' },
    { id: 2, name: 'Emily Johnson', type: 'Follow-up', time: '10:30 AM' },
    { id: 3, name: 'Michael Brown', type: 'Consultation', time: '2:00 PM' },
  ]);

  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      patient: 'Sarah Davis', 
      date: 'May 14, 2023', 
      question: 'Is it normal to experience dizziness after taking this medication?' 
    },
    { 
      id: 2, 
      patient: 'James Wilson', 
      date: 'May 14, 2023', 
      question: 'How often should I apply the prescribed ointment?' 
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">MediConnect</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/doctor/dashboard" className="flex items-center p-2 bg-blue-50 text-blue-600 rounded">
            <RiDashboardLine className="mr-3" /> Dashboard
          </Link>
          <Link to="/doctor/appointments" className="flex items-center p-2 text-gray-600 hover:bg-gray-50">
            <RiCalendarLine className="mr-3" /> Appointments
          </Link>
          <Link to="/doctor/schedule" className="flex items-center p-2 text-gray-600 hover:bg-gray-50">
            <RiCalendarLine className="mr-3" /> Manage Schedule
          </Link>
          <Link to="/doctor/questions" className="flex items-center p-2 text-gray-600 hover:bg-gray-50">
            <RiQuestionLine className="mr-3" /> Questions
          </Link>
          <Link to="/doctor/profile" className="flex items-center p-2 text-gray-600 hover:bg-gray-50">
            <RiUserLine className="mr-3" /> Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Doctor Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 mb-2">Today's Appointments</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 mb-2">Questions</h3>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 mb-2">Q&A Limit</h3>
            <p className="text-3xl font-bold">2/10</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <h3 className="font-semibold">{apt.name}</h3>
                    <p className="text-sm text-gray-500">{apt.type}</p>
                    <p className="text-sm text-gray-500">Time: {apt.time}</p>
                  </div>
                  <button className="px-4 py-1 bg-blue-600 text-white rounded">
                    Confirm
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Patient Questions</h2>
            <div className="space-y-4">
              {questions.map(q => (
                <div key={q.id} className="p-4 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{q.patient}</h3>
                      <p className="text-sm text-gray-500">Asked on {q.date}</p>
                    </div>
                    <button className="px-4 py-1 bg-blue-600 text-white rounded">
                      Answer
                    </button>
                  </div>
                  <p className="text-gray-600">{q.question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
