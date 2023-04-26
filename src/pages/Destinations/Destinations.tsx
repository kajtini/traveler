import DestinationsList from "./DestinationsList";
import SearchDestinationForm from "./SearchDestinationForm";
import { useState } from "react";

const Destinations = () => {
  const [filter, setFilter] = useState("");

  console.log(filter);

  return (
    <div className="w-full flex-grow py-10">
      <div className="mb-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <h2 className="text-4xl font-bold">Destinations</h2>
        <SearchDestinationForm setFilter={setFilter} />
      </div>
      <DestinationsList filter={filter} />
    </div>
  );
};

export default Destinations;
