import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toastWarnNotify } from "../helper/ToastNotify";
import { useMovieContext } from "../context/MovieContext";
import { useTvContext } from "../context/TvContext";

const Search = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialQuery = queryParams.get("query");
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const {
    movies,
    loading,
    getMovies,
    page,
    moviePages,
    setMoviePages,
    movieResults,
    setMovieResults,
  } = useMovieContext();
  const { tv, getTv, tvPages, setTvPages, tvResults, setTvResults } =
    useTvContext();

  const [movieActive, setMovieActive] = useState(true);
  const [tvActive, setTvActive] = useState(false);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const SEARCH_MOVIE_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  const SEARCH_TV_API = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`;

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
    }
  }, []);

  // console.log("movies", movies);
  // console.log("tv", tv);
  // console.log("movie pages", moviePages);
  // console.log("tvPages", tvPages);
  // console.log("movieResults", movieResults);

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
      <div className=" rounded-2xl border-solid border-2 border-black flex w-2/4 m-auto justify-between">
        <div className="flex w-1/2 justify-center gap-3 font-semibold text-xl py-2 ">
          <button
          // className={
          //   weekActive
          //     ? "rounded-full px-3 bg-black text-white text-decoration-none font-semibold"
          //     : "text-decoration-none text-black px-3 rounded-full font-semibold dark:text-white"
          // }
          // onClick={handleWeekClick}
          >
            Movies
          </button>
          <span>{movieResults}</span>
        </div>
        <div className="flex w-1/2 justify-center gap-3 font-semibold text-xl py-2 cursor-pointer">
          <p>Tv Shows</p>
          <span>{tvResults}</span>
        </div>
      </div>
    </Container>
  );
};

export default Search;
