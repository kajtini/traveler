import { useState } from "react";
import { Rating, Review } from "../../../types/index";
import { FaPaperPlane } from "react-icons/fa";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/userSlice";
import RatingExcerpt from "./RatingExcerpt";

interface AddReviewFormProps {
  destinationId: string;
}

const AddReviewForm = ({ destinationId }: AddReviewFormProps) => {
  const [content, setContent] = useState("");
  const [ratings, setRatings] = useState<Rating[]>([
    {
      id: 0,
      rating: 1,
      isSelected: false,
    },
    {
      id: 1,
      rating: 2,
      isSelected: false,
    },
    { id: 2, rating: 3, isSelected: false },
    { id: 3, rating: 4, isSelected: false },
    { id: 4, rating: 5, isSelected: false },
  ]);

  const user = useAppSelector(selectUser);

  const selectedRatingValue = ratings?.find(
    (rating) => rating.isSelected
  )?.rating;

  const canPostReview = selectedRatingValue && content;

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!user) throw new Error(`User is not signed in`);

      if (canPostReview) {
        const reviewsRef = collection(
          db,
          "destinations",
          destinationId,
          "reviews"
        );

        const review: Review = {
          uid: user.uid,
          content,
          timestamp: Timestamp.now(),
          rating: selectedRatingValue,
          id: "",
        };

        const addedReview = await addDoc(reviewsRef, review);

        await updateDoc(
          doc(db, "destinations", destinationId, "reviews", addedReview.id),
          {
            id: addedReview.id,
          }
        );

        await updateDoc(doc(db, "destinations", destinationId), {
          numRatings: increment(1),
          rating: 0,
        });

        setContent("");
        resetRatings();
      }
    } catch (err) {
      console.error(`Error while adding the review: ${err}`);
    }
  };

  const handleRatingClick = (ratingId: number) => {
    setRatings((prevRatings) =>
      prevRatings.map((rating) => {
        return rating.id === ratingId
          ? { ...rating, isSelected: true }
          : { ...rating, isSelected: false };
      })
    );
  };

  const resetRatings = () => {
    setRatings((prevRatings) =>
      prevRatings.map((rating) => ({ ...rating, isSelected: false }))
    );
  };

  console.log(selectedRatingValue);

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={handleReviewSubmit}
    >
      <ul className="flex items-center gap-3 self-center">
        {ratings.map((rating) => (
          <RatingExcerpt
            key={rating.id}
            rating={rating}
            handleRatingClick={handleRatingClick}
          />
        ))}
      </ul>

      <div className="flex flex-grow items-center justify-between rounded-3xl border-t border-slate-700 bg-slate-800 py-2 pl-5 pr-3">
        <input
          className="w-full bg-transparent focus:outline-none"
          type="text"
          placeholder="Share your experience..."
          value={content}
          onChange={handleContentChange}
        />
        <button
          className="rounded-3xl bg-indigo-500 px-6 py-2 hover:bg-indigo-700 disabled:bg-slate-600"
          disabled={!canPostReview}
        >
          <FaPaperPlane />
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;
