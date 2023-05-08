export default function SearchResult({ searchResults }) {
  return (
    <div className="container-md flex flex-wrap justify-center mx-10 gap-6">
      {searchResults.length === 0 ? null : (
        searchResults.map((result) => (
          <div key={result.id} className="card flex flex-col text-xs items-center h-48 max-w-[200px] border border-gray-300 rounded-lg">
            {result.images && result.images.length > 0 && (
              <img src={result.images[0].url} alt={result.name} className="h-32 w-32 object-cover rounded-t-lg" />
            )}
            <div className="p-2">
              {result.type === "artist" ? (
                <h3 className="text-sm font-semibold">{result.name}</h3>
              ) : result.type === "album" ? (
                <h3 className="text-sm font-semibold">{result.name}</h3>
              ) : (
                <h3 className="text-sm font-semibold">{result.name}</h3>
              )}
              {result.type === "artist" ? (
                <p className="text-gray-500">Artist</p>
              ) : result.type === "album" ? (
                <p className="text-gray-500">Album</p>
              ) : (
                <p className="text-gray-500">Playlist</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
