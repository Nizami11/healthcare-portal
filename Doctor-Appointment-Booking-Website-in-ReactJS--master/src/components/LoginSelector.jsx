import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSelector = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');

    const handleSelection = (type) => {
        setSelectedType(type);
        navigate(`/login/${type}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Select Login Type</h1>
            <div className="space-y-4">
                <button
                    onClick={() => handleSelection('patient')}
                    className="w-64 p-4 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Patient Login
                </button>
                <button
                    onClick={() => handleSelection('doctor')}
                    className="w-64 p-4 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Doctor Login
                </button>
                <button
                    onClick={() => handleSelection('admin')}
                    className="w-64 p-4 text-lg bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                    Admin Login
                </button>
            </div>
        </div>
    );
};

export default LoginSelector;
