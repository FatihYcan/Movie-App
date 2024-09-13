import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toastWarnNotify } from "../helper/ToastNotify";
import { useMovieContext } from "../context/MovieContext";
import { useTvContext } from "../context/TvContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchTvCard from "../components/SearchTvCard";
import SearchMovieCard from "../components/SearchMovieCard";

const Search = () => {
  const {
    movies,
    getMovies,
    moviePage,
    setMoviePage,
    movieTotalPages,
    movieResults,
    loading,
  } = useMovieContext();
  const { tv, getTv, tvPage, setTvPage, tvTotalPages, tvResults } =
    useTvContext();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialQuery = queryParams.get("query");
  const [query, setQuery] = useState(initialQuery);

  const path = window.location.pathname + window.location.search;

  const navigate = useNavigate();

  const [movieActive, setMovieActive] = useState(false);
  const [tvActive, setTvActive] = useState(false);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const SEARCH_MOVIE_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${moviePage}`;
  const SEARCH_TV_API = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}&page=${tvPage}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query)}`);
    const movieSearch = query;
    sessionStorage.setItem("moviesearch", movieSearch);
    const tvSearch = query;
    sessionStorage.setItem("tvsearch", tvSearch);
    if (movieSearch && tvSearch) {
      getMovies(SEARCH_MOVIE_API, 20);
      getTv(SEARCH_TV_API, 20);
    } else {
      toastWarnNotify("Please enter a text");
    }
  };

  useEffect(() => {
    if (query) {
      getMovies(SEARCH_MOVIE_API, 20);
      getTv(SEARCH_TV_API, 20);
      setMovieActive(true);
      setTvActive(false);
    }
    if (path === `/search/tv${search}`) {
      setMovieActive(false);
      setTvActive(true);
    }
  }, [moviePage, tvPage]);

  const handleMoiveClick = () => {
    setMovieActive(true);
    setTvActive(false);
    window.history.pushState(null, "", `/search/movie${search}`);
    setMoviePage(1);
    setTvPage(1);
  };

  const handleTvClick = () => {
    setMovieActive(false);
    setTvActive(true);
    window.history.pushState(null, "", `/search/tv${search}`);
    setMoviePage(1);
    setTvPage(1);
  };

  const handlePage = (event, value) => {
    if (movieActive) {
      setMoviePage(value);
    } else {
      setTvPage(value);
    }
  };

  return (
    <Container className="p-1">
      <form className="flex justify-center p-2 mt-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie or tv show..."
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
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
          <div className="text-sm rounded-2xl border-solid border-2 border-black flex w-11/12 md:w-3/4 lg:w-2/4 m-auto justify-between mb-3">
            <div
              className={
                movieActive
                  ? "searchactive py-2 bg-black text-white rounded-xl"
                  : "searchactive text-black px-3 rounded-full dark:text-white "
              }
            >
              <button onClick={handleMoiveClick}>Movies</button>
              <span
                className={
                  movieActive
                    ? "bg-white text-black px-2 rounded-md"
                    : "bg-black text-white px-2 rounded-md"
                }
              >
                {movieResults}
              </span>
            </div>
            <div
              className={
                tvActive
                  ? "searchactive py-2 bg-black text-white rounded-xl"
                  : "searchactive text-black px-3 rounded-full dark:text-white"
              }
            >
              <button onClick={handleTvClick}>TV Shows</button>
              <span
                className={
                  tvActive
                    ? "bg-white text-black px-2 rounded-md"
                    : "bg-black text-white px-2 rounded-md"
                }
              >
                {tvResults}
              </span>
            </div>
          </div>
          {movieActive && <SearchMovieCard movies={movies} />}
          {movieActive && movieResults === 0 && (
            <p className="text-center dark:text-white">
              There are no movies that matched your query.
            </p>
          )}
          {tvActive && <SearchTvCard tv={tv} />}
          {tvActive && tvResults === 0 && (
            <p className="text-center dark:text-white">
              There are no TV shows that matched your query.
            </p>
          )}
          <div className="mb-3 flex justify-center">
            {movieActive && movieTotalPages > 1 && (
              <Stack>
                <Pagination
                  count={movieTotalPages}
                  page={moviePage}
                  onChange={handlePage}
                  color="success"
                />
              </Stack>
            )}
            {tvActive && tvTotalPages > 1 && (
              <Stack>
                <Pagination
                  count={tvTotalPages}
                  page={tvPage}
                  onChange={handlePage}
                  color="success"
                />
              </Stack>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default Search;
