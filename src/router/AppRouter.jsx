import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";
import Search from "../pages/Search";

// tv pages
import AiringToday from "../pages/tv/AiringToday";
import OnTheAir from "../pages/tv/OnTheAir";
import PopularTv from "../pages/tv/PopularTv";
import TopRatedTv from "../pages/tv/TopRatedTv";
import TrendingTv from "../pages/tv/TrendingTv";
import TvDetail from "../pages/tv/TvDetail";

// movie pages
import MovieDetail from "../pages/movies/MovieDetail";
import NowPlaying from "../pages/movies/NowPlaying";
import PopularMovie from "../pages/movies/PopularMovie";
import TopRatedMovie from "../pages/movies/TopRatedMovie";
import TrendingMovie from "../pages/movies/TrendingMovie";
import Upcoming from "../pages/movies/Upcoming";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<TvDetail />} />
        </Route>
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<PopularMovie />} />
        <Route path="/movie/now-playing" element={<NowPlaying />} />
        <Route path="/movie/top-rated" element={<TopRatedMovie />} />
        <Route path="/movie/upcoming" element={<Upcoming />} />
        <Route path="/movie/trending" element={<TrendingMovie />} />
        <Route path="/tv/airing-today" element={<AiringToday />} />
        <Route path="/tv/on-the-air" element={<OnTheAir />} />
        <Route path="/tv" element={<PopularTv />} />
        <Route path="/tv/top-rated" element={<TopRatedTv />} />
        <Route path="/tv/trending" element={<TrendingTv />} />
      </Routes>
    </>
  );
};

export default AppRouter;
