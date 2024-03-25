import React, { useEffect, useState } from 'react';
import Card from './ListCard/Card';
import { Alert, Pagination, Spin } from 'antd';
import Search from '../Search/Search';
import { ContextMovies } from '../../service/ContextMovies';
import { formatDate } from 'date-fns';
import { debounce } from 'lodash';
import { SwapiService } from '../../service/swapiService';

const api = new SwapiService();

const ListPopular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [listGenres, setListGenre] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { movies, res } = await api.getPopularMovie('ru-RU', 1);
        const arrGenre = await api.getMoviesGenre('ru');
        setListGenre(arrGenre);
        setTotalResults(res.total_results);
        // const updatedResults = movies.map(movie => ({
        //   ...movie,
        //   date: formatDate(movie.date),
        // }));
        setMovies(movies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      fetchMovies();
    };
  }, []);

  const handleSearch = event => {
    try {
      setLoading(true);

      setTimeout(async () => {
        if (!event.target.value) return;
        setSearchQuery(event.target.value);
        const { movies, res } = await api.searchMoviesByTitle(event.target.value);
        const arrGenre = await api.getMoviesGenre('ru');
        setListGenre(arrGenre);
        setLoading(false);
        setTotalResults(res.total_results);
        // const updatedResults = movies.map(movie => ({
        //   ...movie,
        //   date: formatDate(movie.date),
        // }));
        setMovies(movies);
      }, 3000);
    } catch (error) {
      console.log('Ошибка 2: ' + error);
    }
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
      <Spin className="spiner__component" tip="Loading" size="large" />
    </div>
  ) : (
    <ul className="content__list">
      {movies.map(({ title, posterPath, date, desc, id, rate, genres }) => (
        <Card key={id} title={title} releaseDate={date} overview={desc} img={posterPath} rate={rate} genres={genres} />
      ))}
    </ul>
  );
  const content =
    !loading && movies.length === 0 ? (
      <Alert className="alert-error" message="No results found" type="success" />
    ) : (
      spiner
    );

  console.log(movies);

  return (
    <ContextMovies.Provider value={listGenres}>
      <Search onSearch={handleSearch} />
      {content}
      <Pagination
        className="pagination"
        total={totalResults}
        pageSize={20}
        onChange={handlePageChange}
        current={current}
        showSizeChanger={false}
      />
    </ContextMovies.Provider>
  );
};

export default ListPopular;
