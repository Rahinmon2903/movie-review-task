import React, { useContext } from "react";
import { myContext } from "../Context/Context";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const Navbar = () => {
  const { search, setSearch, moviesData, setMovieData, favorites } =
    useContext(myContext);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black/95 via-[#070707] to-black/80 border-b border-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-500 rounded-lg flex items-center justify-center text-white font-extrabold shadow-lg">
            CV
          </div>
          <div className="text-white">
            <h1 className="text-lg font-extrabold tracking-tight">
              Cine<span className="text-red-500">Verse</span>
            </h1>
            <p className="text-xs text-gray-400 -mt-1">Premium • Cinematic</p>
          </div>
        </Link>

        {/* Search + Filter */}
        <div className="flex-1 flex items-start gap-3">

          
          <div className="flex-1 flex flex-col">
            
            <div className="flex items-center bg-[#0d0d0d] border border-black/40 rounded-xl px-3 py-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                />
              </svg>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies, series..."
                className="ml-3 w-full bg-transparent outline-none placeholder-gray-500 text-sm text-gray-100"
                aria-label="Search movies"
              />
            </div>

            {/* Show only when length is 1 0r 2*/}
            {search.trim().length > 0 && search.trim().length < 3 && (
              <span className="text-xs text-red-400 ml-1 mt-1">
                Type at least 3 characters to search
              </span>
            )}
          </div>

          {/* Type Filter using api */}
          <select
            value={moviesData}
            onChange={(e) => setMovieData(e.target.value)}
            className="bg-[#0d0d0d] text-sm text-gray-100 border border-black/40 rounded-xl px-3 py-2 shadow-sm"
            aria-label="Filter type"
          >
            <option value="">All types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>

        {/* Favorites Button */}
        <Link to="/favorites" className="relative">
          <div className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl shadow-lg">
            <AiOutlineHeart className="w-5 h-5" />
            <span className="text-sm font-semibold">Favorites</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-white text-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow">
            {favorites.length}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
