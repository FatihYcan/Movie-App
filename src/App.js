import React from "react";
import AppRouter from "./router/AppRouter";
import AuthContextProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import MovieContextProvider from "./context/MovieContext";
import TvContextProvider from "./context/TvContext";

const App = () => {
  return (
    // <div className="dark:bg-gray-dark-main min-h-screen">
    <div className="dark:bg-[#004366] min-h-screen">
      <AuthContextProvider>
        <MovieContextProvider>
        <TvContextProvider>
          <AppRouter />
          <ToastContainer />
        </TvContextProvider>
        </MovieContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
