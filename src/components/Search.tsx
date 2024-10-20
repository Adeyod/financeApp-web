import { FaSearchDollar } from 'react-icons/fa';

const Search = ({ searchValue, setSearchValue, handleKeyPress }) => {
  console.log(searchValue);
  return (
    <div className="flex justify-center items-center">
      <div className="relative min-w-64 w-[70vw] md:w-[60vw]">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 pr-10 rounded-lg w-full"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <FaSearchDollar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default Search;
