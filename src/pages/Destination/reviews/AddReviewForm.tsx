import { useState } from "react";
import { Review } from "../../../types/index";
import { FaPaperPlane } from "react-icons/fa";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/userSlice";

interface AddReviewFormProps {
  destinationId: string;
}

const AddReviewForm = ({ destinationId }: AddReviewFormProps) => {
  const user = useAppSelector(selectUser);

  const [content, setContent] = useState("");

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!user) throw new Error(`User is not signed in`);

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
        likes: 0,
        id: "",
      };

      const addedReview = await addDoc(reviewsRef, review);

      console.log(destinationId);

      await updateDoc(
        doc(db, "destinations", destinationId, "reviews", addedReview.id),
        {
          id: addedReview.id,
        }
      );

      setContent("");
    } catch (err) {
      console.error(`Error while adding the review: ${err}`);
    }
  };

  return (
    <form
      className=" flex items-center justify-between rounded-3xl border-t border-slate-700 bg-slate-800 py-2 pl-5 pr-3"
      onSubmit={handleReviewSubmit}
    >
      <input
        className="w-full bg-transparent focus:outline-none"
        type="text"
        placeholder="Share your experience..."
        value={content}
        onChange={handleContentChange}
      />
      <button className="rounded-3xl bg-indigo-500 px-6 py-2 hover:bg-indigo-700">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default AddReviewForm;
