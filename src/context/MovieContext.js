import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
