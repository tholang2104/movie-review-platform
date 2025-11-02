import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await movieService.getPopularMovies(1);
        // Take first 3 movies and transform them
        const movies = response.results.slice(0, 3).map(movie => movieService.transformMovieData(movie));
        setFeaturedMovies(movies);
      } catch (err) {
        console.error('Error fetching featured movies:', err);
        setError('Failed to load featured movies');
        // Fallback to sample movies if API fails
        const { sampleMovies } = await import('../sampleMovies');
        setFeaturedMovies(sampleMovies.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="hero-section text-center py-5">
          <h1 className="display-4 fw-bold mb-3">Welcome to Movie Review Platform</h1>
          <p className="lead mb-4">Discover, review, and share your thoughts on the best movies</p>
          <Link to="/browse" className="btn btn-primary btn-lg">Browse Movies</Link>
        </div>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero-section text-center py-5">
        <h1 className="display-4 fw-bold mb-3">Welcome to Movie Review Platform</h1>
        <p className="lead mb-4">Discover, review, and share your thoughts on the best movies</p>
        <Link to="/browse" className="btn btn-primary btn-lg">Browse Movies</Link>
      </div>

      <div className="featured-movies py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Movies</h2>
          {error && (
            <div className="alert alert-warning text-center" role="alert">
              {error}
            </div>
          )}
          <div className="row">
            {featuredMovies.map(movie => (
              <div key={movie.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={movie.poster} className="card-img-top" alt={movie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.description.substring(0, 100)}...</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary">Rating: {movie.rating.toFixed(1)}</span>
                      <Link to={`/movie/${movie.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
