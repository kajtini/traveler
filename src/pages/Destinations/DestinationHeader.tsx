import SearchDestinationForm from "./SearchDestinationForm";

const DestinationHeader = () => {
  return (
    <div className="mb-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
      <h2 className="text-4xl font-bold">Destinations</h2>
      <SearchDestinationForm />
    </div>
  );
};

export default DestinationHeader;
