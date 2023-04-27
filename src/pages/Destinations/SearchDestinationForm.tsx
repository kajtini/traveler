import { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

interface SearchDestinationFormProps {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SearchDestinationForm = ({
  setSearchFilter,
}: SearchDestinationFormProps) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchFilter(search);
  };

  return (
    <form
      className="flex items-center justify-between rounded-3xl border-t border-slate-700 bg-slate-800 px-5 py-2"
      onSubmit={handleSearchSubmit}
    >
      <input
        className="bg-transparent focus:outline-none"
        type="text"
        placeholder="Search destination..."
        value={search}
        onChange={handleSearchChange}
      />

      <button>
        <RxMagnifyingGlass size={20} />
      </button>
    </form>
  );
};

export default SearchDestinationForm;
