import { useState } from 'react';

const DoctorVerification = () => {
  const [pendingVerifications] = useState([
    { id: 1, name: 'Dr. Thomas Wilson', specialty: 'Neurology', status: 'Pending', documents: ['License', 'Degree'] },
    { id: 2, name: 'Dr. Jennifer Lee', specialty: 'Cardiology', status: 'Pending', documents: ['License', 'Degree'] },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Doctor Verification</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="space-y-4">
            {pendingVerifications.map(doctor => (
              <div key={doctor.id} className="border p-4 rounded">
                <h3 className="font-semibold">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
                <div className="mt-2 space-x-2">
                  <button className="text-green-600">Approve</button>
                  <button className="text-red-600">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorVerification;
