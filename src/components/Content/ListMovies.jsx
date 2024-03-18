import React from 'react';
import Card from './ListCard/Card';
import { Pagination } from 'antd';

const ListMovies = ({ movies, total, totalPages, handlePageChange, current }) => {
  console.log(totalPages);

  return (
    <>
      <ul className="content__list">
        {movies.map(({ title, posterPath, date, desc, id, rate }) => {
          return <Card key={id} title={title} releaseDate={date} overview={desc} img={posterPath} rate={rate}/>;
        })}
      </ul>
      <Pagination className='pagination' total={total} pageSize={20} onChange={handlePageChange} current={current} showSizeChanger={false}/>
    </>
  );
};

export default ListMovies;
