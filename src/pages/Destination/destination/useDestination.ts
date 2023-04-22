import { useState, useEffect } from "react";
import { Destination } from "../../../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const useDestination = (destinationId: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      const destinationRef = doc(db, "destinations", destinationId);
      const destinationSnapshot = await getDoc(destinationRef);

      const destinationData = destinationSnapshot.data() as Destination;

      setDestination(destinationData);
    };

    fetchDestination();
  }, []);

  return destination;
};
