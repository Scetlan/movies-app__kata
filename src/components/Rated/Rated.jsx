import React, { useEffect, useState } from 'react';
import { SwapiService } from '../../service/swapiService';
import CardRated from './CardRated';
import formatDateMovie from '../../utils/formatDate';

const api = new SwapiService();

const Rated = () => {
  const [rateMovies, setRateMovies] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { movies, totalMovies } = await api.getRatedMovies('ru-RU', 1);
        const updatedResults = movies
        // .map(movie => {
        //   return {
        //     ...movie,
        //     release_date: formatDateMovie(movie.release_date),
        //   };
        // });
          setRateMovies(updatedResults);
        console.log(movies);
      } catch (error) {
        console.log(`rate: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading || !rateMovies) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="content__list">
      {rateMovies.map(movie => (
        <CardRated key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default Rated;
