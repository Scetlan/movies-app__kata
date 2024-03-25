import React, { useContext } from 'react';
import photo from './img/noPhoto.jpg';
import ListGenre from '../../Genre/ListGenre';
import { Rate } from 'antd';
import { ContextMovies } from '../../../service/ContextMovies';
import createGenres from '../../../utils/createGenres';

const Card = ({ title, releaseDate, overview, img, rate, genres }) => {
  const isImg = img === '';

  const listGenres = useContext(ContextMovies);

  return (
    <li className="content__list-item">
        <span className="overall-rating">
          {String(rate).slice(0, 3)}
        </span>
      <img className="pic" src={isImg ? photo : img} alt={`${title}`} />
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{releaseDate}</p>
        <ListGenre arrGenres={createGenres(listGenres, genres)}/>
        <p className="plot-movie">{overview}</p>
        <Rate
          allowHalf
          count={10}
          style={{ fontSize: 16 }}
          // defaultValue={2.5} - сюда передавать рейтинг
        />
      </div>
    </li>
  );
};

export default Card;
