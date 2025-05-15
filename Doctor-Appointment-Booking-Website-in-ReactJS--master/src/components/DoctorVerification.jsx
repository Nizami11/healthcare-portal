import { useState } from 'react';
import { api } from '../services/api';

const DoctorVerification = () => {
  const [documents, setDocuments] = useState({
    medicalLicense: null,
    degrees: [],
    identityProof: null
  });

  const handleFileUpload = (type, files) => {
    if (type === 'degrees') {
      setDocuments(prev => ({
        ...prev,
        [type]: [...prev[type], ...files]
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [type]: files[0]
      }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(documents).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(file => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await api.verifyDoctor(localStorage.getItem('userId'), formData);
      alert('Documents submitted for verification');
    } catch (error) {
      alert('Failed to submit documents');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Doctor Verification</h2>
      {/* Document upload fields */}
    </div>
  );
};

export default DoctorVerification;
