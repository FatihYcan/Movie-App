import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTvContext } from "../context/TvContext";
import TvCard from "../components/TvCard";

const PopularTv = () => {
  const { tv, loading, getTv, tvPage, setTvPage, tvTotalPages } =
    useTvContext();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const TV_API = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${tvPage}`;

  useEffect(() => {
    getTv(TV_API, 20);
  }, [tvPage]);

  const handlePage = (event, value) => {
    setTvPage(value);
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
              Popular Tv Shows
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
                  count={tvTotalPages}
                  page={tvPage}
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

export default PopularTv;
