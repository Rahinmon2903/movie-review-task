import React from "react";
import { Film, Search } from "lucide-react";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-gray-300 animate-fadeIn select-none">
      
      {/* Icon with glow ring */}
      <div className="relative">
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-red-600/20 blur-xl animate-pulse" />
        <div className="w-24 h-24 flex items-center justify-center bg-gray-900/60 rounded-full border border-gray-700 shadow-[0_0_30px_rgba(255,0,0,0.15)]">
          <Film className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-6 text-3xl font-extrabold text-white tracking-wide drop-shadow">
        No Movies Found
      </h2>

      {/* Subtitle */}
      <p className="text-gray-400 mt-2 text-center max-w-sm leading-relaxed">
        We couldn’t find any results for your search.  
        Try adjusting your keywords or checking the spelling.
      </p>

      {/* Search hint */}
      <div className="flex items-center gap-2 mt-5 text-gray-400 text-sm bg-gray-800/40 px-3 py-2 rounded-full border border-gray-700/40">
        <Search className="w-4 h-4" />
        <span>Use the search bar above to discover movies</span>
      </div>

     
      <div className="w-52 h-[2px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent mt-8 opacity-60" />
    </div>
  );
};

export default NoResults;
