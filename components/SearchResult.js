export default function SearchResult({ searchResults }) {
  return (
    <div className="flex flex-wrap justify-start lg:ml-10 lg:mr-10 gap-10">
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div
            key={result.id}
            className="card bg-fixed transition duration-300 ease-in-out hover:scale-110"
          >
            {result.images && result.images.length > 0 && (
              <a href={result.external_urls.spotify}>
                <img
                  src={result.images[0].url}
                  alt={result.name}
                  className="h-[200px] w-[200px] object-cover rounded-t-lg"
                />
              </a>
            )}
            <div className="p-2">
              {result.type === "artist" ? (
                <>
                  <h3 className="text-sm font-semibold">{result.name}</h3>
                  <p className="text-gray-500">Artist</p>
                </>
              ) : result.type === "album" ? (
                <>
                  <h3 className="text-sm font-semibold">{result.name}</h3>
                  <p className="text-gray-500">Album</p>
                </>
              ) : (
                <>
                  <h3 className="text-sm font-semibold">{result.name}</h3>
                  <p className="text-gray-500">Playlist</p>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-lg mb-0 uppercase text-gray-500 pb-2 tracking-[15px]">
          No Results Found
        </h2>
      )}
    </div>
  );
}
