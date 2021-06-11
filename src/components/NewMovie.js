import React, { useState } from "react";
import Button from "./UI/Button";
import MovieForm from "./MovieForm";
import "./NewMovie.css";

function NewMovie(props) {
  const [isEditing, setIsEditing] = useState(false);

  const startEdittingHandler = () => {
    setIsEditing(true);
  };

  const stopEdittingHandler = () => {
    setIsEditing(false);
  };

  const saveMovieDataHandler = (enteredMovieData) => {
    const movieData = {
      ...enteredMovieData,
      id: Math.random().toString(),
    };
    props.onAdd(movieData);
    setIsEditing(false);
  };

  return (
    <div className="new-movie">
      {!isEditing && (
        <Button onClick={startEdittingHandler}>Add New Movie</Button>
      )}
      {isEditing && (
        <MovieForm
          onCancel={stopEdittingHandler}
          onAdd={saveMovieDataHandler}
        ></MovieForm>
      )}
    </div>
  );
}

export default NewMovie;
