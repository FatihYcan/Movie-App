import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTvContext } from "../context/TvContext";
import TvCard from "../components/TvCard";

const TopRatedTv = () => {
  const { tv, loading, getTv, page, setPage, tvPages } = useTvContext();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const TV_API = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`;

  useEffect(() => {
    getTv(TV_API, 20);
  }, [page]);

  const handlePage = (event, value) => {
    setPage(value);
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
              Top Rated Tv Shows
            </h1>
            <Row
              xs={2}
              sm={3}
              md={4}
              lg={5}
              className="g-4 mb-4 justify-content-center"
            >
              <TvCard tv={tv} />
            </Row>
            <div className="mb-3 flex justify-center">
              <Stack>
                <Pagination
                  count={tvPages}
                  page={page}
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

export default TopRatedTv;
