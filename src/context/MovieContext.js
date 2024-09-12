import axios from "axios";
import { createContext, useContext, useState } from "react";

export const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [movieTotalPages, setMovieTotalPages] = useState(1);
  const [movieResults, setMovieResults] = useState(1);
  const [loading, setLoading] = useState(true);

  const getMovies = (url, limit = 12) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setMovies(res.data.results.slice(0, limit, moviePage));
        setMovieTotalPages(res.data.total_pages);
        setMovieResults(res.data.total_results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <MovieContext.Provider
      value={{
        movies,
        getMovies,
        moviePage,
        setMoviePage,
        movieTotalPages,
        movieResults,
        setMovieResults,
        loading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
