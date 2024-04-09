import CardRated from './CardRated';
import SwapiService from '../../service/swapiService';
import { Pagination, Spin } from 'antd';

import { useEffect, useState } from 'react';

const api = new SwapiService();

function Rated() {
  const [rateMovies, setRateMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const amountMoviesPerPage = rateMovies.slice((current - 1) * pageSize, current * pageSize);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { cookiesListMovies } = await api.getRatedMovies(1);
        setRateMovies(cookiesListMovies);
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handlePageChange = page => {
    setCurrent(page);
  };

  if (isLoading || !rateMovies) {
    return (
      <div className="spiner">
        <Spin className="spiner__component" tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <>
      <ul className="content__list">
        {amountMoviesPerPage.map(movie => (
          <CardRated key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className="pagination">
        <Pagination
          className="pagination"
          total={rateMovies.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          current={current}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}

export default Rated;
