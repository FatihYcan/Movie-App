import { useEffect, useRef } from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { useAuthContext } from "../context/AuthContext";
import { Container, Row } from "react-bootstrap";
import { useTvContext } from "../context/TvContext";
import TvCard from "../components/TvCard";

const Main = () => {
  const { movies, loading, getMovies } = useMovieContext();
  const { tv, getTv } = useTvContext();

  console.log(tv)

  const inputRef = useRef();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const SEARCH_MOVIE_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const SEARCH_TV_API = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;
  const MOVIE_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  const TV_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieSearch = inputRef.current.value;
    localStorage.setItem("moviesearch", movieSearch);
    const tvSearch = inputRef.current.value;
    localStorage.setItem("tvsearch", tvSearch);
    if (movieSearch && tvSearch) {
      getMovies(SEARCH_MOVIE_API + movieSearch);
      getTv(SEARCH_TV_API + tvSearch);
    } else {
      getMovies(MOVIE_API);
      getTv(TV_API);
    }
  };

  useEffect(() => {
    const savedMovieSearch = localStorage.getItem("moviesearch") || "";
    if (inputRef.current) {
      inputRef.current.value = savedMovieSearch;
    }
  }, []);

  useEffect(() => {
    const savedTvSearch = localStorage.getItem("tvsearch") || "";
    if (inputRef.current) {
      inputRef.current.value = savedTvSearch;
    }
  }, []);

  return (
    <Container className="p-1">
      <form className="flex justify-center p-2 mt-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
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
        <>
          <>
            <h1 className="md:text-2xl font-semibold">Movies</h1>
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
          </>
          <>
            <h1 className="md:text-2xl font-semibold">TV</h1>
            <Row
              xs={2}
              sm={3}
              md={4}
              lg={5}
              xl={6}
              className="g-4 mb-4 justify-content-center"
            >
              <TvCard tv={tv} />
            </Row>
          </>
        </>
      )}
    </Container>
  );
};

export default Main;
