import React, { useState } from 'react';
import Card from './ListCard/Card';
import { Alert, Pagination, Spin } from 'antd';
import Search from '../Search/Search';
import { debounce } from 'lodash';
import { SwapiService } from '../../service/swapiService';
import formatDateMovie from '../../utils/formatDate';

const api = new SwapiService();

const ListMovies = ({ state }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const debouncedSearch = debounce(async value => {
    try {
      setLoading(true);
      if (!value) return;
      setSearchQuery(value);
      const { movies, totalMovies } = await api.searchMoviesByTitle(value);
      const arrGenre = await api.getMoviesGenre();
      state(arrGenre);
      setLoading(false);
      setTotalResults(totalMovies);
      const updatedResults = movies.map(movie => {
        return {
          ...movie,
          release_date: formatDateMovie(movie.release_date),
        };
      });
      setMovies(updatedResults);
    } catch (error) {
      console.log('Ошибка поиска: ' + error);
    }
  }, 2000);

  const handleSearch = event => {
    debouncedSearch(event.target.value);
  };

  const handlePageChange = async page => {
    if (current !== page) setCurrent(page);
    setLoading(true);
    const { movies } = await api.searchMoviesByTitle(searchQuery, page);

    setMovies(movies);
    setLoading(false);
  };

  const spiner = loading ? (
    <div className="spiner">
      <Spin className="spiner__component" tip="Loading..." size="large" />
    </div>
  ) : (
    <>
      <ul className="content__list">
        {movies.map(movie => (
          <Card key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className='pagination'>
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
      spiner
    );

  return (
    <>
      <Search className="search" onSearch={handleSearch} />
      {content}
    </>
  );
};

export default ListMovies;
