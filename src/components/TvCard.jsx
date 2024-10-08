import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const TvCard = ({ tv, path }) => {
  const navigate = useNavigate();

  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <>
      {tv.map((tv) => {
        const { name, poster_path, overview, vote_average, id } = tv;

        return (
          <Col key={id}>
            <Card
              onClick={() => navigate(`/tv/${id}`, { state: { from: path } })}
              className="movie-card"
            >
              <div className="movie">
                <Card.Img
                  variant="top"
                  src={poster_path ? IMG_API + poster_path : defaultImage}
                  alt={name}
                  className="movie-img"
                />
                <Card.Text className="movie-over">
                  <span className="line-clamp-3">{overview}</span>
                </Card.Text>
              </div>

              <Card.Body>
                <Card.Title>
                  <h5 className="text-white line-clamp-2">{name}</h5>
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
  );
};

export default TvCard;
