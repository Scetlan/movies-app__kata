export class SwapiService {
  _apiUrl = 'https://api.themoviedb.org';
  _token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjU1YTEwZWExMGIyNGMyNmI3MTljZWZkY2UyYzQ0YyIsInN1YiI6IjY1ZTBhYWI1MmQ1MzFhMDE4NWMwNWIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yqUGsWTRCk1OjbKLU9FaU0dLJy0BQxo_fcfMKP6c3VA';

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
    return await this.getResource(`/3/discover/movie?api_key=8655a10ea10b24c26b719cefdce2c44c`);
  }

  async searchMoviesByTitle(title, page) {
    return await this.getResource(`/3/search/movie?api_key=8655a10ea10b24c26b719cefdce2c44c&query=${title}&page=${page}`);
  }
}
