import { Button, Container, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TvCard from "../../components/TvCard";
import { useTvContext } from "../../context/TvContext";

const TrendingTv = () => {
  const { tv, getTv, tvPage, setTvPage, tvTotalPages } = useTvContext();

  const [dayActive, setDayActive] = useState(true);
  const [weekActive, setWeekActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const path = window.location.pathname + window.location.search;
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const DAY_API = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&page=${tvPage}`;
  const WEEK_API = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&page=${tvPage}`;

  useEffect(() => {
    getTv(DAY_API, 20);
    getTv(WEEK_API, 20);
    setLoading(false);
  }, [tvPage]);

  const handlePage = (event, value) => {
    setTvPage(value);
  };

  const handleWeekClick = () => {
    setWeekActive(true);
    setDayActive(false);
    getTv(WEEK_API, 20);
    setTvPage(1);
  };

  const handleDayClick = () => {
    setWeekActive(false);
    setDayActive(true);
    getTv(DAY_API, 20);
    setTvPage(1);
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
          <div className="flex px-2 my-2 items-center">
            <h1 className="md:text-2xl font-semibold dark:text-white mr-2">
              Trending Tv Shows
            </h1>

            <div className="rounded-full border-solid border-2 border-black dark:bg-[#004366]">
              <Button
                variant="link"
                size="sm"
                className={
                  dayActive
                    ? "active bg-black text-white"
                    : "active text-black dark:text-white"
                }
                onClick={handleDayClick}
              >
                Today
              </Button>

              <Button
                variant="link"
                size="sm"
                className={
                  weekActive
                    ? "active bg-black text-white"
                    : "active text-black dark:text-white"
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
            <TvCard tv={tv} path={path} />
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

export default TrendingTv;
