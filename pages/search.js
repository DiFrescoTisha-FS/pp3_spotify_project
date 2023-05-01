import SearchForm from "@component/components/SearchForm";
import SearchResult from "@component/components/SearchResult";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Search() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("playlist"); // Update searchType to "playlist"
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?query=${searchTerm}&type=${searchType}&limit=10`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session?.accessToken || ""}`,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data[searchType + "s"].items);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SearchForm
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
}
