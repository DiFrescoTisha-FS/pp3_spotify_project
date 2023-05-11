import Navbar from "./Navbar";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { SearchIcon } from "@heroicons/react/outline";

export default function Searchbar({
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
      <div className="h-screen flex flex-col items-center justify-center text-center overflow-hidden text-white">
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
                <SearchIcon className="icon w-5 h-5" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <div className="mt-[80px] text-sm mb-0 uppercase text-gray-500 pb-2 tracking-[15px]">
          {!searchTerm ? (
            <h2>No Results Found</h2>
          ) : searchTerm && searchType ? (
            <>
              <h2 className="text-sm mb-0 uppercase text-gray-500 pb-2 tracking-[15px]">
                {resultTitle}: {searchTerm}
              </h2>
            </>
          ) : null}
          <hr className="line" />
        </div>
      </div>
    </div>
  );
}
