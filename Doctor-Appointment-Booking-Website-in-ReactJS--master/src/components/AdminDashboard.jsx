import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    pendingVerifications: 0,
  });

  const [section, setSection] = useState('overview');

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen">
      <aside className="bg-primary text-white p-4">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <button onClick={() => setSection('overview')}>Overview</button>
          <button onClick={() => setSection('doctors')}>Manage Doctors</button>
          <button onClick={() => setSection('patients')}>Manage Patients</button>
          <button onClick={() => setSection('verifications')}>Verifications</button>
        </nav>
      </aside>
      
      <main className="p-6">
        {/* Dynamic content based on selected section */}
      </main>
    </div>
  );
};

export default AdminDashboard;
