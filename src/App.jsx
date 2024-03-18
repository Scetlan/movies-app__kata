import React, { useEffect, useState } from 'react';
import { SwapiService } from './service/swapiService';
import ListMovies from './components/Content/ListMovies';
import { Spin, Tabs } from 'antd';
import Header from './components/Header/Header';
import { debounce } from 'lodash';
import Alert from 'antd/es/alert/Alert';
import formatDate from './utils/formatDate';
import { SwapiServiceProvider, SwapiServiceConsumer } from './service/ProviderMovies';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [genres, setGenre] = useState([]);

  const swapi = new SwapiService();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      if (searchQuery) {
        const { movies, totalMovies } = await swapi.searchMoviesByTitle(searchQuery);
        const arrGenre = await swapi.getMoviesGenre('ru');
        setGenre(arrGenre);
        setTotalResults(totalMovies);
        const updatedResults = movies.map(movie => ({
          ...movie,
          date: formatDate(movie.date),
        }));
        setMovies(updatedResults);
      } else {
        setLoading(false);
        setMovies([]);
      }
      setLoading(false);
    };

    const debouncedFetch = debounce(fetchMovies, 1000);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [searchQuery]);

  const handleSearch = event => {
    setLoading(true);
    setSearchQuery(event.target.value);
  };

  const handlePageChange = async page => {
    console.log(page);
    setCurrent(page);
    setLoading(true);
    const { movies } = await swapi.searchMoviesByTitle(searchQuery, page);
    setMovies(movies);
    setLoading(false);
  };

  const spiner = loading ? (
    <Spin className="spiner" tip="Loading" size="large" />
  ) : (
    <ListMovies
      movies={movies}
      totalPages={movies.length}
      total={totalResults}
      handlePageChange={handlePageChange}
      current={current}
    />
  );
  const content =
    !loading && movies.length === 0 ? (
      <Alert className="alert-error" message="No results found" type="success" />
    ) : (
      spiner
    );

  // console.log(movies.rate);
  return (
    <main className="content">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Search`,
            key: 1,
            children: (
              // <SwapiServiceProvider value={movies}>
              <>
                <Header onSearch={handleSearch} />
                {content}
              </>
              // </SwapiServiceProvider>
            ),
          },
          {
            label: `Rated`,
            key: 2,
            children: `Content of tab 2`,
          },
        ]}
      />
    </main>
  );
};

export default App;
