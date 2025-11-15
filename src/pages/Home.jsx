import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Context/Context";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { searchMovies, getMovieDetails } from "../API/Omdbapi";
import NoResults from "../Component/NoResults";
import Pagination from "../Component/Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem("movies-review");
    return saved ? JSON.parse(saved) : {};
  });
  const { search, moviesData, favorites, setFavorities } =
    useContext(myContext);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const handleRating = (id, value) => {
    const updated = { ...ratings, [id]: value };
    setRatings(updated);
    localStorage.setItem("movies-review", JSON.stringify(updated));
  };

  useEffect(() => {
    setCurrentPage(1);
    setData([]);
  }, [search, moviesData]);

  useEffect(() => {
    const finalQuery = search.trim() === "" ? "Avengers" : search;
    (async () => {
      try {
        const res = await searchMovies(finalQuery, moviesData);
        const movies = res.data.Search || [];
        const detailed = await Promise.all(
          movies.map(async (m) => {
            const d = await getMovieDetails(m.imdbID);
            return d.data;
          })
        );
        setData(detailed);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    })();
  }, [search, moviesData]);

  // --- Local Pagination ---
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / postsPerPage);

  const handleCart = (movie) => {
    const exists = favorites.some((ele) => ele.imdbID === movie.imdbID);
    if (exists) {
      alert("Already added");
    } else {
      setFavorities((prev) => [...prev, movie]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050506] via-[#070707] to-[#020202] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {currentPosts.map((movie) => {
              const fav = favorites.some((f) => f.imdbID === movie.imdbID);
              return (
                <div key={movie.imdbID} className="group relative">
                  {/* Poster Card */}
                  <Link to={`/movies/${movie.imdbID}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_80px_rgba(255,0,0,0.18)] transition-shadow duration-300 transform-gpu hover:translate-y-[-4px]">
                      <img
                        src={
                          movie.Poster === "N/A"
                            ? "https://deadline.com/wp-content/uploads/2016/06/movie-theater1.jpg?crop=607px%2C1005px%2C2808px%2C1574px&resize=681%2C383"
                            : movie.Poster
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://deadline.com/wp-content/uploads/2016/06/movie-theater1.jpg?crop=607px%2C1005px%2C2808px%2C1574px&resize=681%2C383";
                        }}
                        alt={movie.Title}
                        className="w-full h-80 object-cover block transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-0 group-hover:ring-4 group-hover:ring-red-600/20 transition-all duration-300"></div>

                      {/* title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-end">
                        <div className="p-4">
                          <h3 className="text-lg font-bold leading-tight line-clamp-2">
                            {movie.Title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (fav) {
                        // remove
                        const updated = favorites.filter(
                          (f) => f.imdbID !== movie.imdbID
                        );
                        setFavorities(updated);
                      } else {
                        setFavorities((prev) => [movie, ...prev]);
                      }
                    }}
                    className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    {fav ? (
                      <AiFillHeart className="w-6 h-6 text-red-500 drop-shadow-md" />
                    ) : (
                      <AiOutlineHeart className="w-6 h-6 text-white/90" />
                    )}
                  </button>

                  {/* year and stars */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">📅 {movie.Year}</p>
                      <div className="flex items-center gap-2">
                        {[...Array(10)].map((_, i) => {
                          const star = i + 1;
                          return (
                            <button
                              key={star}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRating(movie.imdbID, star);
                              }}
                              className={`text-lg transition-transform ${
                                star <= (ratings[movie.imdbID] || 0)
                                  ? "text-red-500 scale-110"
                                  : "text-gray-600 hover:text-red-400"
                              }`}
                              aria-label={`Rate ${star}`}
                            >
                              ★
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Your Rating: {ratings[movie.imdbID] || 0}/10
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCart(movie);
                      }}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all"
                    >
                      <span>❤️</span>
                      Add to Favorites
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NoResults />
        )}

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default Home;
