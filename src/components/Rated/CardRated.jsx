import photo from '../Content/ListCard/img/noPhoto.jpg';
import ContextMovies from '../../service/ContextMovies';
import ListGenre from '../Genre/ListGenre';
import createGenres from '../../utils/createGenres';
import SwapiService from '../../service/swapiService';
import { Rate } from 'antd';

import { useContext, useEffect, useState } from 'react';

const api = new SwapiService();

function CardRated({ movie }) {
  const { title, posterPath, releaseDate, overview, id, voteAverage, genreIds, rating } = movie;
  const isImg = posterPath === '';

  const listGenres = useContext(ContextMovies);

    // eslint-disable-next-line
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    let genresBorderColor = '';
    if (voteAverage <= 3) genresBorderColor = 'genresColorRed';
    if (voteAverage > 3 && voteAverage <= 5) genresBorderColor = 'genresColorOrange';
    if (voteAverage > 5 && voteAverage <= 7) genresBorderColor = 'genresColorYellow';
    if (voteAverage > 7) genresBorderColor = 'genresColorGreen';

  const handleRating = rate => {
    if (rate === 0) {
      api.deleteRating(id);
      return;
    }
    api.postAddRating(id, rate);
  };

  const createGenre = createGenres(listGenres, genreIds);

  const desktop = (
    <>
      <span className={`overall-rating ${genresBorderColor}`}>
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
      <span className={`overall-rating ${genresBorderColor}`}>
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
