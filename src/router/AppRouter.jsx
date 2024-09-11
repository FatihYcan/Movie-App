import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import TvDetail from "../pages/TvDetail";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";
import Search from "../pages/Search";
import PopularMovie from "../pages/PopularMovie";
import NowPlaying from "../pages/NowPlaying";
import TopRatedMovie from "../pages/TopRatedMovie";
import Upcoming from "../pages/Upcoming";
import TrendingMovie from "../pages/TrendingMovie";
// import TodayMovie from "../pages/TodayMovie";
// import WeekMovie from "../pages/WeekMovie";

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
          <Route path="/search" element={<Search />} />
          <Route path="/movie" element={<PopularMovie />} />
          <Route path="/movie/now-playing" element={<NowPlaying />} />
          <Route path="/movie/top-rated" element={<TopRatedMovie />} />
          <Route path="/movie/upcoming" element={<Upcoming />} />

          <Route path="/movie/trending" element={<TrendingMovie />} />
            {/* <Route index path="" element={<TodayMovie />} /> */}
            {/* <Route path="this-week" element={<WeekMovie />} /> */}
          {/* </Route> */}
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
