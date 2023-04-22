import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { logIn, selectUser } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleContinueWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider());

      if (!user) throw new Error(`User not found`);

      const { displayName, email, uid, photoURL } = user.user;

      if (displayName && email && uid && photoURL) {
        await setDoc(doc(db, "users", uid), {
          displayName,
          email,
          uid,
          photoURL,
        });

        dispatch(logIn({ displayName, email, uid, photoURL }));
      }
    } catch (err) {
      console.error(`Error while continuing with google: ${err}`);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <button
        className="rounded-3xl bg-indigo-500 px-8 py-3 text-lg"
        onClick={handleContinueWithGoogle}
      >
        Continue with google
      </button>
    </div>
  );
};

export default SignUp;
