import React from "react";
import { Destination } from "../../../types";
import Rating from "../../../components/Rating";
import DestinationImage from "./DestinationImage";
import DestinationInfo from "./DestinationInfo";

interface DestinationOverviewProps {
  destination: Destination;
}

const DestinationOverview = ({ destination }: DestinationOverviewProps) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-8">
      <DestinationImage
        destinationTitle={destination.title}
        imgURL={destination.imgURL}
      />
      <DestinationInfo destination={destination} />
    </div>
  );
};

export default DestinationOverview;
