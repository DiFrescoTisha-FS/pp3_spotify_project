import Navbar from "./Navbar";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { SearchIcon } from "@heroicons/react/outline";

export default function SearchForm({
  searchTerm,
  searchType,
  onSearchTermChange,
  onSearchTypeChange,
  onSearchSubmit,
  searchResults,
}) {
  const [text, count] = useTypewriter({
    words: ["Spotify Search"],
    loop: true,
    delaySpeed: 5000,
  });

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
          <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px] mb-14">
            Album * Artist * Playlist
          </h2>
          <h1 className="text-5xl lg:text-6xl font-semibold px-10">
            <span className="mr-3">{text}</span>
            <Cursor cursorColor="#f7abba" />
          </h1>
        </div>

          <form onSubmit={onSearchSubmit}>
            <div className="flex">
            <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-[#0f0f0f] border border-gray-300 rounded-l-lg hover:bg-[#010606] focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">Artist<svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
            <div id="dropdown" className="z-10 hidden bg-[#6b7280ff] cursor-pointer divide-y divide-gray-100 rounded-lg shadow w-44 dark:">
            <select
              value={searchType}
              onChange={onSearchTypeChange}
              className="py-4 text-sm bg-[#6b7280ff]"
              aria-labelledby="dropdown-button"
            >
              <option value="artist">
                Artist
              </option>
              <option value="album">
                Album
              </option>
              <option value="playlist">
                Playlist
              </option>
            </select>

                </div>
          <div className="relative w-full">
            <input
              type="text"
              id="search-dropdown"
              value={searchTerm}
              onChange={onSearchTermChange}
              placeholder="Enter search term"
              className="block p-2.5 w-full z-20 text-sm text-white rounded-r-lg border-l-[rgba(0,255,255,0.5)] border-l-2 border border-[rgba(0,255,255,0.5)] focus:ring-[rgba(0,255,255,0.5)] focus:border-[rgba(0,255,255,0.5)] dark:bg-gray-500 dark:border-l-[rgba(0,255,255,0.5)] dark:border-[rgba(0,255,255,0.5)] -600 dark:placeholder-gray-500 dark:text-white focus:dark:border-[rgba(0,255,255,0.5)]"
            />
            <button type="submit" 
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 hover:dark:bg-blue-700 focus:dark:ring-blue-800"
              onClick={onSearchSubmit}
            >
              <SearchIcon className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </button>
            </div>
            </div>
          </form>
        
        <div className="mt-4">
        {!searchTerm ? (
          <h2 className="text-sm mb-4 mt-4 text-white">No Results Found</h2>
        ) : searchTerm && searchType ? (
          <>
            <h2 className="text-sm mt-8 uppercase text-gray-500 pb-2 tracking-[15px]">
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
