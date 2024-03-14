import React, { useEffect, useState } from 'react';
import { SwapiService } from './service/swapiService';
import ListMovies from './components/Content/ListMovies';
import { Spin } from 'antd';

import _ from 'lodash';
import Header from './components/Header/Header';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const swapi = new SwapiService();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      if (searchQuery) {
        const { results, total_pages, total_results } = await swapi.searchMoviesByTitle(searchQuery);
        setTotalPages(total_pages);
        setTotalResults(total_results);
        const updatedResults = results.map(movie => ({
          ...movie,
          backdrop_path: movie.backdrop_path === null ? '' : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }));
        setMovies(updatedResults);
      } else {
        setLoading(false);
        setMovies([]);
      }
      setLoading(false);
    };

    const debouncedFetch = _.debounce(fetchMovies, 500);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [searchQuery]);

  const handleSearch = value => {
    setLoading(true);
    setSearchQuery(value);
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    const { results } = await swapi.searchMoviesByTitle(searchQuery, page);
    console.log(page);

    const updatedResults = results.map(movie => ({
      ...movie,
      backdrop_path: movie.backdrop_path === null ? '' : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    }));
    setMovies(updatedResults);
    setLoading(false);
  };

  const spiner = loading ? (
    <Spin className="spiner" tip="Loading" size="large" />
  ) : (
    <ListMovies movies={movies} totalPages={totalPages} total={totalResults} handlePageChange={handlePageChange} />
  );
  const content = !loading && movies.length === 0 ? <div>No results found</div> : spiner;

  return (
    <main className="content">
      <Header onSearch={handleSearch} />
      {content}
    </main>
  );
};

export default App;
