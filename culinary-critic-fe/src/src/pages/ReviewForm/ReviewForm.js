import React, { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';
import {Rating} from "@mui/material";
import TextField from "@mui/material/TextField";

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
        </label>
        <TextField type="text" size="small" value={rating} onChange={(e) => setRating(e.target.value)} />
        <label>
          Food Quality Rating:
        </label>
        <Rating
            name="foodQualityRating"
            value={foodQualityRating}
            onChange={(event, newValue) => {
              setFoodQualityRating(newValue);
            }}
        />

        <label>
          Ambiance Rating:
        </label>
        <Rating
            name="ambianceRating"
            value={ambianceRating}
            onChange={(event, newValue) => {
              setAmbianceRating(newValue);
            }}
        />

        <label>
          Service Quality Rating:
        </label>
        <Rating
            name="serviceQualityRating"
            value={serviceQualityRating}
            onChange={(event, newValue) => {
              setServiceQualityRating(newValue);
            }}
        />

        <label>
          Cleanliness Rating:
        </label>
        <Rating
            name="cleanlinessRating"
            value={cleanlinessRating}
            onChange={(event, newValue) => {
              setCleanlinessRating(newValue);
            }}
        />

        <label>
          Speed of Service Rating:
        </label>
        <Rating
            name="speedOfServiceRating"
            value={speedOfServiceRating}
            onChange={(event, newValue) => {
              setSpeedOfServiceRating(newValue);
            }}
        />

        <label>
          Value for Money Rating:
        </label>
        <Rating
            name="valueForMoneyRating"
            value={valueForMoneyRating}
            onChange={(event, newValue) => {
              setValueForMoneyRating(newValue);
            }}
        />

        <label>
          Report:
        </label>
        <TextField type="text" size="small" multiline minRows={3} value={report} onChange={(e) => setReport(e.target.value)} />


        <label>
          Reviewer Name:
        </label>
        <TextField type="text" size="small" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />


        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
