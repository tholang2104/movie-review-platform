import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';

const ItemDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await movieService.getMovieDetails(id);
        const transformedMovie = movieService.transformMovieData(response);
        setMovie(transformedMovie);
      } catch (err) {
        console.error('Error fetching movie details:', err);
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

    fetchMovieDetails();
  }, [id]);

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

  return (
    <div className="movie-detail">
      <div className="row">
        <div className="col-md-4">
          <img src={movie.poster} className="img-fluid rounded" alt={movie.title} />
        </div>
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <div className="movie-meta mb-3">
            <span className="badge bg-primary me-2">Rating: {movie.rating.toFixed(1)}</span>
            <span className="badge bg-secondary me-2">{movie.year}</span>
            <span className="badge bg-info">{movie.genre}</span>
          </div>
          <p className="lead">Genre: {movie.genre}</p>
          <p className="movie-description">{movie.description}</p>
          <div className="action-buttons mt-4">
            <Link to={`/add-review/${movie.id}`} className="btn btn-success me-2">Add Review</Link>
            <Link to={`/reviews/${movie.id}`} className="btn btn-outline-primary me-2">View Reviews</Link>
            <Link to="/browse" className="btn btn-outline-secondary">Back to Browse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
