import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import './dashboard.css';

function Dashboard() {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/public/locations');
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/public/restaurants?location=${location}`);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewSubmit = (restaurantId, review) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((prevRestaurant) =>
        prevRestaurant.id === restaurantId
          ? { ...prevRestaurant, reviews: [...prevRestaurant.reviews, review] }
          : prevRestaurant
      )
    );
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Find Restaurants</h1>
      <form onSubmit={handleSearch} className="search-form">
        <label className="search-label">
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list="locations"
            className="search-input"
          />
          <datalist id="locations">
            {locations.map((location) => (
              <option key={location} value={location} />
            ))}
          </datalist>
        </label>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {restaurants.length > 0 && (
        <div className="restaurants-list">
          <h2 className="restaurants-list-title">Restaurants:</h2>
          <ul className="restaurant-cards">
            {restaurants.map((restaurant) => (
              <li key={restaurant.id} className="restaurant-card">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-info">
                  <strong>Location:</strong> {restaurant.location}
                </p>
                <p className="restaurant-info">
                  <strong>Type of Food:</strong> {restaurant.typeOfFood}
                </p>
                {/* Render existing reviews */}
                {restaurant.reviews && restaurant.reviews.length > 0 && (
                  <div className="restaurant-reviews">
                    <h4>Reviews:</h4>
                    <ul>
                      {restaurant.reviews.map((review) => (
                        <li key={review.id}>{/* Render individual review details */}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Render the ReviewForm component */}
                <ReviewForm
                  restaurantId={restaurant.id}
                  onReviewSubmit={(review) => handleReviewSubmit(restaurant.id, review)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
