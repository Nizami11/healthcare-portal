import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const RegistrationSuccess = ({ userType }) => {
  const messages = {
    doctor: {
      title: "Doctor Registration Submitted",
      description: "Thank you for registering as a doctor on MediConnect. Your application has been received and is currently under review.",
      steps: [
        "Our team will verify your credentials and documents",
        "This process typically takes 2-3 business days",
        "You'll receive an email notification once your account is approved",
        "After approval, you can log in and set up your profile"
      ]
    },
    patient: {
      title: "Registration Successful",
      description: "Thank you for joining MediConnect. Your patient account has been created successfully.",
      steps: [
        "You can now log in to your account",
        "Search for doctors and book appointments",
        "Ask health-related questions",
        "Manage your medical records"
      ]
    }
  };

  const content = messages[userType];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
        <FaCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
        <p className="text-gray-600 mb-2">{content.description}</p>
        
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">What happens next?</h3>
          <ul className="text-gray-600 space-y-2 mb-6">
            {content.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <Link
          to={`/login/${userType}`}
          className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center"
        >
          Proceed to Login
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
