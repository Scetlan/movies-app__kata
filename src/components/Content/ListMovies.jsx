import Card from './ListCard/Card';
import Search from '../Search/Search';
import SwapiService from '../../service/swapiService';
import { Alert, Pagination, Spin } from 'antd';
import { debounce } from 'lodash';

import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useState } from 'react';

const api = new SwapiService();

function ListMovies({ state }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [moviesRating, setMoviesRating] = useState(new Map());

  const updateRatingMoviesList = listMovies => {
    const updatedMovies = listMovies.map(movie => {
      if (moviesRating.has(movie.id)) {
        return { ...movie, rating: moviesRating.get(movie.id) };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  const debouncedSearch = debounce(async (value, page) => {
    try {
      setLoading(true);
      setCurrent(1);
      if (!value) return;
      setSearchQuery(value);
      const { moviesList, totalMovies } = await api.searchMoviesByTitle(value, page);
      setLoading(false);
      setTotalResults(totalMovies);
      setMovies(moviesList);
      updateRatingMoviesList(moviesList);
    } catch (error) {
      throw new Error(error.message);
    }
  }, 1500);

  const handleSearch = event => {
    setCurrent(1);
    debouncedSearch(event.target.value, 1);
  };

  const handlePageChange = async page => {
    if (current !== page) {
      setCurrent(page);
      setLoading(true);
      const { moviesList } = await api.searchMoviesByTitle(searchQuery, page);
      setMovies(moviesList);
      updateRatingMoviesList(moviesList);
      setLoading(false);
    }
  };

  function handleMoviesRating(id, value) {
    setMoviesRating(new Map([...moviesRating, [id, value]]));
    updateRatingMoviesList(movies);
  }

  const loadingMovieList = loading ? (
    <div className="spiner">
      <Spin className="spiner__component" tip="Loading..." size="large" />
    </div>
  ) : (
    <>
      <ul className="content__list">
        {movies.map(movie => (
          <Card key={movie.id} movie={movie} handleMoviesRating={handleMoviesRating} />
        ))}
      </ul>
      <div className="pagination">
        <Pagination
          className="pagination"
          total={totalResults}
          pageSize={20}
          onChange={handlePageChange}
          current={current}
          showSizeChanger={false}
        />
      </div>
    </>
  );

  const content =
    !loading && movies.length === 0 ? (
      <Alert className="alert-error" message="No results found" type="success" />
    ) : (
      loadingMovieList
    );

  return (
    <>
      <Search className="search" onSearch={handleSearch} />
      {content}
    </>
  );
}

export default ListMovies;
