import React, { useRef, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { toastWarnNotify } from "../helper/ToastNotify";
import { useAuthContext } from "../context/AuthContext";
import { Container, Row } from "react-bootstrap";

const Main = () => {
  const { movies, loading, getMovies } = useMovieContext();
  const { currentUser } = useAuthContext();
  // const [search, setSearch] = useState("");

  const inputRef = useRef();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  // const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (search && currentUser) {
    //   getMovies(SEARCH_API);
    // } else if (!currentUser) {
    //   toastWarnNotify("Please log in to search a movie");
    // } else {
    //   toastWarnNotify("Please enter a text");
    // }

    if (inputRef.current.value) {
      getMovies(SEARCH_API + inputRef.current.value);
    }
    // else if (!currentUser) {
    //   toastWarnNotify("Please log in to search a movie");
    // }
    else {
      // toastWarnNotify("Please enter a text");
      getMovies(FEATURED_API);
    }
  };

  return (
    <Container className="p-1">
      <form className="flex justify-center p-2 mt-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
          // onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <Row
        xs={2}
        sm={3}
        md={4}
        lg={5}
        xl={6}
        className="g-4 mb-4 justify-content-center"
        >
          <MovieCard movies={movies} />
        </Row>
      )}
    </Container>
  );
};

export default Main;
