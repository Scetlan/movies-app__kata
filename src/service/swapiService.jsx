import Cookies from 'js-cookie';

export class SwapiService {
  _apiUrl = 'https://api.themoviedb.org/3';
  _token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjU1YTEwZWExMGIyNGMyNmI3MTljZWZkY2UyYzQ0YyIsInN1YiI6IjY1ZTBhYWI1MmQ1MzFhMDE4NWMwNWIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqUGsWTRCk1OjbKLU9FaU0dLJy0BQxo_fcfMKP6c3VA';
  _api_key = '8655a10ea10b24c26b719cefdce2c44c';
  _api_posters = 'https://image.tmdb.org/t/p/w500';

  getRootHeaders = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: this._token,
    },
  };

  async getResource(url, options) {
    const res = await fetch(`${this._apiUrl}${url}`, options);
    if (!res.ok) throw new Error(`Could not fetch ${this._apiUrl} , received ${res.status}`);

    return await res.json();
  }

  async getAccessGuestSession() {
    return await this.getResource(`/authentication/guest_session/new`, this.getRootHeaders);
  }

  async getRatedMovies(language = 'ru-RU', page) {
    const res = await this.getResource(
      `/guest_session/${Cookies.get('guest_session_id')}/rated/movies?api_key=${this._api_key}&language=${language}&page=${page.toString()}`,
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      }
    );

    const movies = res.results.map(this.transformMovie);
    const totalMovies = res.total_results;

    return { movies, totalMovies };
  }

  async postAddRating(movieId, body, language = 'ru-RU') {
    return this.getResource(
      `/movie/${movieId.toString()}/rating?guest_session_id=${Cookies.get('guest_session_id')}&language=${language}&api_key=${
        this._api_key
      }`,
      {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
        body: body,
      }
    );
  }

  async deleteRating(movieId) {
    return this.getResource(
      `/movie/${movieId.toString()}/rating?guest_session_id=${Cookies.get('guest_session_id')}&api_key=${
        this._api_key
      }`,
      {
        method: 'DELETE',
        headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
      }
    );
  }

  async searchMoviesByTitle(title, page = 1, language = 'ru-RU') {
    const res = await this.getResource(
      `/search/movie?language=${language}&query=${title}&page=${page}&api_key=${this._api_key}`,
      this.getRootHeaders
    );
    const movies = res.results.map(this.transformMovie);
    const totalMovies = res.total_results;

    return { movies, totalMovies };
  }

  async getMoviesGenre(lang = 'ru-RU') {
    const { genres } = await this.getResource(`/genre/movie/list?language=${lang}`, this.getRootHeaders);
    return await genres;
  }

  transformMovie = movie => ({
    origin_language: 'ru',
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    poster_path: !movie.poster_path ? '' : `${this._api_posters}${movie.poster_path}`,
    vote_average: movie.vote_average,
    genre_ids: movie.genre_ids,
    rating: !movie.rating ? 0 : movie.rating,
    guestSessionId: '',
    tabPane: '1',
  });
}
