import Description from "./Description";
import GetStartedBtn from "./GetStartedBtn";

const Home = () => {
  return (
    <div className="flex w-full flex-grow flex-col justify-center">
      <Description />
      <GetStartedBtn />
    </div>
  );
};

export default Home;
