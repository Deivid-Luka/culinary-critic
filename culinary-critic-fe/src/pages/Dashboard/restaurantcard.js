import React, { useState } from 'react';
import { Rating } from '@mui/material';
import ReviewForm from '../ReviewForm/ReviewForm';
import './restaurantcard.css';

function RestaurantCard({
  restaurantInfo,
  showReviewForm,
  showReviews,
  handleReviewSubmit,
  toggleShowReviewForm,
  toggleShowReviews,
}) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isRatingSectionOpen, setIsRatingSectionOpen] = useState(false);

  const toggleReviewForm = (restaurantId) => {
    setIsReviewFormOpen(!isReviewFormOpen);
    toggleShowReviewForm(restaurantId);
  };

  const toggleRatingSection = () => {
    setIsRatingSectionOpen(!isRatingSectionOpen);
  };

  const getExpenseString = (expense) => {
    const dollarSigns = Math.floor(expense / 20);
    return Array.from({ length: dollarSigns }, () => '$').join('');
  };

  return (
    <div key={restaurantInfo.restaurant.id} className="restaurant-card">
      <h3 className="restaurant-name">{restaurantInfo.restaurant.name}</h3>
      <p className="restaurant-info">
        <strong>Location:</strong> {restaurantInfo.restaurant.location}
      </p>
      <p className="restaurant-info">
        <strong>Type of Food:</strong> {restaurantInfo.restaurant.typeOfFood}
      </p>
      {restaurantInfo.restaurant.occasion && (
        <p className="restaurant-info">
          <strong>Occasion:</strong> {restaurantInfo.restaurant.occasion}
        </p>
      )}
      <p className="restaurant-info">
        <strong>Dining Options:</strong> {restaurantInfo.restaurant.diningOptions}
      </p>
      {restaurantInfo.restaurant.averageExpense && (
        <p className="restaurant-info">
          <strong>Average Expense:</strong> {getExpenseString(restaurantInfo.restaurant.averageExpense)}
        </p>
      )}

      {restaurantInfo.restaurant.allergyInformation && (
        <p className="restaurant-info">
          <strong>Allergy Information:</strong> {restaurantInfo.restaurant.allergyInformation}
        </p>
      )}

      {/* Render average ratings */}
      <div className="average-ratings">
        <p>Average Overall Rating ({restaurantInfo.numberOfReviews}):</p>
        <Rating name="average-rating" value={restaurantInfo.averageRating} precision={0.5} readOnly />
      </div>

      {/* Render collapsible rating sections */}
      <div className="collapsible-rating-section">
        <button className="collapsible-rating-button" onClick={toggleRatingSection}>
          {isRatingSectionOpen ? 'Hide Detailed Ratings' : 'Show Detailed Ratings'}
        </button>
        {isRatingSectionOpen && (
          <div className="detailed-ratings">
            <div className="average-ratings">
              <p>Average Food Quality Rating:</p>
              <Rating
                name="average-food-quality-rating"
                value={restaurantInfo.averageFoodQualityRating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="average-ratings">
              <p>Average Ambiance Rating:</p>
              <Rating
                name="average-ambiance-rating"
                value={restaurantInfo.averageAmbianceRating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="average-ratings">
              <p>Average Service Quality Rating:</p>
              <Rating
                name="average-service-quality-rating"
                value={restaurantInfo.averageServiceQualityRating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="average-ratings">
              <p>Average Cleanliness Rating:</p>
              <Rating
                name="average-cleanliness-rating"
                value={restaurantInfo.averageCleanlinessRating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="average-ratings">
              <p>Average Speed Of Service Rating:</p>
              <Rating
                name="average-speed-of-service-rating"
                value={restaurantInfo.averageSpeedOfServiceRating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="average-ratings">
              <p>Average Value For Money Rating:</p>
              <Rating
                name="average-value-for-money-rating"
                value={restaurantInfo.averageValueForMoneyRating}
                precision={0.5}
                readOnly
              />
            </div>
          </div>
        )}

        {/* Render the ReviewForm component */}
        {!showReviewForm[restaurantInfo.restaurant.id] && !isReviewFormOpen && (
          <button
            className="leave-review-button"
            onClick={() => toggleReviewForm(restaurantInfo.restaurant.id)}
          >
            Leave a Review
          </button>
        )}

        {(showReviewForm[restaurantInfo.restaurant.id] || isReviewFormOpen) && (
          <div className="review-section">
            {isReviewFormOpen && (
              <div className="review-form-popup">
                <ReviewForm
                  restaurantId={restaurantInfo.restaurant.id}
                  onReviewSubmit={(review) => handleReviewSubmit(restaurantInfo.restaurant.id, review)}
                />
                <button
                  className="close-review-button"
                  onClick={() => toggleReviewForm(restaurantInfo.restaurant.id)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}

        {/* Render show/hide reviews button */}
        {restaurantInfo.restaurant.reviews && restaurantInfo.restaurant.reviews.length > 0 && (
          <button
            className="show-reviews-button"
            onClick={() => toggleShowReviews(restaurantInfo.restaurant.id)}
          >
            {showReviews[restaurantInfo.restaurant.id] ? 'Hide Reviews' : 'Show Reviews'}
          </button>
        )}

        {/* Render the reviews if showReviews is true */}
        {showReviews[restaurantInfo.restaurant.id] &&
          restaurantInfo.restaurant.reviews &&
          restaurantInfo.restaurant.reviews.length > 0 && (
            <div className="restaurant-reviews">
              <h4>Reviews:</h4>
              <ul>
                {restaurantInfo.restaurant.reviews.map((review) => (
                  <li key={review.id}>
                    <div className="review-ratings">
                      <div>
                        <p>Overall Rating:</p>
                        <Rating name={`overall-rating-${review.id}`} value={review.rating} precision={0.5} readOnly />
                      </div>
                      <div>
                        <p>Food Quality Rating:</p>
                        <Rating
                          name={`food-quality-rating-${review.id}`}
                          value={review.foodQualityRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Ambiance Rating:</p>
                        <Rating
                          name={`ambiance-rating-${review.id}`}
                          value={review.ambianceRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Service Quality Rating:</p>
                        <Rating
                          name={`service-quality-rating-${review.id}`}
                          value={review.serviceQualityRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Cleanliness Rating:</p>
                        <Rating
                          name={`cleanliness-rating-${review.id}`}
                          value={review.cleanlinessRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Speed Of Service Rating:</p>
                        <Rating
                          name={`speed-of-service-rating-${review.id}`}
                          value={review.speedOfServiceRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div>
                        <p>Value For Money Rating:</p>
                        <Rating
                          name={`value-for-money-rating-${review.id}`}
                          value={review.valueForMoneyRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                    </div>
                    <p>Report: {review.report}</p>
                    <p>Reviewer: {review.reviewerName}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}

export default RestaurantCard;
