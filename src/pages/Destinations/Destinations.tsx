import DestinationHeader from "./DestinationHeader";
import DestinationsList from "./DestinationsList";
import SearchDestinationForm from "./SearchDestinationForm";

const Destinations = () => {
  return (
    <div className="w-full flex-grow py-10">
      <DestinationHeader />
      <DestinationsList />
    </div>
  );
};

export default Destinations;
