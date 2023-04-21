import { FaPaperPlane } from "react-icons/fa";

const AddReviewForm = () => {
  return (
    <form className=" flex items-center justify-between rounded-3xl border-t border-slate-700 bg-slate-800 py-2 pl-5 pr-3">
      <input
        className="w-full bg-transparent focus:outline-none"
        type="text"
        placeholder="Share your experience..."
      />
      <button className="rounded-3xl bg-indigo-500 px-6 py-2 hover:bg-indigo-700">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default AddReviewForm;
