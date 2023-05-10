import { useState } from "react";
import Searchbar from "./Searchbar";
import SearchResult from "./SearchResult";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("artist");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Perform search API request and update searchResults state
    // ...

    setLoading(false);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <Searchbar
        searchTerm={searchTerm}
        searchType={searchType}
        onSearchTermChange={handleSearchTermChange}
        onSearchTypeChange={handleSearchTypeChange}
        onSearchSubmit={handleSearchSubmit}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SearchResult searchResults={searchResults} />
      )}
    </div>
  );
};

export default Home;
