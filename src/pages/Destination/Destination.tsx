import { useParams } from "react-router-dom";
import { useDestination } from "./destination/useDestination";
import DestinationOverview from "./destination/DestinationOverview";
import Reviews from "./reviews/Reviews";

const Destination = () => {
  const { id: destinationId } = useParams();

  if (!destinationId) return <div>No destiantion id specified</div>;

  const destination = useDestination(destinationId);

  if (!destination) return <div>No destination found!</div>;

  return (
    <div className="flex flex-grow flex-col justify-center gap-8 py-10">
      <DestinationOverview destination={destination} />
      <Reviews destinationId={destination.id} />
    </div>
  );
};

export default Destination;
