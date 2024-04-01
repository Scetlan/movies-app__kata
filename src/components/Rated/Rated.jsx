import CardRated from './CardRated';
import SwapiService from '../../service/swapiService';
import { Spin } from 'antd';

import { useEffect, useState } from 'react';

const api = new SwapiService();

function Rated() {
  const [rateMovies, setRateMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { listMovies } = await api.getRatedMovies(1);
        setRateMovies(listMovies);
      } catch (error) {
        throw new Error(error.message);
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
}

export default Rated;
