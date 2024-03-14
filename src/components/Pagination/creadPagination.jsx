import React from 'react';
import { Pagination } from 'antd';

// https://api.themoviedb.org/3/discover/movie?api_key=8655a10ea10b24c26b719cefdce2c44c&page=2
const PaginationUI = ( ) => {
  return (
      <Pagination
        total={500}
        // hideOnSinglePage={true}
        // pageSize={pageSize}
        // onChange={page => onChange(page)}
        // current={3}
        showSizeChanger={false}
      />
  );
};

export default PaginationUI;
