import React from "react";

const Card = ({ title, releaseDate, overview, img, id }) => {
  console.log(`AAAAA:${img}`);
  return (
    <li className={`content__list-item ${id}`}>
      <img className="pic" src={img} alt={`${title}`} />
      <div className="description">
        <h2 className="title">{title}</h2>
        <p className="date">{releaseDate}</p>
        <p className="plot">{overview}</p>
      </div>
    </li>
  )
}



export default Card;
