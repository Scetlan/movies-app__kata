import React from 'react';

const ListGenre = ({ arrGenres }) => {
  return <ul className="genres">
    {arrGenres.map((genre)=> (
      <li key={3} className='genres__item'>
        {genre}
      </li>
    ))}
  </ul>;
};

export default ListGenre;
