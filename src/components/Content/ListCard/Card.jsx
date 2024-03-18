import React from 'react';
import photo from './img/noPhoto.jpg';
import ListGenre from '../../Genre/ListGenre';
import { Rate } from 'antd';
// import { SwapiServiceConsumer } from '../../../service/ProviderMovies';

const Card = ({ title, releaseDate, overview, img, rate }) => {
  const isImg = img === '';

  return (
    <li className="content__list-item">
      {/* <SwapiServiceConsumer>
        {value => {
          const rate = value;
          console.log(rate);
          return <span className="overall-rating">{value}</span>;
        }}
      </SwapiServiceConsumer> */}
      <span className="overall-rating">
        {String(rate).slice(0, 3)}
        {/* {rate} */}
        </span>
      <img className="pic" src={isImg ? photo : img} alt={`${title}`} />
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{releaseDate}</p>
        <ListGenre />
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
