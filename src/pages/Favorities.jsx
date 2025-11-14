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
        <h2 className="text-3xl font-extrabold mb-6">Your Favorites</h2>

        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorites yet — add movies to see them here.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {favorites.map((ele) => (
              <div key={ele.imdbID} className="group relative">
                <Link to={`/movies/${ele.imdbID}`}>
                  <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(255,0,0,0.18)] transition-shadow">
                    <img src={ele.Poster !== "N/A" ? ele.Poster : "https://i.ibb.co/jzypJPW/cinema-seats-placeholder.jpg"} alt={ele.Title} className="w-full h-72 object-cover" />
                  </div>
                </Link>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2">{ele.Title}</h3>
                    <p className="text-xs text-gray-400">📅 {ele.Year}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(ele.imdbID)}
                    className="ml-3 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md shadow"
                    aria-label="Remove favorite"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorities;
