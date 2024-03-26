import React, { useContext } from 'react';
import photo from './img/noPhoto.jpg';
import ListGenre from '../../Genre/ListGenre';
import { Rate } from 'antd';
import { ContextMovies } from '../../../service/ContextMovies';
import createGenres from '../../../utils/createGenres';

const Card = ({ title, releaseDate, overview, img, rate, genres }) => {
  const isImg = img === '';

  const listGenres = useContext(ContextMovies);

  let genresBorderColor = '';
  if (rate <= 3) genresBorderColor = '#E90000';
  if (rate > 3 && rate <= 5) genresBorderColor = '#E97E00';
  if (rate > 5 && rate <= 7) genresBorderColor = '#E9D100';
  if (rate > 7) genresBorderColor = '#66E900';

  return (
    <li className="content__list-item">
      <span className="overall-rating" style={{ border: `2px solid ${genresBorderColor}` }}>
        {String(rate).slice(0, 3)}
      </span>
      <img className="pic" src={isImg ? photo : img} alt={`${title}`} />
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{releaseDate}</p>
        <ListGenre arrGenres={createGenres(listGenres, genres)} />
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
