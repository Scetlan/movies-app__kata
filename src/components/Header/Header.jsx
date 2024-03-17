// import Search from 'antd/es/input/Search';
import { Input } from 'antd';
import React from 'react';

const Header = ({ onSearch, value }) => {
  return <Input className='content__search' size="large" placeholder="Type to search..."  onKeyUp={onSearch} value={value}/>;
};

export default Header;
