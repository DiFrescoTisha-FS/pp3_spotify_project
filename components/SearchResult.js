import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import Link from 'next/link'; // Import Link

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function SearchResult({ searchResults }) {
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="container-md flex flex-wrap my-8 mx-10 gap-10">
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div
            key={result.id}
            className={`card grid grid-col-4 mb-4 px-2 w-full md:w-1/3 lg:w-1/6 bg-gradient-to-b to-black ${color}`}
          >
            {result.images && result.images.length > 0 && (
              <img
                src={result.images[0].url}
                alt={result.name}
                className="w-full h-38 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{result.name}</h2>
              {result.type === 'artist' ? (
                <p className="text-gray-500">Artist</p>
              ) : result.type === 'album' ? (
                <p className="text-gray-500">Album</p>
              ) : (
                <p className="text-gray-500">Track</p>
              )}
              {result.external_urls && (
                <p className="text-gray-500">
                  <Link href={result.external_urls.spotify} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      Open on Spotify
                    </a>
                  </Link>
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResult;
