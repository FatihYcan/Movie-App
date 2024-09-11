import axios from "axios";
import { createContext, useContext, useState } from "react";

export const TvContext = createContext();

export const useTvContext = () => {
  return useContext(TvContext);
};

const TvContextProvider = ({ children }) => {
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tvPages, setTvPages] = useState(1);
  const [tvResults, setTvResults] = useState(0);

  const getTv = (url, limit = 12) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setTv(res.data.results.slice(0, limit, page));
        setTvPages(res.data.total_pages);
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
        page,
        setPage,
        tvPages,
        setTvPages,
        tvResults,
        setTvResults,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;
