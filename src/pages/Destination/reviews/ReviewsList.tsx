import ReviewExcerpt from "./ReviewExcerpt";
import { useReviews } from "./useReviews";

interface ReviewsListProps {
  destinationId: string;
}

const ReviewsList = ({ destinationId }: ReviewsListProps) => {
  const reviews = useReviews(destinationId);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews?.map((review) => (
        <ReviewExcerpt
          key={review.id}
          review={review}
          destinationId={destinationId}
        />
      ))}
    </ul>
  );
};

export default ReviewsList;
