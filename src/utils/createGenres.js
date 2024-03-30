const createGenres = (genres, idGenres) => {
  const collectionsGenres = new Map();
  genres.forEach((genre) => collectionsGenres.set(genre.id, genre.name));
  const newGenres = idGenres.map((id) => collectionsGenres.get(id));

  return newGenres.map((genre) => { return { id: self.crypto.randomUUID(), value: genre[0].toUpperCase() + genre.slice(1) } });
}

export default createGenres;