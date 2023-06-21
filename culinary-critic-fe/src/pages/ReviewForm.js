import React, { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';

function ReviewForm({ restaurantId, onReviewSubmit }) {
  const [rating, setRating] = useState('');
  const [foodQualityRating, setFoodQualityRating] = useState(0);
  const [ambianceRating, setAmbianceRating] = useState(0);
  const [serviceQualityRating, setServiceQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [speedOfServiceRating, setSpeedOfServiceRating] = useState(0);
  const [valueForMoneyRating, setValueForMoneyRating] = useState(0);
  const [report, setReport] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      restaurant: {
        id: restaurantId,
      },
      rating,
      foodQualityRating,
      ambianceRating,
      serviceQualityRating,
      cleanlinessRating,
      speedOfServiceRating,
      valueForMoneyRating,
      report,
      reviewerName,
    };

    try {
      const response = await axios.post('http://localhost:8080/public/reviews', reviewData);
      onReviewSubmit(response.data);
      // Clear the form after successful submission
      setRating('');
      setFoodQualityRating(0);
      setAmbianceRating(0);
      setServiceQualityRating(0);
      setCleanlinessRating(0);
      setSpeedOfServiceRating(0);
      setValueForMoneyRating(0);
      setReport('');
      setReviewerName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="review-form">
      <h2 className="form-title">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>

        <label>
          Food Quality Rating:
          <input
            type="number"
            value={foodQualityRating}
            onChange={(e) => setFoodQualityRating(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Ambiance Rating:
          <input
            type="number"
            value={ambianceRating}
            onChange={(e) => setAmbianceRating(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Service Quality Rating:
          <input
            type="number"
            value={serviceQualityRating}
            onChange={(e) => setServiceQualityRating(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Cleanliness Rating:
          <input
            type="number"
            value={cleanlinessRating}
            onChange={(e) => setCleanlinessRating(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Speed of Service Rating:
          <input
            type="number"
            value={speedOfServiceRating}
            onChange={(e) => setSpeedOfServiceRating(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Value for Money Rating:
          <input
            type="number"
            value={valueForMoneyRating}
            onChange={(e) => setValueForMoneyRating(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Report:
          <textarea value={report} onChange={(e) => setReport(e.target.value)} />
        </label>

        <label>
          Reviewer Name:
          <input type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
        </label>

        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
