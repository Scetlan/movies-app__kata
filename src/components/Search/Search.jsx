import { Input } from 'antd';

function Search({ onSearch }) {
  return <Input className="content__search" size="large" placeholder="Type to search..." onKeyUp={onSearch} />;
}

export default Search;
