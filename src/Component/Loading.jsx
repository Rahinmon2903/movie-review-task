import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-gray-300 animate-fadeIn">
      <div className="relative">
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-red-600/20 blur-xl animate-pulse" />
        <Loader className="w-14 h-14 text-red-500 animate-spin drop-shadow-[0_0_10px_rgba(255,0,0,0.4)]" />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-gray-200 tracking-wide">
        Searching Movies…
      </h2>

      <p className="text-gray-400 text-sm mt-2">
        Please wait while we fetch results.
      </p>
    </div>
  );
};

export default Loading;
