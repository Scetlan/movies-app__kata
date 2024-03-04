import React, { useEffect, useState } from 'react';
import { SwapiService } from './service/swapiService';
import Main from './components/Main/Main';

const App = () => {
  const [state, setState] = useState([]);

  const swapi = new SwapiService();

  useEffect(() => {
    swapi.getMovies().then(({results}) => {
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
    });
  }, []);

  return (
    <>
      <Main state={state} />
    </>
  );
};

export default App;
