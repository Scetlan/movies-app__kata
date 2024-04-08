import Cookies from 'js-cookie';

export default class SwapiService {
  apiUrl = 'https://api.themoviedb.org/3';

  token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjU1YTEwZWExMGIyNGMyNmI3MTljZWZkY2UyYzQ0YyIsInN1YiI6IjY1ZTBhYWI1MmQ1MzFhMDE4NWMwNWIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqUGsWTRCk1OjbKLU9FaU0dLJy0BQxo_fcfMKP6c3VA';

  api_key = '8655a10ea10b24c26b719cefdce2c44c';

  api_posters = 'https://image.tmdb.org/t/p/w500';

  getRootHeaders = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: this.token,
    },
  };

  async getResource(url, options) {
    const res = await fetch(`${this.apiUrl}${url}`, options);
    if (!res.ok) throw new Error(`Could not fetch ${this.apiUrl} , received ${res.status}`);

    return res.json();
  }

  async getAccessGuestSession() {
    return this.getResource('/authentication/guest_session/new', this.getRootHeaders);
  }

  async getRatedMovies(page) {
    const guestSessionId = Cookies.get('guest_session_id');

    if (guestSessionId) {
      const listMovies = await this.getResource(
        `/guest_session/${guestSessionId}/rated/movies?api_key=${this.api_key}&page=${page.toString()}`,
        {
          method: 'GET',
          headers: { accept: 'application/json' },
        }
      );

      const cookiesListMovies = listMovies.results ? listMovies.results.map(this.transformMovie) : [];
      const totalMovies = listMovies.total_results ? listMovies.total_results : 0;
      return { listMovies, cookiesListMovies, totalMovies };
    } else {
      return { listMovies, cookiesListMovies: [], totalMovies: 0 };
    }

  }

  async postAddRating(movieId, value) {
    return this.getResource(
      `/movie/${movieId}/rating?api_key=${this.api_key}&guest_session_id=${Cookies.get('guest_session_id')}`,
      {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value }),
      }
    );
  }

  async deleteRating(movieId) {
    return this.getResource(
      `/movie/${movieId.toString()}/rating?guest_session_id=${Cookies.get('guest_session_id')}&api_key=${this.api_key}`,
      {
        method: 'DELETE',
        headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
      }
    );
  }

  async searchMoviesByTitle(title, page = 1) {
    const res = await this.getResource(
      `/search/movie?language=en-US&query=${title}&page=${page}&api_key=${this.api_key}`,
      this.getRootHeaders
    );
    const moviesList = res.results.map(this.transformMovie);
    const totalMovies = res.total_results;

    return { moviesList, totalMovies };
  }

  async getMoviesGenre() {
    const { genres } = await this.getResource('/genre/movie/list?language=en-US', this.getRootHeaders);
    return genres;
  }

  transformMovie = movie => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    posterPath: !movie.poster_path ? '' : `${this.api_posters}${movie.poster_path}`,
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids,
    rating: !movie.rating ? 0 : movie.rating,
    guestSessionId: '',
    tabPane: '1',
  });
}
