import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setMovies(res.data.results.slice(0, 12));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <MovieContext.Provider value={{ movies, loading, getMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
