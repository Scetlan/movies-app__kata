import photo from '../Content/ListCard/img/noPhoto.jpg';
import ContextMovies from '../../service/ContextMovies';
import ListGenre from '../Genre/ListGenre';
import createGenres from '../../utils/createGenres';
import SwapiService from '../../service/swapiService';
import { Rate } from 'antd';

import { useContext } from 'react';

const api = new SwapiService();

function CardRated({ movie }) {
  const { title, posterPath, releaseDate, overview, id, voteAverage, genreIds, rating } = movie;
  const isImg = posterPath === '';

  const listGenres = useContext(ContextMovies);

  let genresBorderColor = '';
  if (voteAverage <= 3) genresBorderColor = '#E90000';
  if (voteAverage > 3 && voteAverage <= 5) genresBorderColor = '#E97E00';
  if (voteAverage > 5 && voteAverage <= 7) genresBorderColor = '#E9D100';
  if (voteAverage > 7) genresBorderColor = '#66E900';

  const style = {
    position: 'absolute',
    display: 'flex',
    top: '11px',
    right: '8px',
    borderRadius: '100%',
    padding: '4px 5px',
    'font-size': '12px',
    border: `2px solid ${genresBorderColor}`,
  };

  const handleRating = rate => {
    if (rate === 0) {
      api.deleteRating(id);
      return;
    }
    api.postAddRating(id, JSON.stringify({ value: rate }));
  };

  const createGenre = createGenres(listGenres, genreIds);

  const desktop = (
    <>
      <span className="overall-rating" style={style}>
        {String(voteAverage).slice(0, 3)}
      </span>
      <img className="pic" src={isImg ? photo : posterPath} alt={`${title}`} />
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{releaseDate}</p>
        <ListGenre arrGenres={createGenre} />
        <p className="plot-movie">{overview}</p>
      </div>
      <Rate
        className="rate-stars"
        allowHalf
        allowClear={false}
        count={10}
        style={{ fontSize: 16 }}
        onChange={handleRating}
        defaultValue={rating}
      />
    </>
  );
  const mobile = (
    <>
      <span className="overall-rating" style={style}>
        {String(voteAverage).slice(0, 3)}
      </span>
      <div className="block-mobile">
        <img className="pic" src={isImg ? photo : posterPath} alt={`${title}`} />
        <div className="description">
          <h2 className="title">{title}</h2>
          <p className="date">{releaseDate}</p>
          <ListGenre arrGenres={createGenre} />
        </div>
      </div>
      <p className="plot-movie">{overview}</p>
      <Rate
        className="rate-stars"
        allowHalf
        allowClear={false}
        count={10}
        style={{ fontSize: 16 }}
        onChange={handleRating}
        defaultValue={rating}
      />
    </>
  );

  return <li className="content__list-item">{window.innerWidth >= 1000 ? desktop : mobile}</li>;
}

export default CardRated;
