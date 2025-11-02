import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await movieService.searchMovies(query, 1);
      const transformedResults = movieService.transformSearchResults(response.results);
      setResults(transformedResults);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search movies');
      // Fallback to sample movies search
      try {
        const { sampleMovies } = await import('../sampleMovies');
        const searchResults = sampleMovies.filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.director.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.toLowerCase().includes(query.toLowerCase()) ||
          movie.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(searchResults);
      } catch (fallbackErr) {
        console.error('Fallback search failed:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <h1 className="mb-4">Search Movies</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for movies, directors, genres..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Searching...</span>
          </div>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="search-results">
          <h3>Search Results ({results.length})</h3>
          <div className="row">
            {results.map(movie => (
              <div key={movie.id} className="col-lg-6 mb-3">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={movie.poster} className="img-fluid rounded-start" alt={movie.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">{movie.description.substring(0, 150)}...</p>
                        <p className="card-text">
                          <small className="text-muted">
                            Genre: {movie.genre} | Year: {movie.year} | Rating: {movie.rating.toFixed(1)}
                          </small>
                        </p>
                        <Link to={`/movie/${movie.id}`} className="btn btn-primary btn-sm">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No movies found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default Search;
