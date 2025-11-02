import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';
import reviewService from '../services/reviewService';

const Reviews = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        // Fetch movie details
        const movieResponse = await movieService.getMovieDetails(id);
        const transformedMovie = movieService.transformMovieData(movieResponse);
        setMovie(transformedMovie);

        // Fetch reviews
        const reviewsResponse = await reviewService.getMovieReviews(id);
        setReviews(reviewsResponse);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load movie and reviews');
        // Fallback to sample data
        try {
          const { sampleMovies } = await import('../sampleMovies');
          const fallbackMovie = sampleMovies.find(m => m.id === parseInt(id));
          setMovie(fallbackMovie);

          // Mock reviews data
          const mockReviews = [
            {
              id: 1,
              reviewerName: 'Alice Johnson',
              rating: 5,
              comment: 'Absolutely brilliant! One of the best movies I\'ve ever seen.',
              createdAt: new Date('2023-11-15')
            },
            {
              id: 2,
              reviewerName: 'Bob Smith',
              rating: 4,
              comment: 'Great story and excellent performances. Highly recommended.',
              createdAt: new Date('2023-11-10')
            },
            {
              id: 3,
              reviewerName: 'Charlie Brown',
              rating: 5,
              comment: 'Masterpiece! The direction and cinematography are outstanding.',
              createdAt: new Date('2023-11-08')
            }
          ];
          setReviews(mockReviews);
        } catch (fallbackErr) {
          console.error('Fallback failed:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndReviews();
  }, [id]);

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

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !movie) {
    return (
      <div className="text-center py-5">
        <h2>Movie not found</h2>
        <p className="text-muted">{error}</p>
        <Link to="/browse" className="btn btn-primary">Back to Browse</Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-5">
        <h2>Movie not found</h2>
        <Link to="/browse" className="btn btn-primary">Back to Browse</Link>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="reviews">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Reviews for {movie.title}</h1>
        <Link to={`/add-review/${movie.id}`} className="btn btn-success">Add Review</Link>
      </div>

      <div className="movie-summary mb-4">
        <div className="row">
          <div className="col-md-3">
            <img src={movie.poster} className="img-fluid rounded" alt={movie.title} />
          </div>
          <div className="col-md-9">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <div className="d-flex align-items-center">
              <span className="badge bg-primary me-3">Average Rating: {averageRating.toFixed(1)}/5</span>
              <span className="text-muted">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title">{review.reviewerName}</h5>
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
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No reviews yet. Be the first to review this movie!</p>
          <Link to={`/add-review/${movie.id}`} className="btn btn-primary">Add Review</Link>
        </div>
      )}
    </div>
  );
};

export default Reviews;
