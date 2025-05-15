import { useState } from 'react';
import { FaUserMd, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats] = useState({
    totalUsers: 248,
    userGrowth: '12%',
    pendingVerifications: 2,
    appointments: 43,
    appointmentGrowth: '8%'
  });

  const [pendingDoctors] = useState([
    { name: 'Dr. Thomas Wilson', specialty: 'Neurology', date: 'May 13, 2025' },
    { name: 'Dr. Jennifer Lee', specialty: 'Psychiatry', date: 'May 12, 2025' }
  ]);

  const [recentUsers] = useState([
    { name: 'John Smith', type: 'Patient', date: 'May 14, 2025', status: 'Active' },
    { name: 'Dr. Sarah Johnson', type: 'Doctor', date: 'May 13, 2025', status: 'Active' },
    { name: 'Emily Davis', type: 'Patient', date: 'May 12, 2025', status: 'Active' },
    { name: 'Dr. Michael Brown', type: 'Doctor', date: 'May 11, 2025', status: 'Active' }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', type: 'Patient', status: 'Active', joinDate: 'May 14, 2025' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@example.com', type: 'Doctor', status: 'Active', joinDate: 'May 13, 2025' },
    { id: 3, name: 'Emily Davis', email: 'emily.davis@example.com', type: 'Patient', status: 'Active', joinDate: 'May 12, 2025' },
    { id: 4, name: 'Dr. Michael Brown', email: 'michael.brown@example.com', type: 'Doctor', status: 'Active', joinDate: 'May 11, 2025' },
    { id: 5, name: 'James Wilson', email: 'james.wilson@example.com', type: 'Patient', status: 'Suspended', joinDate: 'May 10, 2025' },
    { id: 6, name: 'Dr. Lisa Moore', email: 'lisa.moore@example.com', type: 'Doctor', status: 'Inactive', joinDate: 'May 9, 2025' },
    { id: 7, name: 'Robert Taylor', email: 'robert.taylor@example.com', type: 'Admin', status: 'Active', joinDate: 'May 8, 2025' },
  ]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">MediConnect</h1>
        </div>
        <nav className="p-4 space-y-2">
          {['dashboard', 'users', 'verification', 'settings'].map(section => (
            <button
              key={section}
              onClick={() => handleSectionChange(section)}
              className={`flex items-center p-2 w-full text-left ${
                activeSection === section ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              } rounded`}
            >
              {section === 'users' && <FaUsers className="mr-3" />}
              {section === 'verification' && <FaUserMd className="mr-3" />}
              {section === 'settings' && <FaCalendarAlt className="mr-3" />}
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeSection === 'dashboard' && (
          <>
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Total Users</h3>
                <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                <p className="text-sm text-green-500">↑ {stats.userGrowth} from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Doctor Verifications</h3>
                <p className="text-3xl font-bold mt-2">{stats.pendingVerifications}</p>
                <p className="text-sm">Pending verification requests</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Appointments</h3>
                <p className="text-3xl font-bold mt-2">{stats.appointments}</p>
                <p className="text-sm text-green-500">↑ {stats.appointmentGrowth} from last week</p>
              </div>
            </div>

            {/* Pending Verifications Table */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Pending Doctor Verifications</h2>
                  <button className="text-blue-600 hover:text-blue-800">View All</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2">Name</th>
                      <th>Specialty</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingDoctors.map((doctor, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-3">{doctor.name}</td>
                        <td>{doctor.specialty}</td>
                        <td>{doctor.date}</td>
                        <td>
                          <button className="text-blue-600 hover:text-blue-800">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Users Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Users</h2>
                  <button className="text-blue-600 hover:text-blue-800">View All</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2">Name</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-3">{user.name}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.type === 'Doctor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.type}
                          </span>
                        </td>
                        <td>{user.date}</td>
                        <td>
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeSection === 'users' && (
          <>
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Join Date</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3">{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.type === 'Doctor' ? 'bg-blue-100 text-blue-800' :
                            user.type === 'Admin' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.type}
                          </span>
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td>{user.joinDate}</td>
                        <td className="space-x-2">
                          <button 
                            onClick={() => handleStatusChange(user.id, user.status === 'Active' ? 'Suspended' : 'Active')}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {user.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
