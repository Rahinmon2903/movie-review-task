import React, { useContext } from "react";
import { myContext } from "../Context/Context";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const Favorities = () => {
  const { favorites, setFavorities } = useContext(myContext);

  const handleDelete = (id) => {
    const updated = favorites.filter((f) => f.imdbID !== id);
    setFavorities(updated);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050505] to-[#070707] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 tracking-wide">Your Favorites ❤️</h2>

        
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            
            
            <div className="relative mb-6">
              <div className="w-40 h-40 bg-red-600/30 blur-2xl rounded-full absolute inset-0 animate-pulse"></div>

              <img
                src="https://hbr.org/resources/images/article_assets/2020/11/Nov20_02_3294121.jpg"
                alt="Empty Favorites"
                className="relative w-44 drop-shadow-[0_0_25px_rgba(255,0,0,0.5)] animate-bounce"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-200 drop-shadow-md">
              No Favorites Yet
            </h2>

            <p className="mt-2 text-gray-400 text-center max-w-md text-sm">
              Your favorites list is empty. Start exploring movies and save the ones you love!
            </p>

            <Link
              to="/"
              className="mt-6 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full 
                         text-white text-sm font-semibold shadow-[0_0_20px_rgba(255,0,0,0.4)] 
                         hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all"
            >
              Browse Movies →
            </Link>
          </div>
        ) : (
          
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
            {favorites.map((ele) => (
              <div
                key={ele.imdbID}
                className="group relative rounded-2xl bg-[#111] hover:bg-[#1a1a1a] 
                           transition-all duration-300 p-3 shadow-[0_8px_25px_rgba(0,0,0,0.45)] 
                           hover:shadow-[0_12px_35px_rgba(255,0,0,0.18)]"
              >
                {/* Poster */}
                <Link to={`/movies/${ele.imdbID}`}>
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={
                        ele.Poster !== "N/A"
                          ? ele.Poster
                          : "https://i.postimg.cc/jj6G8rxx/movie-not-found.png"
                      }
                      alt={ele.Title}
                      onError={(e) => (e.target.src = "https://i.postimg.cc/jj6G8rxx/movie-not-found.png")}
                      className="w-full h-72 object-cover rounded-xl 
                                 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Title + Year */}
                <div className="mt-3 px-1">
                  <h3 className="text-base font-semibold text-gray-100 line-clamp-2">
                    {ele.Title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">📅 {ele.Year}</p>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(ele.imdbID)}
                  className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm p-2 rounded-full
                             hover:bg-red-600 transition-all shadow-md"
                >
                  <AiFillDelete className="text-white w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorities;

