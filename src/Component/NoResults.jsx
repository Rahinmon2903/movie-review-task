import React from "react";
import { Film, Search } from "lucide-react";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-gray-300 animate-fadeIn">
      
     
      <div className="w-24 h-24 flex items-center justify-center bg-gray-800/50 rounded-full border border-gray-700 shadow-md">
        <Film className="w-12 h-12 text-red-500" />
      </div>

      
      <h2 className="mt-6 text-2xl font-bold text-white tracking-wide">
        No Movies Found
      </h2>

      <p className="text-gray-400 mt-2 text-center max-w-sm">
        Try searching for something else or check your spelling.
      </p>

     
      <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
        <Search className="w-4 h-4" />
        <span>Use the search bar above to find movies</span>
      </div>

   
      <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent mt-6 opacity-50" />
    </div>
  );
};

export default NoResults;
