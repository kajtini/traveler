import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Review } from "../../../../types";
import { useUser } from "../../../../hooks/useUser";
import { formatTimestamp } from "../../../../utils/formatTimestamp";
import { useAppSelector } from "../../../../app/hooks";
import { selectUser } from "../../../../features/user/userSlice";
import {
  deleteDoc,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useReviewLikes } from "../useReviewLikes";
import { FaTrash, FaEdit } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
import { useState } from "react";
import EditReviewForm from "./EditReviewForm";

interface ReviewExcerptProps {
  review: Review;
  destinationId: string;
}

const ReviewExcerpt = ({ review, destinationId }: ReviewExcerptProps) => {
  const [editedReviewContent, setEditedReviewContent] = useState(
    review.content
  );
  const [isEditing, setIsEditing] = useState(false);
  const [canSubmitEdit, setCanSubmitEdit] = useState(false);

  const likes = useReviewLikes(destinationId, review.id);

  const user = useAppSelector(selectUser);
  const reviewCreator = useUser(review.uid);
  const formattedTimestamp = formatTimestamp(review.timestamp);

  const hasUserLiked = likes?.find((uid) => uid === user?.uid);
  const isUserTheCreator = user?.uid === reviewCreator?.uid;

  const addLike = async () => {
    try {
      if (!user) throw new Error(`User is not logged in`);

      await setDoc(
        doc(
          db,
          "destinations",
          destinationId,
          "reviews",
          review.id,
          "likes",
          user.uid
        ),
        {
          uid: user.uid,
        }
      );
    } catch (err) {
      console.error(`Error while adding like: ${err}`);
    }
  };

  const removeLike = async () => {
    try {
      if (!user) throw new Error(`User is not logged in`);

      await deleteDoc(
        doc(
          db,
          "destinations",
          destinationId,
          "reviews",
          review.id,
          "likes",
          user?.uid
        )
      );
    } catch (err) {
      console.error(`Error while removing the like: ${err}`);
    }
  };

  const deleteReview = async () => {
    try {
      await deleteDoc(
        doc(db, "destinations", destinationId, "reviews", review.id)
      );
      await updateDoc(doc(db, "destinations", destinationId), {
        numRatings: increment(-1),
      });
    } catch (err) {
      console.error(`Error while removing the review: ${err}`);
    }
  };

  const handleEditReviewSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();

      await updateDoc(
        doc(db, "destinations", destinationId, "reviews", review.id),
        {
          content: editedReviewContent,
        }
      );

      setIsEditing(false);
    } catch (err) {
      console.error(`Error while saving the edited review: ${err}`);
    }
  };

  const handleEditReviewContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setEditedReviewContent(e.target.value);

  const handleCancelEditReview = () => {
    setIsEditing(false);
  };

  const handleEditReviewClick = () => {
    setIsEditing(true);
  };

  return (
    <li className="rounded-3xl border-t border-slate-700 bg-slate-800 p-6">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex items-center gap-3">
          {isUserTheCreator && (
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <FaTrash
                size={20}
                className="cursor-pointer fill-slate-600 hover:fill-red-400"
                onClick={deleteReview}
              />
              <FaEdit
                size={20}
                className="cursor-pointer fill-slate-600 hover:fill-indigo-500"
                onClick={handleEditReviewClick}
              />
            </div>
          )}

          <img
            className="max-h-11 rounded-full"
            alt="user image"
            src={reviewCreator?.photoURL}
          />
          <div>
            <p className="font-bold">{reviewCreator?.displayName}</p>
            <p className=" text-slate-400">{formattedTimestamp}</p>
          </div>

          <span className="flex items-center self-start font-medium ">
            <RiStarSFill size={20} className="fill-yellow-400" />
            {review.rating}
          </span>
        </div>

        <div className="ml-auto flex flex-col items-center gap-1">
          {hasUserLiked ? (
            <AiFillHeart
              size={25}
              className="cursor-pointer fill-red-500"
              onClick={removeLike}
            />
          ) : (
            <AiOutlineHeart
              size={25}
              className="cursor-pointer"
              onClick={addLike}
            />
          )}
          <p className="text-sm text-slate-400">{likes?.length || 0}</p>
        </div>
      </div>

      {isEditing ? (
        <EditReviewForm
          editedReviewContent={editedReviewContent}
          handleCancelEditReview={handleCancelEditReview}
          handleEditReviewContentChange={handleEditReviewContentChange}
          handleEditReviewSubmit={handleEditReviewSubmit}
        />
      ) : (
        <p className="leading-8 text-slate-400">{review.content}</p>
      )}
    </li>
  );
};

export default ReviewExcerpt;
