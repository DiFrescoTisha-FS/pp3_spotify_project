import SearchForm from '@component/components/SearchForm';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
      setSearchResults(data[searchType + 's'].items.map((item) => ({
        ...item,
        external_url: item.external_urls?.spotify || '',
      })));
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
    </div>
  );
}

function SearchResult({ searchResults }) {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div key={result.id}>
            <h2>{result.name}</h2>
            <p>{result.type}</p>
            {result.external_url && (
              <p>
                <Link href={result.external_url} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    Open on Spotify
                  </a>
                </Link>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
