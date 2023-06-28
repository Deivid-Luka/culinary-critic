import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RestaurantCard from './restaurantcard';
import { FaSearch, FaBars, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './dashboard.css';

function Dashboard() {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState({});
  const [showReviews, setShowReviews] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const menuRef = useRef(null);

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
      setSearchSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewSubmit = async (restaurantId, review) => {
    try {
      const response = await axios.post(`http://localhost:8080/public/review/${restaurantId}`, review);
      const updatedRestaurant = response.data;
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((prevRestaurant) =>
          prevRestaurant.restaurant.id === restaurantId ? { ...prevRestaurant, restaurant: updatedRestaurant } : prevRestaurant
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowReviewForm = (restaurantId) => {
    setShowReviewForm((prevShowReviewForm) => ({
      ...prevShowReviewForm,
      [restaurantId]: !prevShowReviewForm[restaurantId],
    }));
  };

  const toggleShowReviews = (restaurantId) => {
    setShowReviews((prevShowReviews) => ({
      ...prevShowReviews,
      [restaurantId]: !prevShowReviews[restaurantId],
    }));
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const redirectToLogin = () => {
    // Redirect to the login page
    window.location.href = '/login';
  };

  const redirectToSignUp = () => {
    // Redirect to the sign-up page
    window.location.href = '/signup';
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target.className !== 'menu-button' &&
        !event.target.closest('.menu')
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Find Restaurants</h1>
      <button className="menu-button" onClick={toggleMenu}>
        {menuOpen ? <MdClose /> : <FaBars />}
      </button>

      {menuOpen && (
        <aside className="menu" ref={menuRef}>
          <button className="close-menu-button" onClick={closeMenu}>
            <div className="close-button-icon"></div>
          </button>
          <div className="menu-buttons">
            <button className="menu-button" onClick={redirectToLogin}>
              <FaSignInAlt />
              <span className="menu-button-text">Sign In</span>
            </button>
            <button className="menu-button" onClick={redirectToSignUp}>
              <FaUserPlus />
              <span className="menu-button-text">Sign Up</span>
            </button>
          </div>
        </aside>
      )}

      <form onSubmit={handleSearch} className={`search-form ${searchSubmitted ? 'search-form-top' : ''}`}>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list="locations"
            className="search-input"
            placeholder="Enter location"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </div>
        <datalist id="locations">
          {locations.map((location) => (
            <option key={location} value={location} />
          ))}
        </datalist>
      </form>

      {restaurants.length > 0 && (
        <div className={`restaurants-list ${searchSubmitted ? 'results-displayed' : ''}`}>
          <div className="restaurant-cards">
            {restaurants.map((restaurantInfo) => (
              <RestaurantCard
                key={restaurantInfo.restaurant.id}
                restaurantInfo={restaurantInfo}
                showReviewForm={showReviewForm}
                showReviews={showReviews}
                handleReviewSubmit={handleReviewSubmit}
                toggleShowReviewForm={toggleShowReviewForm}
                toggleShowReviews={toggleShowReviews}
              >
                <div className="restaurant-card">
                  <h2 className="restaurant-card-title">{restaurantInfo.restaurant.name}</h2>
                  <div className="review-stars" style={{ '--rating': restaurantInfo.restaurant.rating }}></div>
                  {/* Add other restaurant info as needed */}
                </div>
              </RestaurantCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
