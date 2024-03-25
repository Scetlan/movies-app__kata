import React from "react";

const createGenres = (genres, idGenres) => {
  const collectionsGenres = new Map();
  genres.forEach((genre) => collectionsGenres.set(genre.id, genre.name));
  const newGenres = idGenres.map((id) => collectionsGenres.get(id));
  
   return newGenres.map((genre) => genre[0].toUpperCase() + genre.slice(1));
}

export default createGenres;