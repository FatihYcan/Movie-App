import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const TvContext = createContext();

export const useTvContext = () => {
  return useContext(TvContext);
};

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;

const TvContextProvider = ({ children }) => {
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTv(FEATURED_API);
  }, []);

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

  console.log(tv);

  return (
    <TvContext.Provider value={{ tv, loading, getTv }}>
      {children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;
