import React from 'react';
import photo from './img/noPhoto.jpg';
import ListGenre from '../../Genre/ListGenre';

const Card = ({ title, releaseDate, overview, img }) => {
  const isImg = img === '';

  return (
    <li className={`content__list-item`}>
      <img className="pic" src={isImg ? photo : img} alt={`${title}`}/>
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{releaseDate}</p>
        <ListGenre />
        <p className="plot-movie">{overview}</p>
      </div>
    </li>
  );
};

export default Card;
