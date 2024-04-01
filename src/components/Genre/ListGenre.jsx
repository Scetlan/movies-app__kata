function ListGenre({ arrGenres }) {
  return (
    <ul className="genres">
      {arrGenres.map(genre => (
        <li key={genre.id} className="genres__item">
          {genre.value}
        </li>
      ))}
    </ul>
  );
}

export default ListGenre;
