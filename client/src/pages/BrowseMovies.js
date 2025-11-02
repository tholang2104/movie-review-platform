import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';

const BrowseMovies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await movieService.getGenres();
        setGenres(response.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedGenre) {
          response = await movieService.getMoviesByGenre(selectedGenre, currentPage);
        } else {
          response = await movieService.getPopularMovies(currentPage);
        }

        const transformedMovies = movieService.transformSearchResults(response.results);
        setMovies(transformedMovies);
        setTotalPages(response.total_pages);
        setError(null);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies');
        // Fallback to sample movies
        const { sampleMovies } = await import('../sampleMovies');
        setMovies(sampleMovies);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await movieService.searchMovies(searchTerm, 1);
      const transformedMovies = movieService.transformSearchResults(response.results);
      setMovies(transformedMovies);
      setTotalPages(response.total_pages);
      setCurrentPage(1);
      setSelectedGenre('');
      setError(null);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxPages = Math.min(totalPages, 10); // Limit to 10 pages for display

    for (let i = 1; i <= maxPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="Movie pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pages}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="browse-movies">
      <h1 className="mb-4">Browse Movies</h1>

      <div className="filters mb-4">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
                setSearchTerm('');
              }}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {movies.map(movie => (
              <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                  <img src={movie.poster} className="card-img-top" alt={movie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.description.substring(0, 100)}...</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-primary">Rating: {movie.rating.toFixed(1)}</span>
                      <span className="text-muted">{movie.year}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Link to={`/movie/${movie.id}`} className="btn btn-primary btn-sm">View Details</Link>
                      <Link to={`/reviews/${movie.id}`} className="btn btn-outline-secondary btn-sm">Reviews</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {movies.length === 0 && !loading && (
            <div className="text-center py-5">
              <p className="text-muted">No movies found matching your criteria.</p>
            </div>
          )}

          {totalPages > 1 && renderPagination()}
        </>
      )}
    </div>
  );
};

export default BrowseMovies;
