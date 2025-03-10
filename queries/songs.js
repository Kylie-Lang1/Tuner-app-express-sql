const db = require("../db/dbConfig");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getOneSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};

// CREATE
const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateSong = async (id, song) => {
  try {
    const updatedsong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite, id]
    );
    return updatedsong;
  } catch (error) {
    return error;
  }
};

// Ordering alphabetically
const orderSongs = async () => {
  try {
    const orderedSongs = await db.any("SELECT * FROM songs ORDER BY name ASC")
    return orderedSongs
  } catch (error) {
    return error
  }
}

// Ordering in reverse alphabetical order
const reverseSongs = async () => {
  try {
    const reverse = await db.any("SELECT * FROM songs ORDER BY name DESC")
    return reverse
  } catch (error) {
    return error
  }
}

// Selects favorited songs
const isFavorite = async () => {
  try {
    const favorites = await db.any("SELECT * FROM songs WHERE is_favorite = true")
    return favorites
  } catch (error) {
    return error
  }
}

// Selects songs not favorited
const isNotFavorite = async () => {
  try {
    const notFavorites = await db.any("SELECT * FROM songs WHERE is_favorite = false")
    return notFavorites
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllSongs,
  getOneSong,
  createSong,
  deleteSong,
  updateSong,
  orderSongs,
  reverseSongs,
  isFavorite,
  isNotFavorite
};