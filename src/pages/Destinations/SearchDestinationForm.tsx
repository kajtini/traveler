import { RxMagnifyingGlass } from "react-icons/rx";

const SearchDestinationForm = () => {
  return (
    <form className="flex items-center justify-between rounded-3xl border-t border-slate-700 bg-slate-800 px-5 py-2">
      <input
        className="bg-transparent focus:outline-none"
        type="text"
        placeholder="Search destination..."
      />

      <button>
        <RxMagnifyingGlass size={20} />
      </button>
    </form>
  );
};

export default SearchDestinationForm;
