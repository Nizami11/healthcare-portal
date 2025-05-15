import { useState } from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const FindDoctors = () => {
  const [filters, setFilters] = useState({
    name: '',
    specialty: 'all',
    location: 'all'
  });

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      reviews: 125,
      experience: '10+ years',
      location: 'New York',
      image: '/doctors/sarah.jpg',
      availability: 'Available Today'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      rating: 4.7,
      reviews: 98,
      experience: '8+ years',
      location: 'Los Angeles',
      image: '/doctors/michael.jpg',
      availability: 'Next Available: Tomorrow'
    }
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Find Doctors</h1>

        {/* Search Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor name
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded"
                placeholder="Search doctors"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                name="specialty"
                className="w-full p-2 border rounded"
                value={filters.specialty}
                onChange={handleFilterChange}
              >
                <option value="all">All specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                name="location"
                className="w-full p-2 border rounded"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="all">All locations</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doctor List */}
        <div className="space-y-6">
          {doctors.map(doctor => (
            <div key={doctor.id} className="bg-white p-6 rounded-lg shadow flex">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-lg object-cover mr-6"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="text-yellow-400" />
                      <span className="ml-1">{doctor.rating}</span>
                      <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span className="ml-1 text-gray-600">{doctor.location}</span>
                    </div>
                    <p className="text-gray-600 mt-1">Experience: {doctor.experience}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium">{doctor.availability}</p>
                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindDoctors;
