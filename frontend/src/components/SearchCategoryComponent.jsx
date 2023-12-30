
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchCategoryComponent = ({ searchCategory, setSearchCategory, searchResult, handleSearchCategory }) => (
  <div className="mt-8 w-1/2 mx-auto">
    <h2 className="text-2xl font-600 mb-4">Search by  Mapped Category</h2>
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
        placeholder="Enter Mapped category "
        className="mr-2 p-2 border border-gray-300 rounded"
      />
      <button onClick={()=>{handleSearchCategory();
      setSearchCategory('');
      }} className="bg-blue-500 text-white p-2 cursor-pointer rounded md:gap-2 flex">
        <FontAwesomeIcon icon={faSearch} className='mt-1' /> Search
      </button>
    </div>
    {searchResult.length > 0 && (
      <div className="mt-4">
        <h3 className="text-xl font-600 mb-2">Search Results:</h3>
        {searchResult.map(info => (
          <li key={info._id} className="mb-2">
            {info.name}
          </li>
        ))}
      </div>
    )}
  </div>
);

export default SearchCategoryComponent;
