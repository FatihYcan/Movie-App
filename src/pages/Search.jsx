import { useState } from "react";
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

  const { movies, loading, getMovies } = useMovieContext();
  const { tv, getTv } = useTvContext();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const SEARCH_MOVIE_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const SEARCH_TV_API = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query)}`);

    const movieSearch = query;
    sessionStorage.setItem("moviesearch", movieSearch);
    const tvSearch = query;
    sessionStorage.setItem("tvsearch", tvSearch);
    if (movieSearch && tvSearch) {
      getMovies(SEARCH_MOVIE_API + movieSearch);
      getTv(SEARCH_TV_API + tvSearch);
    } else {
      toastWarnNotify("Please enter a text");
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
    </Container>
  );
};

export default Search;
