import { Container, Row } from "react-bootstrap";
import { useMovieContext } from "../context/MovieContext";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const NowPlaying = () => {
  const {
    movies,
    loading,
    getMovies,
    moviePage,
    setMoviePage,
    movieTotalPages,
  } = useMovieContext();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const MOVIE_API = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${moviePage}`;

  useEffect(() => {
    getMovies(MOVIE_API, 20);
  }, [moviePage]);

  const handlePage = (event, value) => {
    setMoviePage(value);
  };

  return (
    <Container className="p-2">
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
            <h1 className="md:text-2xl font-semibold dark:text-white px-2 my-2">
              Now Playing Movies
            </h1>
            <Row
              xs={2}
              sm={3}
              md={4}
              lg={5}
              className="g-4 mb-4 justify-content-center"
            >
              <MovieCard movies={movies} />
            </Row>
            <div className="mb-3 flex justify-center">
              <Stack>
                <Pagination
                  count={movieTotalPages}
                  page={moviePage}
                  onChange={handlePage}
                  color="success"
                />
              </Stack>
            </div>
          </>
        </>
      )}
    </Container>
  );
};

export default NowPlaying;
