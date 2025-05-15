import { useState, useEffect } from 'react';
import { api } from '../services/api';

const AppointmentBooking = ({ doctorId }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  useEffect(() => {
    loadAvailableSlots();
  }, [doctorId]);

  const loadAvailableSlots = async () => {
    const response = await api.getAvailableSlots(doctorId);
    setAvailableSlots(response.data);
  };

  const handleBooking = async () => {
    if (!selectedSlot) return;
    
    try {
      await api.bookAppointment({
        doctorId,
        slot: selectedSlot,
        patientId: localStorage.getItem('userId')
      });
      alert('Appointment booked successfully!');
    } catch (error) {
      alert('Failed to book appointment');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Available Slots</h3>
      <div className="grid grid-cols-3 gap-2">
        {availableSlots.map(slot => (
          <button
            key={slot.id}
            className={`p-2 border rounded ${selectedSlot?.id === slot.id ? 'bg-primary text-white' : ''}`}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot.time}
          </button>
        ))}
      </div>
      <button
        className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
        onClick={handleBooking}
        disabled={!selectedSlot}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentBooking;
