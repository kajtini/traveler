import { useState, useEffect } from "react";
import { Destination } from "../../../types";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const useDestination = (destinationId: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      const destinationRef = doc(db, "destinations", destinationId);

      const unsubscribe = onSnapshot(destinationRef, (destinationSnapshot) => {
        const destinationData = destinationSnapshot.data();

        setDestination(destinationData as Destination);
      });

      return () => unsubscribe();
    };

    fetchDestination();
  }, [destinationId]);

  return destination;
};
