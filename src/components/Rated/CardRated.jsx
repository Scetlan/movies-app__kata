import React, { useContext } from 'react';
import photo from '../Content/ListCard/img/noPhoto.jpg';
import { ContextMovies } from '../../service/ContextMovies';
import ListGenre from '../Genre/ListGenre';
import { Rate } from 'antd';
import createGenres from '../../utils/createGenres';
import { SwapiService } from '../../service/swapiService';

const api = new SwapiService();

const CardRated = ({ movie }) => {
  const { title, poster_path, release_date, overview, id, vote_average, genre_ids, rating } = movie;
  const isImg = poster_path === '';

  const listGenres = useContext(ContextMovies);

  let genresBorderColor = '';
  if (vote_average <= 3) genresBorderColor = '#E90000';
  if (vote_average > 3 && vote_average <= 5) genresBorderColor = '#E97E00';
  if (vote_average > 5 && vote_average <= 7) genresBorderColor = '#E9D100';
  if (vote_average > 7) genresBorderColor = '#66E900';

  const style = {
    position: 'absolute',
    top: '11px',
    right: '8px',
    borderRadius: '100%',
    padding: '6px 8px',
    border: `2px solid ${genresBorderColor}`,
  };

  const handleRating = rate => {
    if (rate === 0) {
      api.deleteRating(id);
      return;
    }
    api.postAddRating(id, JSON.stringify({ value: rate }));
  };

  const createGenre = createGenres(listGenres, genre_ids);

  return (
    <li className="content__list-item">
      <span className="overall-rating" style={style}>
        {String(vote_average).slice(0, 3)}
      </span>
      <img className="pic" src={isImg ? photo : poster_path} alt={`${title}`} />
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{release_date}</p>
        <ListGenre arrGenres={createGenre} />
        <p className="plot-movie">{overview}</p>
        <Rate
          allowHalf
          allowClear={false}
          count={10}
          style={{ fontSize: 16 }}
          onChange={handleRating}
          defaultValue={rating}
        />
      </div>
    </li>
  );
};

export default CardRated;
