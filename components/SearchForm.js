import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { shuffle } from "lodash";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

export default function SearchForm({
  searchTerm,
  searchType,
  onSearchTermChange,
  onSearchTypeChange,
  onSearchSubmit,
  searchResults,
}) {
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="container w-full flex justify-end items-center m-10">
        <form
          onSubmit={onSearchSubmit}
          className="text-white grid lg:grid-cols-3 md:grid-cols-2 gap-10 m-10 p-5 mx-auto my-10 w-[100%] p-[75px 5px 5px 5px] bg-black justify-items-end"
        >
          <label htmlFor="search-term" className="sr-only">
            Search:
          </label>
          <input
            type="text"
            id="search-term"
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder="Enter search term"
            className="input text-white"
          />
          <label htmlFor="search-type" className="sr-only">
            Search for:
          </label>
          <select
            id="search-type"
            value={searchType}
            onChange={onSearchTypeChange}
            className="option_button block w-full p-2 rounded-md shadow-sm"
          >
            <option value="artist">Artists</option>
            <option value="album">Albums</option>
            <option value="playlist">Playlists</option>
          </select>    

{searchResults?.length === 0 && (
  <div className="text-white text-center">
    No results found for `${searchTerm}`.
  </div>
)}


          <button type="submit" className="btn">
            Search
          </button>
        </form>
      </div>


    </div>
  );
}
