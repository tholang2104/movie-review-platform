import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ReviewService {
  // Get all reviews for a movie
  async getMovieReviews(movieId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie reviews:', error);
      throw error;
    }
  }

  // Get a specific review
  async getReview(reviewId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching review:', error);
      throw error;
    }
  }

  // Create a new review
  async createReview(reviewData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  // Update a review
  async updateReview(reviewId, reviewData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  }

  // Delete a review
  async deleteReview(reviewId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }

  // Get reviews by user
  async getUserReviews(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
  }
}

export default new ReviewService();
