interface DestinationImageProps {
  destinationTitle: string;
  imgURL: string;
}

const DestinationImage = ({
  imgURL,
  destinationTitle,
}: DestinationImageProps) => {
  return (
    <img
      className="mb-5 max-h-[300px] w-full rounded-3xl object-cover md:mb-0 md:max-h-[500px] md:max-w-sm lg:max-w-xl"
      src={imgURL}
      alt={`${destinationTitle} image`}
    />
  );
};

export default DestinationImage;
