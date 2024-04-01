import Card from './ListCard/Card';
import Search from '../Search/Search';
import SwapiService from '../../service/swapiService';
import formatDateMovie from '../../utils/formatDate';
import { Alert, Pagination, Spin } from 'antd';
import { debounce } from 'lodash';

import { useState } from 'react';

const api = new SwapiService();

function ListMovies({ state }) {
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
      const { moviesList, totalMovies } = await api.searchMoviesByTitle(value);
      const arrGenre = await api.getMoviesGenre();
      state(arrGenre);
      setLoading(false);
      setTotalResults(totalMovies);
      const updatedResults = moviesList.map(movie => ({
        ...movie,
        releaseDate: formatDateMovie(movie.releaseDate),
      }));
      setMovies(updatedResults);
    } catch (error) {
      throw new Error(error.message);
    }
  }, 2000);

  const handleSearch = event => {
    debouncedSearch(event.target.value);
  };

  const handlePageChange = async page => {
    if (current !== page) setCurrent(page);
    setLoading(true);
    const { moviesList } = await api.searchMoviesByTitle(searchQuery, page);

    setMovies(moviesList);
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
      spiner
    );

  return (
    <>
      <Search className="search" onSearch={handleSearch} />
      {content}
    </>
  );
}

export default ListMovies;
