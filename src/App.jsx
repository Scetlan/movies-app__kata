import React, { useEffect, useState } from 'react';
import { SwapiService } from './service/swapiService';
import Main from './components/Main/Main';
import LoadingDate from './components/LoadingDate/LoadingDate';

const App = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorDate, setErrorDate] = useState(false);

  const swapi = new SwapiService();

  const onError = (error) => {
    setErrorDate(true);
    setLoading(false);
  }

  useEffect(() => {
    swapi.getMovies().then(({ results }) => {
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
    .catch(onError);
    setLoading(false);
  }, []);


  const errorMessage = errorDate ? <ErrorIndicator /> : null;
  const spiner = loading ? <LoadingDate /> : null;
  const content = !(loading || errorDate) ? <Main state={state} /> : null;

  return (
    <>
    {spiner}
    {content}
    </>
  );
};

export default App;
