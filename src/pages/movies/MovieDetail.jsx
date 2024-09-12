import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../../components/VideoSection";
import { Card, Container } from "react-bootstrap";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState("");
  const [videoKey, setVideoKey] = useState();

  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
    popularity,
  } = movieDetail;

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetail(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <Container className="py-5">
      <div className="flex flex-col md:flex-row max-w-6xl rounded-lg bg-gray-100 dark:bg-gray-dark-second shadow-lg">
        <Card.Img
          variant="top"
          src={poster_path ? baseImageUrl + poster_path : defaultImage}
          alt={title}
          className="md:w-1/3"
        />
        <div className="p-6 flex flex-col justify-between md:w-2/3">
          {videoKey && <VideoSection videoKey={videoKey} />}
          <div>
            <h1 className="text-gray-900 dark:text-gray-50 xs:text-xl md:text-2xl font-medium mb-2">
              {title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
              {overview}
            </p>
          </div>
          <ul className="rounded-lg border border-gray-400 text-gray-900 dark:text-gray-300  ">
            <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
              {"Release Date : " + release_date}
            </li>
            <li className="px-6 py-2 border-b border-gray-400 w-full">
              {"Rate : " + vote_average}
            </li>
            <li className="px-6 py-2 border-b border-gray-400 w-full">
              {"Total Vote : " + vote_count}
            </li>
            <li className="px-6 py-2 border-b border-gray-400 w-full">
              {"Popularity : " + popularity}
            </li>
            <li className="px-6 py-2 border-gray-400 w-full rounded-t-lg">
              <Link
                to={-1}
                className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
              >
                Go Back
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default MovieDetail;
