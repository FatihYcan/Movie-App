import { Button, Container, Row, Spinner } from "react-bootstrap";
import { useMovieContext } from "../../context/MovieContext";
import { useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PopularMovie = () => {
  const {
    movies,
    getMovies,
    moviePage,
    setMoviePage,
    movieTotalPages,
    loading,
  } = useMovieContext();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const MOVIE_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${moviePage}`;

  useEffect(() => {
    getMovies(MOVIE_API, 20);
  }, [moviePage]);

  const handlePage = (event, value) => {
    setMoviePage(value);
  };

  return (
    <Container className="p-2">
      {loading ? (
        <div className="text-center mt-2">
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
          <h1 className="md:text-2xl font-semibold dark:text-white px-2 my-2">
            Popular Movies
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
            {movieTotalPages > 1 && (
              <Stack>
                <Pagination
                  count={movieTotalPages}
                  page={moviePage}
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

export default PopularMovie;
