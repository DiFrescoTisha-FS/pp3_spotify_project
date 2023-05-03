export default function SearchResult({ searchResults }) {
  return (
    <div className="container-md flex flex-wrap justify-evenly mx-10 gap-5">
      {searchResults.map((result) => (
        <div key={result.id} className="card flex flex-col items-center mb-4 px-2 w-full md:w-1/3 lg:w-1/6">
          {result.images && result.images.length > 0 && (
            <img src={result.images[0].url} alt={result.name} className="w-full h-38 object-cover rounded-t-lg" />
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold">{result.name}</h2>
            {result.type === "artist" ? (
              <p className="text-gray-500">Artist</p>
            ) : result.type === "album" ? (
              <p className="text-gray-500">Album</p>
            ) : (
              <p className="text-gray-500">Playlist</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
