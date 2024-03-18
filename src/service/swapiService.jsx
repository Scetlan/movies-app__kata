export class SwapiService {
  _apiUrl = 'https://api.themoviedb.org';
  _token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjU1YTEwZWExMGIyNGMyNmI3MTljZWZkY2UyYzQ0YyIsInN1YiI6IjY1ZTBhYWI1MmQ1MzFhMDE4NWMwNWIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqUGsWTRCk1OjbKLU9FaU0dLJy0BQxo_fcfMKP6c3VA';
  _api_key = '8655a10ea10b24c26b719cefdce2c44c';
  _api_posters = 'https://image.tmdb.org/t/p/w500';

  async getResource(url) {
    const res = await fetch(`${this._apiUrl}${url}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${this._token}`,
      },
    });
    if (!res.ok) throw new Error(`Could not fetch ${this._apiUrl} , received ${res.status}`);

    return await res.json();
  }

  async getMovies() {
    return await this.getResource(`/3/discover/movie?api_key=${this._api_key}`);
  }

  async searchMoviesByTitle(title, page = 1) {// не забыть про lang
    const res = await this.getResource(
      `/3/search/movie?api_key=${this._api_key}&language=ru-RU&query=${title}&page=${page}`
    );
    const movies = res.results.map(this.transformMovie);
    const totalMovies = res.total_results;

    return { movies, totalMovies };
  }

  async getMoviesGenre(lang = 'en') {
    const { genres } = await this.getResource(`/3/genre/movie/list?language=${lang}`);
    return await genres;
  }

  transformMovie = (movie) => ({
    id: movie.id,
    title: movie.title,
    desc: movie.overview,
    date: movie.release_date,
    posterPath: !movie.poster_path ? '' : `${this._api_posters}${movie.poster_path}`,
    rate: movie.vote_average,
    genres: movie.genre_ids,
    rating: movie.rating || 0,
  });
}
