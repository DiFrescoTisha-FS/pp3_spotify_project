import SearchForm from '@component/components/SearchForm';
import SearchResult from '@component/components/SearchResult';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '@component/components/Footer';

export default function Search() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('playlist');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?query=${searchTerm}&type=${searchType}&limit=10`,
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session?.accessToken || ''}`,
          },
        }
      );
      const data = await response.json();
      const results = data[searchType + 's'].items;
      if (results.length === 0) {
        setSearchResults(null); // Set searchResults to null when no results are found
      } else {
        setSearchResults(results);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setSearchResults([]); // Clear search results when the search term becomes empty
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    handleSearch();
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/login');
    return null;
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
      {searchResults === null && (
        <p>No results found for {searchTerm}.</p>
      )}    
      <Footer className="text-center" />
    </div>

  );
}
