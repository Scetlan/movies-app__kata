import Cookies from "js-cookie";

export class SwapiService {
  _apiUrl = 'https://api.themoviedb.org/3';
  _token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjU1YTEwZWExMGIyNGMyNmI3MTljZWZkY2UyYzQ0YyIsInN1YiI6IjY1ZTBhYWI1MmQ1MzFhMDE4NWMwNWIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqUGsWTRCk1OjbKLU9FaU0dLJy0BQxo_fcfMKP6c3VA';
  _api_key = '8655a10ea10b24c26b719cefdce2c44c';
  _api_posters = 'https://image.tmdb.org/t/p/w500';

  getRootHeaders = {
    method: 'GET',
    headers: {
      Authorization: this._token,
      accept: 'application/json',
    },
  };

  get getSession() {
    return Cookies.get("guest_session_id");
  }

  async getResource(url, options = this.getRootHeaders) {
    const res = await fetch(`${this._apiUrl}${url}`, options);
    if (!res.ok) throw new Error(`Could not fetch ${this._apiUrl} , received ${res.status}`);

    return await res.json();
  }

  async getAccessGuestSession() {
    return await this.getResource(`/authentication/guest_session/new`);
  }

  async getPopularMovie(language = 'ru-RU', page = 1) {
    return await this.getResource(`/movie/popular?language=${language}&page=${page.toString()}`);
  }

  async getRatedMovies(language = 'ru-RU', page = 1, sort = 'created_at.asc' | 'created_at.desc') {
    return this.getResponse(
      `/guest_session/${Cookies.get('guest_session_id')}/rated/movies?api_key=${
        this._api_key
      }&language=${language}&page=${page.toString()}&sort_by=${sort}`,
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      }
    );
  }

  async postAddRating(movieId, body, headers) {
    return this.getResponse(
      `/movie/${movieId.toString()}/rating?guest_session_id=${Cookies.get('guest_session_id')}&api_key=${
        this._api_key
      }`,
      {
        method: 'GET',
        headers,
        body: body,
      }
    );
  }

  async deleteRating(movieId, headers) {

    return this.getResponse(
      `/movie/${movieId.toString()}/rating?guest_session_id=${Cookies.get('guest_session_id')}&api_key=${this._api_key}`,
      {
        method: 'DELETE',
        headers,
      }
    );
  }

  async searchMoviesByTitle(title, page = 1, language = "ru-RU", ) {
    const res = await this.getResource(
      `/search/movie?language=${language}&query=${title}&page=${page}&api_key=${this._api_key}`
    );
    const movies = res.results.map(this.transformMovie);
    const totalMovies = res.total_results;

    return { movies, totalMovies };
  }

  async getMoviesGenre(lang = 'ru-RU') {
    const { genres } = await this.getResource(`/genre/movie/list?language=${lang}`);
    return await genres;
  }

  isApiError(error) {
    if (error.message) {
      return ["FetchError"].includes(error.message);
    }
  }

  isApiResponse(error) {
    if (error.message) {
      return ["ServerError"].includes(error.message);
    }
  }

  transformMovie = movie => ({
    id: movie.id,
    title: movie.title,
    desc: movie.overview,
    date: movie.release_date,
    posterPath: !movie.poster_path ? '' : `${this._api_posters}${movie.poster_path}`,
    rate: movie.vote_average,
    genres: movie.genre_ids,
    rating: movie.rating || 0,
    guestSessionId: '',
    tabPane: '1',
  });
}
