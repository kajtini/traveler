import { RiStarSFill } from "react-icons/ri";

interface RatingProps {
  rating: number;
  numRatings: number;
  size: "small" | "medium" | "large";
}

const Rating = ({ rating, size, numRatings }: RatingProps) => {
  return (
    <div className="flex items-center gap-1">
      <RiStarSFill size={20} className="fill-yellow-400" />
      <p
        className={`${size === "medium" && "text-lg"} ${
          size === "large" && "text-xl"
        }`}
      >
        {rating} <span className="text-slate-400">({numRatings})</span>
      </p>
    </div>
  );
};

export default Rating;
