import { useEffect, useState } from "react";
import { Destination } from "../../types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const useDestinations = (filter?: string) => {
  const [destinations, setDestinations] = useState<Destination[] | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationsRef = collection(db, "destinations");
        let destinationsQuery = query(destinationsRef);

        if (filter) {
          destinationsQuery = query(
            destinationsRef,
            where("title", "==", filter.toLowerCase())
          );
        }

        const destinationsQuerySnapshot = await getDocs(destinationsQuery);

        const filteredDestinations: Destination[] =
          destinationsQuerySnapshot.docs.map((doc) => {
            const destinationData = doc.data();

            return {
              id: destinationData.id,
              title: destinationData.title,
              description: destinationData.description,
              imgURL: destinationData.imgURL,
              rating: destinationData.rating,
              numRatings: destinationData.numRatings,
            };
          });

        setDestinations(filteredDestinations);
      } catch (err) {
        console.error(`Error while fetching destinations: ${err}`);
      }
    };

    fetchDestinations();
  }, [filter]);

  return destinations;
};
