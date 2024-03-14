import React from 'react';

const Card = ({ title, releaseDate, overview, img }) => {
  const isImg = img === '';
  return (
    <li className={`content__list-item`}>
      {isImg ? <div className='pic'>No Photo</div> : <img className="pic" src={img} alt={`${title}`}/>}
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{releaseDate}</p>
        <p className="plot">{overview}</p>
      </div>
    </li>
  );
};

export default Card;
