import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <p>{props.openingText}</p>
      <h3>{props.releaseDate}</h3>
    </li>
  );
};

export default Movie;
