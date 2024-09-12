import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toastWarnNotify } from "../helper/ToastNotify";
import { useMovieContext } from "../context/MovieContext";
import { useTvContext } from "../context/TvContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchTvCard from "../components/SearchTvCard";
import SearchMovieCard from "../components/SearchMovieCard";

const Search = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialQuery = queryParams.get("query");
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const {
    movies,
    getMovies,
    moviePage,
    setMoviePage,
    movieTotalPages,
    movieResults,
  } = useMovieContext();
  const { tv, getTv, tvPage, setTvPage, tvTotalPages, tvResults } =
    useTvContext();

  const [movieActive, setMovieActive] = useState(true);
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
      setMovieActive(true);
      setTvActive(false);
    } else {
      toastWarnNotify("Please enter a text");
    }
  };
  useEffect(() => {
    if (query) {
      getMovies(SEARCH_MOVIE_API, 20);
      getTv(SEARCH_TV_API, 20);
    }
  }, [moviePage, tvPage]);

  const handleMoiveClick = () => {
    setMovieActive(true);
    setTvActive(false);
    window.history.pushState(
      null,
      "",
      `/search/movie?query=${encodeURIComponent(query)}`
    );
    getMovies(SEARCH_MOVIE_API, 20);
    setMoviePage(1);
    setTvPage(1);
  };

  const handleTvClick = () => {
    setMovieActive(false);
    setTvActive(true);
    window.history.pushState(
      null,
      "",
      `/search/tv?query=${encodeURIComponent(query)}`
    );
    getTv(SEARCH_TV_API, 20);
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>
      <div className="text-sm rounded-2xl border-solid border-2 border-black flex w-11/12 md:w-3/4 lg:w-2/4 m-auto justify-between mb-3">
        <div
          className={
            movieActive
              ? "  flex w-1/2 justify-center items-center gap-3 font-semibold md:text-xl py-2 bg-black text-white rounded-xl"
              : "text-black px-3 md:text-xl rounded-full font-semibold dark:text-white flex w-1/2 justify-center items-center gap-3"
          }
        >
          <button onClick={handleMoiveClick}>Movies</button>
          <span>{movieResults}</span>
        </div>
        <div
          className={
            tvActive
              ? " flex w-1/2 justify-center items-center gap-3 font-semibold md:text-xl py-2 bg-black text-white rounded-xl"
              : "text-black md:px-3 gap-2 md:text-xl rounded-full font-semibold dark:text-white flex w-1/2 justify-center items-center md:gap-3"
          }
        >
          <button onClick={handleTvClick}>Tv Shows</button>
          <span>{tvResults}</span>
        </div>
      </div>
      {movieActive && <SearchMovieCard movies={movies} />}
      {tvActive && <SearchTvCard tv={tv} />}
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
    </Container>
  );
};

export default Search;
