import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Button, Card, CardGroup, Col } from "react-bootstrap";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ movies }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  console.log(movies);

  return (
    <>
      {movies.map((movie) => {
        const { title, poster_path, overview, vote_average, id } = movie;

        return (
          <Col key={id}>
            <Card
              onClick={() => navigate("/details/" + id)}
              className="movie-card"
            >
              <div className="movie">
                <Card.Img
                  variant="top"
                  src={poster_path ? IMG_API + poster_path : defaultImage}
                  alt={title}
                  className="movie-img"
                />
                <Card.Text className="movie-over">
                  <p className="line-clamp-3">{overview}</p>
                </Card.Text>
              </div>

              <Card.Body>
                <Card.Title>
                  <h5 className="text-white line-clamp-2">{title}</h5>
                </Card.Title>
              </Card.Body>
              <p className={`tag ${getVoteClass(vote_average)}`}>
                {vote_average.toFixed(1)}
              </p>
            </Card>
          </Col>
        );
      })}
    </>

    // <div
    //   className="movie-card"
    //   id="container"
    //   onClick={() => navigate("/details/" + id)}
    // >
    //   <div className="movie">
    //     <img
    //       loading="lazy"
    //       src={poster_path ? IMG_API + poster_path : defaultImage}
    //       alt="movie-card"

    //     />
    //     <div className="movie-over">
    //       <p className=" line-clamp-3">{overview}</p>
    //     </div>
    //   </div>

    //   <div
    //     className={
    //       currentUser
    //         ? "movie-footer justify-between gap-1 px-2"
    //         : "movie-footer justify-center"
    //     }
    //   >
    //     <h5>{title}</h5>
    //     {currentUser && (
    //       <span className={`tag ${getVoteClass(vote_average)}`}>
    //         {vote_average.toFixed(1)}
    //       </span>
    //     )}
    //   </div>
    // </div>
  );
};

export default MovieCard;
