import { Link } from "react-router-dom";

const GetStartedBtn = () => {
  return (
    <Link
      to="/destinations"
      className="mx-auto block w-full max-w-xs rounded-3xl bg-indigo-500 px-5 py-3 text-center shadow-sm"
    >
      Get started!
    </Link>
  );
};

export default GetStartedBtn;
