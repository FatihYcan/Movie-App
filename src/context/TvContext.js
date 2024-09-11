import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const TvContext = createContext();

export const useTvContext = () => {
  return useContext(TvContext);
};

const TvContextProvider = ({ children }) => {
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTv = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setTv(res.data.results.slice(0, 12));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <TvContext.Provider value={{ tv, loading, getTv }}>
      {children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;
