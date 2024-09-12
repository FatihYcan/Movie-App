import { Button, Container, Row, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTvContext } from "../../context/TvContext";
import TvCard from "../../components/TvCard";

const TopRatedTv = () => {
  const { tv, getTv, tvPage, setTvPage, tvTotalPages, loading } =
    useTvContext();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const TV_API = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${tvPage}`;

  useEffect(() => {
    getTv(TV_API, 20);
  }, [tvPage]);

  const handlePage = (event, value) => {
    setTvPage(value);
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
            {tvTotalPages > 1 && (
              <Stack>
                <Pagination
                  count={tvTotalPages}
                  page={tvPage}
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

export default TopRatedTv;
