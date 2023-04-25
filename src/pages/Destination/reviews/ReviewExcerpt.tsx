import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Review } from "../../../types";
import { useUser } from "../../../hooks/useUser";
import { formatTimestamp } from "../../../utils/formatTimestamp";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/user/userSlice";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useEffect, useState } from "react";
import { useReviewLikes } from "./useReviewLikes";
import { FaTrash } from "react-icons/fa";

interface ReviewExcerptProps {
  review: Review;
  destinationId: string;
}

const ReviewExcerpt = ({ review, destinationId }: ReviewExcerptProps) => {
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
    } catch (err) {
      console.error(`Error while removing the review: ${err}`);
    }
  };

  return (
    <li className="rounded-3xl border-t border-slate-700 bg-slate-800 p-6">
      <div className="mb-2 flex items-center gap-3">
        {isUserTheCreator && (
          <FaTrash
            size={20}
            className="cursor-pointer fill-slate-600 hover:fill-red-400"
            onClick={deleteReview}
          />
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

      <p className="leading-8 text-slate-400">{review.content}</p>
    </li>
  );
};

export default ReviewExcerpt;
