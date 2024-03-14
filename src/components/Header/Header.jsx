import Search from 'antd/es/input/Search';
import React from 'react';

const Header = ({ onSearch }) => {
  return <Search placeholder="Search movies..." onSearch={onSearch} />;
};

export default Header;
