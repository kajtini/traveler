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

interface ReviewExcerptProps {
  review: Review;
  destinationId: string;
}

const ReviewExcerpt = ({ review, destinationId }: ReviewExcerptProps) => {
  const [likes, setLikes] = useState<string[] | null>(null);

  const user = useAppSelector(selectUser);
  const reviewCreator = useUser(review.uid);
  const formattedTimestamp = formatTimestamp(review.timestamp);

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

  const hasUserLiked = likes?.find((uid) => uid === user?.uid);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesRef = collection(
          db,
          "destinations",
          destinationId,
          "reviews",
          review.id,
          "likes"
        );

        const unsubscribe = onSnapshot(likesRef, (likesSnapshot) => {
          const likedUIDs = likesSnapshot.docs.map((doc) => doc.data().uid);

          setLikes(likedUIDs);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error(`Error while fetching likes: ${err}`);
      }
    };
    fetchLikes();
  }, []);

  return (
    <li className="rounded-3xl border-t border-slate-700 bg-slate-800 p-6">
      <div className="mb-2 flex items-center gap-3">
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
          <p className="text-sm text-slate-400">{likes?.length}</p>
        </div>
      </div>

      <p className="leading-8 text-slate-400">{review.content}</p>
    </li>
  );
};

export default ReviewExcerpt;
