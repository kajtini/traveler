import { Rating } from "../../../types";

interface RatingExcerptProps {
  rating: Rating;
  handleRatingClick: (ratingId: number) => void;
}

const RatingExcerpt = ({ rating, handleRatingClick }: RatingExcerptProps) => {
  return (
    <li
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 ${
        rating.isSelected && "bg-green-600"
      }`}
      key={rating.id}
      onClick={() => {
        handleRatingClick(rating.id);
      }}
    >
      {rating.rating}
    </li>
  );
};

export default RatingExcerpt;
