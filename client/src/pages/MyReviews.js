import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import reviewService from '../services/reviewService';
import movieService from '../services/movieService';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        // For now, we'll use a mock user ID. In a real app, this would come from authentication
        const userId = 'mock-user-id'; // TODO: Replace with actual user ID from auth context
        const reviewsResponse = await reviewService.getUserReviews(userId);
        setReviews(reviewsResponse);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
        // Fallback to mock data
        setReviews([
          {
            id: 1,
            movieId: 1,
            movieTitle: 'The Shawshank Redemption',
            rating: 5,
            comment: 'An absolute masterpiece. The story and performances are incredible.',
            createdAt: new Date('2023-11-15')
          },
          {
            id: 2,
            movieId: 2,
            movieTitle: 'The Godfather',
            rating: 4,
            comment: 'Classic film with great acting. A bit long but worth it.',
            createdAt: new Date('2023-11-12')
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  const getMoviePoster = async (movieId) => {
    try {
      const movieResponse = await movieService.getMovieDetails(movieId);
      const transformedMovie = movieService.transformMovieData(movieResponse);
      return transformedMovie.poster;
    } catch (err) {
      console.error('Error fetching movie poster:', err);
      // Fallback to sample movies
      try {
        const { sampleMovies } = await import('../sampleMovies');
        const movie = sampleMovies.find(m => m.id === parseInt(movieId));
        return movie ? movie.poster : '';
      } catch (fallbackErr) {
        console.error('Fallback failed:', fallbackErr);
        return '';
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(reviewId);
        setReviews(reviews.filter(review => review.id !== reviewId));
      } catch (err) {
        console.error('Error deleting review:', err);
        alert('Failed to delete review');
      }
    }
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-reviews">
      <h1>My Reviews</h1>

      {reviews.length > 0 ? (
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={review.moviePoster || '/placeholder-poster.jpg'}
                    className="img-fluid rounded-start h-100"
                    alt={review.movieTitle}
                    style={{ objectFit: 'cover' }}
                    onLoad={async () => {
                      if (!review.moviePoster) {
                        const poster = await getMoviePoster(review.movieId);
                        setReviews(prev => prev.map(r =>
                          r.id === review.id ? { ...r, moviePoster: poster } : r
                        ));
                      }
                    }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title">
                        <Link to={`/movie/${review.movieId}`} className="text-decoration-none">
                          {review.movieTitle}
                        </Link>
                      </h5>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-warning text-dark me-2">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </span>
                        <small className="text-muted">{formatDate(review.createdAt)}</small>
                      </div>
                    </div>
                    <p className="card-text">{review.comment}</p>
                    <div className="review-actions">
                      <Link to={`/update-review/${review.id}`} className="btn btn-outline-primary btn-sm me-2">
                        Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">You haven't written any reviews yet.</p>
          <Link to="/browse" className="btn btn-primary">Browse Movies</Link>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
