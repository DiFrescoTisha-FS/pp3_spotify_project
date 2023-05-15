import Navbar from "./Navbar";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { FaSearch } from "react-icons/fa";
import Footer from '../components/Footer'

export default function SearchForm({
  searchTerm,
  searchType,
  onSearchTermChange,
  setSearchTypeChange,
  onSearchSubmit,
  searchResults,
}) {
  const [text, count] = useTypewriter({
    words: ["Spotify Search"],
    loop: true,
    delaySpeed: 5000,
  });

  const handleSearchTypeChange = (event) => {
    setSearchTypeChange(event.target.value);
  };

  let resultTitle;

  if (searchType === "artist") {
    resultTitle = "Artist";
  } else if (searchType === "album") {
    resultTitle = "Album";
  } else if (searchType === "playlist") {
    resultTitle = "Playlist";
  }

  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-start text-center overflow-hidden text-white">
      <div className="z-20">
          <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px] mb-6">
            Album * Artist * Playlist
          </h2>
          <h1 className="text-5xl lg:text-6xl font-semibold px-10">
            <span className="mr-3">{text}</span>
            <Cursor cursorColor="#f7abba" />
          </h1>
        </div>

        <form onSubmit={onSearchSubmit} className="mt-14" autoComplete="off">
          <div className="flex">
            <div className="relative">
              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="btn py-2.5 pr-8 pl-4 text-sm font-medium text-center text-gray-500 bg-transparent rounded-l-lg hover:bg-none hover:text-[#0f0f0f] dark:bg-[#0f0f0f]"
                aria-label="Search category"
              >
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="playlist">Playlist</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"></div>
            </div>
            <div className="input-box relative flex-grow">
              <input
                type="text"
                id="search-dropdown"
                value={searchTerm}
                onChange={onSearchTermChange}
                placeholder="Enter search term"
                className="placeholder-gray-500 placeholder-pl-4 block p-2.5 w-full z-20 text-sm bg-[#0f0f0f] rounded-r-lg border-l-2 text-gray-500 hover:text-[#0f0f0f]"
              />
              <button
                type="submit"
                className="button absolute top-0 right-0 p-2.5 text-sm font-medium text-gray-500 rounded-r-lg"
                onClick={onSearchSubmit}
              >
                <FaSearch className="icon w-5 h-5" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
<div className="mt-[75px] text-lg mb-0 uppercase text-gray-500 pb-2 tracking-[15px]">
{!searchTerm ? (
            <h2 className="text-lg mb-0 uppercase text-gray-500 pb-2 tracking-[15px]">
              No Results Found
            </h2>
          ) : searchTerm && searchType ? (
            <>
              <h2 className="text-lg mb-0 uppercase text-gray-500 pb-2 tracking-[15px]">
                {resultTitle}: {searchTerm}
              </h2>
              <hr className="line" />
              {searchResults && (
                <div className="flex flex-wrap justify-start lg:ml-10 lg:mr-10 gap-10">
                  {searchResults.map((result) => (
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
                          <h3 className="text-sm font-semibold">
                            {result.name}
                          </h3>
                        ) : result.type === "album" ? (
                          <h3 className="text-sm font-semibold">
                            {result.name}
                          </h3>
                        ) : (
                          <h3 className="text-sm font-semibold">
                            {result.name}
                          </h3>
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
                  ))}
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

