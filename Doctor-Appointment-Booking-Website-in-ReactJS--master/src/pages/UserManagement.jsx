import { useState } from 'react';

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', type: 'Patient', status: 'Active', joinDate: 'May 14, 2025' },
    { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@example.com', type: 'Doctor', status: 'Active', joinDate: 'May 13, 2025' },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
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
                  <td>{user.type}</td>
                  <td>{user.status}</td>
                  <td>{user.joinDate}</td>
                  <td>
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
