import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getMovies = (url, limit = 12) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setMovies(res.data.results.slice(0, limit, page));
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <MovieContext.Provider
      value={{ movies, loading, getMovies, page, setPage, totalPages }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
