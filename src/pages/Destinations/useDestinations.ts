import { useEffect, useState } from "react";
import { Destination } from "../../types";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const useDestinations = (searchFilter?: string) => {
  const [destinations, setDestinations] = useState<Destination[] | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationsRef = collection(db, "destinations");
        let destinationsQuery = query(destinationsRef);

        if (searchFilter) {
          destinationsQuery = query(
            destinationsRef,
            where("title", "==", searchFilter.toLowerCase())
          );
        }

        const unsubscribe = onSnapshot(
          destinationsQuery,
          (destinationsSnapshot) => {
            const filteredDestinations: Destination[] =
              destinationsSnapshot.docs.map((doc) => {
                const destinationData = doc.data();

                return {
                  ...destinationData,
                } as Destination;
              });

            setDestinations(filteredDestinations);
          }
        );

        return () => unsubscribe();
      } catch (err) {
        console.error(`Error while fetching destinations: ${err}`);
      }
    };

    fetchDestinations();
  }, [searchFilter]);

  return destinations;
};
