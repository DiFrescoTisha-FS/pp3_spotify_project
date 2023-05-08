import Navbar from "./Navbar";
import { Cursor, useTypewriter } from "react-simple-typewriter";

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
    <div className="">
      <Navbar />
      <div className="h-screen flex flex-col mx-20 items-center justify-center text-center overflow-hidden text-white">
        <div className="z-20">
          <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
            Album *  Artist * Playlist
          </h2>
          <h1 className="text-5xl lg:text-6xl font-semibold px-10">
            <span className="mr-3">{text}</span>
            <Cursor cursorColor="#f7abba" />
          </h1>
        </div>
  
        <div className="w-full flex justify-evenly mt-16 items-center">
          <form
            onSubmit={onSearchSubmit}
            className="form text-black flex flex-col md:flex-row md:space-x-4 m-10 mt-6 p-5 mx-auto w-[100%] p-[75px 5px 5px 5px] bg-black"
          >
            <label htmlFor="search-term" className="sr-only text-">
              Search:
            </label>
            <input
              type="text"
              id="search-term"
              value={searchTerm}
              onChange={onSearchTermChange}
              placeholder="Enter search term"
              className="input text-white lg:w-1/3 justify-evenly mr-12"
            />
<select 
  defaultValue={null}
  id="search-type"
  onChange={onSearchTypeChange}
  className="option_button block w-full lg:w-1/3 p-2 rounded-md shadow-sm"
>
  <option value="">Select a Category</option>
  <option value="artist">Artist</option>
  <option value="album">Album</option>
  <option value="playlist">Playlist</option>
</select>

            <button type="submit" className="btn lg:w-1/4">
              Search
            </button>
          </form>
        </div>
        {searchTerm && (!searchType || searchType === '') ? (
  <h2 className="text-sm text-white">
    Please select a category
  </h2>
) : searchTerm && searchType && searchResults && searchResults.length > 0 ? (
  <>
    <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
      {searchType.charAt(0).toUpperCase() + searchType.slice(1)}:{" "}
      {searchTerm}: {resultTitle}
    </h2>
    <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
  `${resultTitle}: ${searchTerm}`
</h2>

    {/* Display the search results here */}
  </>
) : (
  <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
            {/* {resultTitle || "Search"} */}
          </h2>
)}

        <hr className="line" />
      </div>
    </div>
  )};