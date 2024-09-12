import { Button, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TvCard from "../../components/TvCard";
import { useTvContext } from "../../context/TvContext";

const TrendingTv = () => {
  const { tv, getTv, tvPage, setTvPage, tvTotalPages } = useTvContext();

  const [dayActive, setDayActive] = useState(true);
  const [weekActive, setWeekActive] = useState(false);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const DAY_API = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&page=${tvPage}`;
  const WEEK_API = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&page=${tvPage}`;

  useEffect(() => {
    getTv(DAY_API, 20);
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
                  ? "rounded-full px-3 bg-black text-white text-decoration-none font-semibold"
                  : "text-decoration-none text-black px-3 rounded-full font-semibold dark:text-white"
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
                  ? "rounded-full px-3 bg-black text-white text-decoration-none font-semibold"
                  : "text-decoration-none text-black px-3 rounded-full font-semibold dark:text-white"
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
    </Container>
  );
};

export default TrendingTv;
