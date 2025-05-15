import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewSystem = ({ doctorId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSubmitReview = async () => {
    try {
      await api.addReview(doctorId, { rating, review });
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Failed to submit review');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Doctor Reviews</h3>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Write your review..."
      />
      <button 
        onClick={handleSubmitReview}
        className="mt-2 bg-primary text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewSystem;
