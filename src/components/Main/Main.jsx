import React from 'react';
import Card from './ListCard/Card';

const Main = ({ state }) => {
  return (
    <main className="content">
      <ul className='content__list'>
        {state.map(({ title, backdrop_path, release_date, overview, id }) => {
          return (
          <Card
            id={id}
            title={title}
            releaseDate={release_date}
            overview={overview}
            img={backdrop_path}
          />)
        })}
      </ul>
    </main>
  );
};

export default Main;
