import { useState } from "react";
import { useReviews } from "./useReviews";
import ReviewExcerpt from "./ReviewExcerpt";

interface ReviewsListProps {
  destinationId: string;
}

const ReviewsList = ({ destinationId }: ReviewsListProps) => {
  // TODO: Allow user to paginate through data

  // const [currentPage, setCurrentPage] = useState(1);
  // const PER_PAGE = 6;

  const reviews = useReviews(destinationId);

  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews?.map((review) => (
          <ReviewExcerpt
            key={review.id}
            review={review}
            destinationId={destinationId}
          />
        ))}
      </ul>

      <div className="mx-auto grid max-w-xs grid-cols-2 gap-5 sm:mx-0 sm:ml-auto">
        <button className="rounded-3xl border border-indigo-500 py-2 ">
          Previous
        </button>
        <button className="rounded-3xl bg-indigo-500 py-2 hover:bg-indigo-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsList;
