import { useEffect, useState } from "react";
import { Review } from "../../../types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const useReviews = (destinationId: string) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(
          db,
          "destinations",
          destinationId,
          "reviews"
        );
        const reviewsQuery = query(reviewsRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(reviewsQuery, (reviewsSnapshot) => {
          const filteredReviews: Review[] = reviewsSnapshot.docs.map((doc) => {
            const reviewData: Review = doc.data() as Review;

            return {
              content: reviewData.content,
              id: reviewData.id,
              timestamp: reviewData.timestamp,
              uid: reviewData.uid,
            };
          });

          setReviews(filteredReviews);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error(`Error while fetching reviews: ${err}`);
      }
    };

    fetchReviews();
  }, []);

  return reviews;
};
