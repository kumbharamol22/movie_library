const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function readMoviesData() {
  const data = fs.readFileSync("movie-list.json");
  return JSON.parse(data);
}

function writeMoviesData(movies) {
  fs.writeFileSync("movie-list.json", JSON.stringify(movies));
}

app.get("/api/getMovies", (req, res) => {
  const movies = readMoviesData();
  res.json(movies);
});

app.get("/api/getMovies/:id", (req, res) => {
  const movies = readMoviesData();
  const movieId = req.params.id;
  const movie = movies.find((movie) => movie.id === Number(movieId));
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json(movie);
});

app.post("/api/addMovie", (req, res) => {
  const movies = readMoviesData();
  const newMovie = req.body;
  const existingMovie = movies.find((movie) => movie.id === newMovie.id);
  if (existingMovie) {
    return res
      .status(400)
      .json({ error: "Movie with the same ID already exists" });
  }

  let largestId = 0;
  for (const movie of movies) {
    if (movie.id && movie.id > largestId) {
      largestId = movie.id;
    }
  }

  newMovie.id = largestId + 1;
  movies.push(newMovie);
  writeMoviesData(movies);
  res.json(newMovie);
});

app.put("/api/updateMovie/:id", (req, res) => {
  const movies = readMoviesData();
  const movieId = req.params.id;
  const updatedMovie = req.body;
  const index = movies.findIndex((movie) => movie.id === Number(movieId));
  if (index === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }
  if (
    !updatedMovie.name ||
    !updatedMovie.details ||
    !updatedMovie.genre ||
    !updatedMovie.actors ||
    !updatedMovie.releaseDate
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  updatedMovie.id = Number(movieId);
  movies[index] = updatedMovie;
  writeMoviesData(movies);
  res.json(updatedMovie);
});

app.delete("/api/deleteMovie/:id", (req, res) => {
  const movies = readMoviesData();
  const movieId = req.params.id;
  const index = movies.findIndex((movie) => movie.id === Number(movieId));
  if (index !== -1) {
    movies.splice(index, 1);
    writeMoviesData(movies);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running`);
});
