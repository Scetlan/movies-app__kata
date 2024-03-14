import React from 'react';
import Card from './ListCard/Card';
import { Pagination } from 'antd';

const ListMovies = ({ movies, total, totalPages, handlePageChange }) => {
  return (
    <>
      <ul className="content__list">
        {movies.map(({ title, backdrop_path, release_date, overview, id }) => {
          return <Card key={id} title={title} releaseDate={release_date} overview={overview} img={backdrop_path} />;
        })}
      </ul>
      <Pagination className='pagination' total={total} pageSize={totalPages} onChange={handlePageChange} />
    </>
  );
};

export default ListMovies;