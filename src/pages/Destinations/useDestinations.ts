import { useEffect, useState } from "react";
import { Destination } from "../../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[] | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationsRef = collection(db, "destinations");
        const destinationsSnapshot = await getDocs(destinationsRef);

        const filteredDestinations: Destination[] =
          destinationsSnapshot.docs.map((doc) => {
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
  }, []);

  return destinations;
};
