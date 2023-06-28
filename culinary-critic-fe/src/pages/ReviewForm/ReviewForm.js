import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewForm.css';
import { Rating } from '@mui/material';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

function ReviewForm({ restaurantId, onReviewSubmit }) {
  const [rating, setOverallRating] = useState(0);
  const [foodQualityRating, setFoodQualityRating] = useState(0);
  const [ambianceRating, setAmbianceRating] = useState(0);
  const [serviceQualityRating, setServiceQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [speedOfServiceRating, setSpeedOfServiceRating] = useState(0);
  const [valueForMoneyRating, setValueForMoneyRating] = useState(0);
  const [report, setReport] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if the user is logged in by checking the 'cc-token' in localStorage
    const storedToken = localStorage.getItem('cc-token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user data or perform any other action here
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
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
      const url = token ? `http://localhost:8080/user/review/${restaurantId}` : `http://localhost:8080/public/review/${restaurantId}`;
      const response = await axios.post(url, reviewData, {
        headers: {
          Authorization: token,
        },
      });
      onReviewSubmit(response.data);
      setOverallRating(0);
      setFoodQualityRating(0);
      setAmbianceRating(0);
      setServiceQualityRating(0);
      setCleanlinessRating(0);
      setSpeedOfServiceRating(0);
      setValueForMoneyRating(0);
      setReport('');
      setReviewerName('');
      toast.success('Review submitted successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="review-form">
      <h2 className="form-title">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Overall Rating:
        </label>
        <Rating
          name="overallRating"
          value={rating}
          onChange={(event, newValue) => {
            setOverallRating(newValue);
          }}
        />        <label>
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


        {!token && (
          <label>
            Reviewer Name:
          </label>
        )}
        {!token && (
          <TextField type="text" size="small" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
        )}

        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;