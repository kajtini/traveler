import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";

export const useReviewLikes = (destinationId: string, reviewId: string) => {
  const [likes, setLikes] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (destinationId && reviewId) {
          const likesRef = collection(
            db,
            "destinations",
            destinationId,
            "reviews",
            reviewId,
            "likes"
          );

          const unsubscribe = onSnapshot(likesRef, (likesSnapshot) => {
            const likedUIDs = likesSnapshot.docs.map((doc) => doc.data().uid);

            setLikes(likedUIDs);
          });

          return () => unsubscribe();
        }
      } catch (err) {
        console.error(`Error while fetching likes: ${err}`);
      }
    };

    fetchLikes();
  }, [destinationId, reviewId]);

  return likes;
};
