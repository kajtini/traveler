import { RiStarSFill } from "react-icons/ri";
import { Destination } from "../../types";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";

interface DestinationExcerptProps {
  destination: Destination;
}

const DestinationExcerpt = ({ destination }: DestinationExcerptProps) => {
  return (
    <li className="flex flex-col  overflow-hidden rounded-3xl">
      <img
        className="h-full max-h-36 object-cover"
        src={destination.imgURL}
        alt={`"${destination.title} image"`}
      />

      <div className="flex flex-grow flex-col items-center  gap-4 bg-slate-800 p-5">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-3xl font-bold">{destination.title}</h3>
          <Rating
            numRatings={destination.numRatings}
            size="small"
            rating={destination.rating}
          />
        </div>
        <p className="self-start text-slate-400">{destination.description}</p>

        <Link
          to={`/destinations/${destination.id}`}
          className="mt-auto w-full rounded-3xl bg-indigo-500 py-2 text-center hover:bg-indigo-700"
        >
          See more!
        </Link>
      </div>
    </li>
  );
};

export default DestinationExcerpt;
