import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import TvDetail from "../pages/TvDetail";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";
import Search from "../pages/Search";

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
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
