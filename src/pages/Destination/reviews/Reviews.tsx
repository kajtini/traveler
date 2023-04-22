import AddReviewForm from "./AddReviewForm";
import ReviewsList from "./ReviewsList";

interface ReviewsProps {
  destinationId: string;
}

const Reviews = ({ destinationId }: ReviewsProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2 text-lg font-bold">See what other people think</p>
        <AddReviewForm destinationId={destinationId} />
      </div>
      <ReviewsList />
    </div>
  );
};

export default Reviews;
