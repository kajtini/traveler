import { useState, useEffect } from "react";
import { User } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);

        const user: User = userSnapshot.data() as User;

        setUser(user);
      } catch (err) {
        console.error(`Error while fetching the user ${err}`);
      }
    };

    fetchUser();
  }, []);

  return user;
};
