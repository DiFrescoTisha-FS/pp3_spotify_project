import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { FaSearch } from "react-icons/fa";
import Footer from "@component/components/Footer";
import { IoMdRefresh } from "react-icons/io";
import { shuffle } from "lodash";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-violet-500",
  "from-cyan-500",
  "from-pink-500",
  "from-purple-500",
];

const SearchPage = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("playlist");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors)[0]);
  }, []);

  useEffect(() => {
    const shuffledColors = shuffle(colors);
    console.log("Shuffled Colors:", shuffledColors);
    setColor(shuffledColors.pop());
    console.log(color);
  }, []);

  const [text, count] = useTypewriter({
    words: ["Spotify Search"],
    loop: true,
    delaySpeed: 5000,
  });

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const url = `https://api.spotify.com/v1/search?q=${encodedSearchTerm}&type=${searchType}&limit=7`;

      const response = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.accessToken || ""}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const results = data[`${searchType}s`]?.items;
        if (results) {
          setSearchResults(results);
        } else {
          setSearchResults([]);
          console.error("Search results not found.");
        }
        console.log("Response:", data);
      } else {
        setSearchResults([]);
        console.error("Search request failed.");
      }
    } catch (error) {
      setSearchResults([]);
      console.error("An error occurred during the search:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("searchResults:", searchResults);
  }, [searchResults]);

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
      <Head>
        <title>Search | Spotify Search</title>
        <meta
          name="description"
          content="Search Spotify API for artists, albums, and playlist."
        />
      </Head>
      <div
        className={`top-4 justify-between items-start space bg-gradient-to-b to-black ${color} h-40 text-[#E4E4E7] p-8 w-full`}
      >
        <Navbar color={color} />
        <div className="h-screen flex flex-col items-center justify-start mt-32 text-center overflow-hidden text-white">
          <div className="z-20">
            <h2 className="text-xs uppercase text-gray-500 pb-2 tracking-[15px] mb-4 mt-4">
              Album * Artist * Playlist
            </h2>
            <h1 className="text-6xl lg:text-6xl font-semibold px-10">
              <span className="mr-3">{text}</span>
              <Cursor cursorColor="#f7abba" />
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <form
                  onSubmit={handleSearch}
                  className="mt-8"
                  autoComplete="off"
                >
                  <div className="flex">
                    <div className="relative">
                      <select
                        value={searchType}
                        onChange={handleSearchTypeChange}
                        className="btn py-2.5 pr-8 pl-4 text-sm font-medium text-center text-gray-500 bg-transparent rounded-l-lg hover:bg-none hover:text-[#0f0f0f] dark:bg-[#0f0f0f]"
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
                        onChange={handleSearchTermChange}
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
                {/* Reset button */}
                {searchTerm && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                    }}
                  >
                    <button
                      type="button"
                      className="reset-button"
                      onClick={handleReset}
                    >
                      <IoMdRefresh className="reset-icon w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
              <div className="search-results">
                {!searchTerm ? (
                  <div className="text-center mb-8">
                    <div className="inline-block">
                      <h2 className="text-xs mb-0 uppercase text-gray-500 pb-2 tracking-[15px] mt-12 text-center">
                        No Results Found
                      </h2>
                      <hr className="line mb-10" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <div className="inline-block">
                        <h2 className="text-sm mb-0 uppercase text-gray-500 pb-2 tracking-[15px] mt-12 text-center">
                          {resultTitle}: {searchTerm}
                        </h2>
                        <hr className="line mb-10" />
                      </div>
                    </div>
                    <div className="search-results-container">
                      {searchResults && (
                        <div className="section flex flex-wrap justify-start content-center lg:mr-10 gap-10 mb-12">
                          {searchResults.map((result) => (
                            <div
                              key={result.id}
                              className="card bg-fixed transition duration-300 ease-in-out hover:scale-110"
                              style={{ width: "175px", height: "200px" }} // Adjust the dimensions as needed
                            >
                              {result.images && result.images.length > 0 && (
                                <a href={result.external_urls.spotify}>
                                  <img
                                    src={result.images[0].url}
                                    alt={result.name}
                                    className="h-[200px] w-[300px] object-cover rounded-t-lg"
                                  />
                                </a>
                              )}
                              <div className="p-2">
                                {result.type === "artist" ? (
                                  <h3 className="text-xs font-semibold">
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
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer
            className="w-[100%] mx-0 text-[rgb(128, 128, 128)]"
            color={color}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
