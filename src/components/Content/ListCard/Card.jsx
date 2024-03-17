import React from 'react';
import photo from './img/noPhoto.jpg';
import formatDate from '../../../utils/formatDate';

const Card = ({ title, releaseDate, overview, img }) => {
  const isImg = img === '';


  return (
    <li className={`content__list-item`}>
      <img className="pic" src={isImg ? photo : img} alt={`${title}`} />
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{formatDate(releaseDate)}</p>
        <p className="genre"></p>
        <p className="plot-movie">{overview}</p>
      </div>
    </li>
  );
};

export default Card;
