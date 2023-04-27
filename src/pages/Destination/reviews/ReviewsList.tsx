import { useState } from "react";
import { useReviews } from "./useReviews";
import ReviewExcerpt from "./ReviewExcerpt/ReviewExcerpt";
import { Review } from "../../../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

interface ReviewsListProps {
  destinationId: string;
}

const ReviewsList = ({ destinationId }: ReviewsListProps) => {
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
    </div>
  );
};

export default ReviewsList;
