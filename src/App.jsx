import React, { useEffect, useState } from 'react';
import { SwapiService } from './service/swapiService';
import Main from './components/Main/Main';
import { Spin } from 'antd';

const App = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  const swapi = new SwapiService();

  useEffect(() => {
    swapi
      .getMovies()
      .then(({ results }) => {
        return results.map(movie => {
          setState(state => {
            return [
              ...state,
              {
                id: movie.id,
                overview: movie.overview,
                title: movie.title,
                backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                release_date: movie.release_date,
                genre_ids: movie.genre_ids,
              },
            ];
          });
        });
      })
    setLoading(false);
  }, []);

  const spiner = !loading ? <Spin tip="Loading" size="large" /> : null;
  const content = !loading ? <Main state={state} /> : null;

  return (
    <>
      {spiner}
      {content}
    </>
  );
};

export default App;
