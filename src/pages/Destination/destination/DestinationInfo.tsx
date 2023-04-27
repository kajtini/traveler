import Rating from "../../../components/Rating";
import { Destination } from "../../../types";
import { uppercaseFirstLetter } from "../../../utils/uppercaseFirstLetter";

interface DestinationInfoProps {
  destination: Destination;
}

const DestinationInfo = ({ destination }: DestinationInfoProps) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {uppercaseFirstLetter(destination.title)}
        </p>
        <div className="md:hidden">
          <Rating
            numRatings={destination.numRatings}
            size="medium"
            rating={destination.rating}
          />
        </div>
        <div className="hidden md:block">
          <Rating
            numRatings={destination.numRatings}
            size="large"
            rating={destination.rating}
          />
        </div>
      </div>
      <p className="leading-7 text-slate-400 md:text-lg">
        {destination.description} Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Consectetur placeat architecto maxime aliquam
        veritatis tenetur aspernatur quia voluptatibus ad iure rerum quidem
        beatae, consequuntur voluptas sunt atque ullam laboriosam ut harum
        repellat a ipsum, earum quas. Nesciunt reprehenderit dolorum possimus.
      </p>
    </div>
  );
};

export default DestinationInfo;
