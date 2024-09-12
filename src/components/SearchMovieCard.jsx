import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const SearchMovieCard = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {movies.map((movie) => {
        const { title, poster_path, overview, id, release_date } = movie;

        const newDate = new Date(release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div
            key={id}
            className="flex flex-row mb-4 max-w-5xl text-xs md:text-base h-32 md:h-44 xl:h-56 m-auto rounded-lg bg-[#032541] "
          >
            <Card.Img
              variant="top"
              src={poster_path ? IMG_API + poster_path : defaultImage}
              alt={title}
              className="w-1/5 md:w-1/6 cursor-pointer"
              onClick={() => navigate("/movie/" + id)}
            />
            <div className="p-3 flex flex-col justify-between w-4/5 md:w-5/6">
              <div>
                <h1 className="text-gray-50  font-medium mb-2">{title}</h1>
                <p className="mt-[-8px] mb-3 text-slate-500">{newDate}</p>
                <p className="text-gray-300 mb-4 line-clamp-2 md:line-clamp-3 xl:line-clamp-4">
                  {overview}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default SearchMovieCard;
