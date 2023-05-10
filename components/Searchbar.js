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

        <form onSubmit={onSearchSubmit} className="mt-14">
          <div className="flex">
            <div className="relative">
              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="btn py-2.5 pr-8 pl-4 text-sm font-medium text-center text-gray-500 bg-[#0f0f0f] rounded-l-lg hover:bg-gray-500 hover:text-gray-200  dark:bg-[#0f0f0f]"
                aria-label="Search category"
              >
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="playlist">Playlist</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"></div>
            </div>
            <div className="relative flex-grow">
              <input
                type="text"
                id="search-dropdown"
                value={searchTerm}
                onChange={onSearchTermChange}
                placeholder="Enter search term"
                className="input-box block p-2.5 w-full z-20 text-sm bg-[#0f0f0f] rounded-r-lg border-l-2  dark:placeholder-gray-500"
              />
              <button
                type="submit"
                className="button absolute top-0 right-0 p-2.5 text-sm font-medium text-gray-500 rounded-r-lg"
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
            <h2 className="text-sm mb-4 mt-6 text-gray-500">No Results Found</h2>
          ) : searchTerm && searchType ? (
            <>
              <h2 className="text-sm mt-12 uppercase text-gray-500 pb-2 tracking-[15px]">
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

// import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";

// export default function Searchbar({
//   searchTerm,
//   searchType,
//   onSearchTermChange,
//   onSearchTypeChange,
//   onSearchSubmit,
//   searchResults,
// }) {
//   return (
//     <div className="container bg-white">
//       <form>
//         <div className="flex">
//           <div className="relative">
//             <select
//               className="block appearance-none w-full bg-gray-100 py-2 px-2 pr-8 rounded-l-lg border border-gray-300 text-gray-900 font-medium focus:outline-none focus:bg-white focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
//               value={searchType}
//               onChange={onSearchTypeChange}
//             >
//               <option value="all">All categories</option>
//               <option value="mockups">Mockups</option>
//               <option value="templates">Templates</option>
//               <option value="design">Design</option>
//               <option value="logos">Logos</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//               <svg
//                 className="w-5 h-5 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5l7 7-7 7"
//                 ></path>
//               </svg>
//             </div>
//           </div>
//           <div className="relative w-full">
//             <input
//               type="search"
//               id="search-dropdown"
//               className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray -600 dark:placeholder-gray-400 dark:text-white focus:dark:border-blue-500"
//               placeholder="Search Mockups, Logos, Design Templates..."
//               value={searchTerm}
//               onChange={onSearchTermChange}
//             />
//             <button
//               type="submit"
//               className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 hover:dark:bg-blue-700 focus:dark:ring-blue-800"
//               onClick={onSearchSubmit}
//             >
//               <SearchIcon className="w-5 h-5" />
//               <span className="sr-only">Search</span>
//             </button>
//           </div>
//         </div>
//       </form>
//       <div className="mt-4">
//         {searchResults &&
//           searchResults.map((result) => (
//             <div key={result.id} className="p-4 mb-4 bg-gray-100 rounded-lg">
//               <h2 className="text-lg font-medium text-gray-900">{result.title}</h2>
//               <p className="mt-1 text-sm text-gray-700">{result.description}</p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
