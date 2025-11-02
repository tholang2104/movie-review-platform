import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import movieService from '../services/movieService';
import reviewService from '../services/reviewService';

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [review, setReview] = useState({
    rating: 5,
    comment: '',
    reviewerName: ''
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieService.getMovieDetails(id);
        const transformedMovie = movieService.transformMovieData(response);
        setMovie(transformedMovie);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to load movie details');
        // Fallback to sample movies
        try {
          const { sampleMovies } = await import('../sampleMovies');
          const fallbackMovie = sampleMovies.find(m => m.id === parseInt(id));
          setMovie(fallbackMovie);
        } catch (fallbackErr) {
          console.error('Fallback failed:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await reviewService.createReview({
        movieId: id,
        ...review
      });
      alert('Review submitted successfully!');
      navigate(`/movie/${id}`);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({
      ...prev,
      [name]: value
    }));
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
        <button className="btn btn-primary" onClick={() => navigate('/browse')}>
          Back to Browse
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-5">
        <h2>Movie not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/browse')}>
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="add-review">
      <h1>Add Review for {movie.title}</h1>

      <div className="row">
        <div className="col-md-4">
          <img src={movie.poster} className="img-fluid rounded" alt={movie.title} />
        </div>
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reviewerName" className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="reviewerName"
                name="reviewerName"
                value={review.reviewerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating</label>
              <select
                className="form-select"
                id="rating"
                name="rating"
                value={review.rating}
                onChange={handleChange}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Review Comment</label>
              <textarea
                className="form-control"
                id="comment"
                name="comment"
                rows="5"
                value={review.comment}
                onChange={handleChange}
                placeholder="Share your thoughts about this movie..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/movie/${id}`)}
              disabled={submitting}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
