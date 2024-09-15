import { useEffect, useRef } from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { useTvContext } from "../context/TvContext";
import TvCard from "../components/TvCard";
import { toastWarnNotify } from "../helper/ToastNotify";

const Main = () => {
  const { movies, getMovies, loading } = useMovieContext();
  const { tv, getTv } = useTvContext();
  const inputRef = useRef();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const MOVIE_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`;
  const TV_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=vote_count.desc`;
  const path = window.location.pathname + window.location.search;

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieSearch = inputRef.current.value;
    sessionStorage.setItem("moviesearch", movieSearch);
    const tvSearch = inputRef.current.value;
    sessionStorage.setItem("tvsearch", tvSearch);
    if (movieSearch && tvSearch) {
      window.location.href = `/search?query=${encodeURIComponent(
        inputRef.current.value
      )}`;
    } else {
      toastWarnNotify("Please enter a text");
    }
  };

  useEffect(() => {
    getMovies(MOVIE_API);
    getTv(TV_API);
  }, []);

  return (
    <Container className="p-1">
      <form className="flex justify-center p-2 mt-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie or tv show..."
          ref={inputRef}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center">
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </div>
      ) : (
        <>
          <h1 className="md:text-2xl font-semibold dark:text-white px-2 mb-2">
            Movies
          </h1>
          <Row
            xs={2}
            sm={3}
            md={4}
            lg={5}
            xl={6}
            className="g-4 mb-4 justify-content-center"
          >
            <MovieCard movies={movies} path={path} />
          </Row>

          <h1 className="md:text-2xl font-semibold dark:text-white px-2 mb-2">
            TV Shows
          </h1>
          <Row
            xs={2}
            sm={3}
            md={4}
            lg={5}
            xl={6}
            className="g-4 mb-4 justify-content-center"
          >
            <TvCard tv={tv} path={path} />
          </Row>
        </>
      )}
    </Container>
  );
};

export default Main;
