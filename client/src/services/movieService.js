import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class MovieService {
  // Get popular movies from TMDB
  async getPopularMovies(page = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/popular`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  // Search movies
  async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/search`, {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  // Get movie details by ID
  async getMovieDetails(movieId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  // Get movie genres
  async getGenres() {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/genres/list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  // Get movies by genre
  async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/discover/genre/${genreId}`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw error;
    }
  }

  // Transform TMDB movie data to match our app's format
  transformMovieData(tmdbMovie) {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 'N/A',
      genre: tmdbMovie.genres ? tmdbMovie.genres.map(g => g.name).join(', ') : 'N/A',
      director: 'N/A', // TMDB doesn't provide director in basic movie object
      rating: tmdbMovie.vote_average || 0,
      description: tmdbMovie.overview || 'No description available',
      poster: tmdbMovie.poster_path
        ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image'
    };
  }

  // Transform search results
  transformSearchResults(results) {
    return results.map(movie => this.transformMovieData(movie));
  }
}

export default new MovieService();
