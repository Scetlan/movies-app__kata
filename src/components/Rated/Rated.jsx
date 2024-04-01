import React, { useEffect, useState } from 'react';
import { SwapiService } from '../../service/swapiService';
import CardRated from './CardRated';
import { Spin } from 'antd';

const api = new SwapiService();

const Rated = () => {
  const [rateMovies, setRateMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { movies } = await api.getRatedMovies(1);
        console.log(movies);
        setRateMovies(movies);
      } catch (error) {
        console.log(`rate: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading || !rateMovies) {
    return (
      <div className="spiner">
        <Spin className="spiner__component" tip="Loading..." size="large" />
      </div>
    );
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
