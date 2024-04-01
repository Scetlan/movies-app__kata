// import Search from 'antd/es/input/Search';
import { Input } from 'antd';
import React from 'react';

const Search = ({ onSearch }) => {
  return <Input className='content__search' size="large" placeholder="Type to search..."  onKeyUp={onSearch}/>;
};

export default Search;
