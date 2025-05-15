import { useState } from 'react';

const OnlineConsultation = ({ doctorId }) => {
  const [question, setQuestion] = useState('');
  const [consultations, setConsultations] = useState([]);

  const handleSubmitQuestion = async () => {
    try {
      const response = await api.submitConsultation(doctorId, { question });
      if (response.data.success) {
        setConsultations([...consultations, response.data.consultation]);
        setQuestion('');
      }
    } catch (error) {
      if (error.response?.data?.error === 'LIMIT_EXCEEDED') {
        alert('Doctor has reached maximum consultations for today');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Online Consultation</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-3 border rounded"
        placeholder="Type your medical question here..."
      />
      <button
        onClick={handleSubmitQuestion}
        className="mt-2 bg-primary text-white px-6 py-2 rounded"
      >
        Submit Question
      </button>
    </div>
  );
};

export default OnlineConsultation;
