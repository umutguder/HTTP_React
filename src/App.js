import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import NewMovie from "./components/NewMovie";
import Button from "./components/UI/Button";
import "./App.css";
import useHttp from "./hooks/use-http";

function App() {
  const [movies, setMovies] = useState([]);

  const { isLoading, error, sendRequest: fetchMoviesSelect } = useHttp();

  const transformMovies = (movieObjs) => {
    const loadedMovies = [];

    for (const key in movieObjs) {
      loadedMovies.push({
        id: key,
        title: movieObjs[key].title,
        openingText: movieObjs[key].openingText,
        releaseDate: movieObjs[key].releaseDate,
      });
    }

    setMovies(loadedMovies);
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMoviesSelect]);

  async function fetchMovies(movie) {
    fetchMoviesSelect(
      {
        url: "https://react-http-8f511-default-rtdb.firebaseio.com/movies.json",
      },
      transformMovies
    );
  }

  const { isLoadingaDD, erroraDD, sendRequest: addMovieReq } = useHttp();

  async function addMovieHandler(movie) {
    addMovieReq(
      {
        url: "https://react-http-8f511-default-rtdb.firebaseio.com/movies.json",
        method: "POST",
        body: movie,
        header: { "Content-Type": "application/json" },
      },
      fetchMovies
    );
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <div>
        <NewMovie onAdd={addMovieHandler}></NewMovie>
        <section>
          <Button onClick={fetchMovies}>Fetch Movies</Button>
        </section>
        <section>{content}</section>
      </div>
    </React.Fragment>
  );
}

export default App;
