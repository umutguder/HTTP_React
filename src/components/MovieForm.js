import React, { useState, useRef } from "react";
import Button from "./UI/Button";
import ErrorModal from "./UI/ErrorModal";
import styles from "./MovieForm.module.css";

const ExpenseForm = (props) => {
  /* ref keeps real dom element*/
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredOpeningText, setEnteredOpeningText] = useState("");
  const [enteredReleaseDate, setEnteredReleaseDate] = useState("");

  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidOpeningText, setIsValidOpeningText] = useState(true);
  const [isValidReleaseDate, setIsValidReleaseDate] = useState(true);

  const [error, setError] = useState();

  const titleChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValidTitle(true);
    }
    setEnteredTitle(event.target.value);
  };

  const openingTextChangeHandler = (event) => {
    setEnteredOpeningText(event.target.value);
    if (event.target.value.trim().length > 0) {
      setIsValidOpeningText(true);
    }
  };

  const releaseDateChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValidReleaseDate(true);
    }
    setEnteredReleaseDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    /* Refs are better to use if only read is required 
    read/write => use hooks with useState
    Setting value for refs are not react way 
    it uses html dom manipulation thus not recommended
    Controlled component: the internal state is controlled by react 
    if u add ref to an input and set its value then it is controlled*/
    const enteredTitleRef = titleRef.current.value;
    const enteredOpeningTextRef = openingTextRef.current.value;
    const enteredReleaseDateRef = releaseDateRef.current.value;

    if (enteredTitleRef.trim().length === 0) {
      setIsValidTitle(false);
      setError({
        title: "Invalid Input",
        message: "Please enter a valid Title",
      });
    }

    if (enteredOpeningTextRef.trim().length === 0) {
      setIsValidOpeningText(false);
      setError({
        title: "Invalid Input",
        message: "Please enter a valid opening text",
      });
    }

    if (enteredReleaseDateRef.trim().length === 0) {
      setIsValidReleaseDate(false);
      setError({
        title: "Invalid Input",
        message: "Please enter a valid release date",
      });
    }

    if (
      enteredTitleRef.trim().length === 0 ||
      enteredOpeningTextRef.trim().length === 0 ||
      enteredReleaseDateRef.trim().length === 0
    ) {
      return;
    }

    const movieData = {
      title: enteredTitleRef,
      openingText: enteredOpeningTextRef,
      releaseDate: new Date(enteredReleaseDateRef).toLocaleDateString("en-US"),
    };

    props.onAdd(movieData);

    setEnteredTitle("");
    setEnteredOpeningText("");
    setEnteredReleaseDate("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}
      <form onSubmit={submitHandler}>
        <div className={styles["new-expense__controls"]}>
          <div
            className={`${styles["new-expense__control"]} ${
              !isValidTitle && styles.invalid
            }`}
          >
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              ref={titleRef}
            />
          </div>
          <div
            className={`${styles["new-expense__control"]} ${
              !isValidOpeningText && styles.invalid
            }`}
          >
            <label>Opening Text</label>
            <input
              type="text"
              value={enteredOpeningText}
              onChange={openingTextChangeHandler}
              ref={openingTextRef}
            />
          </div>

          <div
            className={`${styles["new-expense__control"]} ${
              !isValidReleaseDate && styles.invalid
            }`}
          >
            <label>Release Date</label>
            <input
              type="date"
              min="1900-01-01"
              max="2022-12-31"
              value={enteredReleaseDate} // Two way binding
              onChange={releaseDateChangeHandler}
              ref={releaseDateRef}
            />
          </div>
        </div>
        <div className={styles["new-expense__actions"]}>
          <Button type="button" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Movie</Button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
