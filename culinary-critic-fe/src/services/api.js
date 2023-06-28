import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/public';

export async function fetchLocations() {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchRestaurants(location) {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants?location=${location}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function submitReview(restaurantId, review) {
  try {
    const response = await axios.post(`${API_BASE_URL}/review/${restaurantId}`, review);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
