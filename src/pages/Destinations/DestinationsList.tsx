import DestinationExcerpt from "./DestinationExcerpt";
import { useDestinations } from "./useDestinations";

const DestinationsList = () => {
  const destinations = useDestinations();

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {destinations?.map((destination) => (
        <DestinationExcerpt key={destination.id} destination={destination} />
      ))}
    </ul>
  );
};

export default DestinationsList;
