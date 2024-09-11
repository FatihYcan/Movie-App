import axios from "axios";
import { createContext, useContext, useState } from "react";

export const TvContext = createContext();

export const useTvContext = () => {
  return useContext(TvContext);
};

const TvContextProvider = ({ children }) => {
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tvPage, setTvPage] = useState(1);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [tvTotalPages, setTvTotalPages] = useState(1);
  const [tvResults, setTvResults] = useState(1);

  const getTv = (url, limit = 12) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setTv(res.data.results.slice(0, limit, tvPage));
        setTvTotalPages(res.data.total_pages);
        setTvResults(res.data.total_results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <TvContext.Provider
      value={{
        tv,
        loading,
        getTv,
        tvPage,
        setTvPage,
        tvTotalPages,
        tvResults,
        setTvResults,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;
