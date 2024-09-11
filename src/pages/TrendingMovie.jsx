import { Button, Container, Row } from "react-bootstrap";
import { useMovieContext } from "../context/MovieContext";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

const PopularMovie = () => {
  const { movies, loading, getMovies, page, setPage, totalPages } =
    useMovieContext();

  const [dayActive, setDayActive] = useState(true);
  const [weekActive, setWeekActive] = useState(false);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const DAY_API = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`;
  const WEEK_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`;

  useEffect(() => {
    getMovies(DAY_API, 20);
  }, [page]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handleWeekClick = () => {
    setWeekActive(true);
    setDayActive(false);
    getMovies(WEEK_API, 20);
    setPage(1);
  };

  const handleDayClick = () => {
    setWeekActive(false);
    setDayActive(true);
    getMovies(DAY_API, 20);
    setPage(1);
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
            <div className="flex px-2 my-2 items-center">
              <h1 className="md:text-2xl font-semibold dark:text-white mr-2">
                Trending Movies
              </h1>

              <div className=" rounded-full border-solid border-2 border-black ">
                <Button
                  size="sm"
                  variant="outline-primary"
                  className={
                    dayActive
                      ? "rounded-full px-3 bg-black text-white border-none"
                      : "border-none text-black hover:bg-white px-3 rounded-full bg-white"
                  }
                  onClick={handleDayClick}
                >
                  Today
                </Button>

                <Button
                  size="sm"
                  variant="outline-primary"
                  className={
                    weekActive
                      ? "rounded-full px-3 bg-black text-white border-none"
                      : "border-none text-black hover:bg-white px-3 rounded-full bg-white"
                  }
                  onClick={handleWeekClick}
                >
                  This Week
                </Button>
              </div>
            </div>
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
                  count={totalPages}
                  page={page}
                  onChange={handlePage}
                  color="success"
                />
              </Stack>
            </div>
          </>
        </>
      )}
      <Outlet />
    </Container>
  );
};

export default PopularMovie;
