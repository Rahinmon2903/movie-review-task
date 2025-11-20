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

  const { search, favorites, setFavorities } = useContext(myContext);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const handleRating = (id, value) => {
    const updated = { ...ratings, [id]: value };
    setRatings(updated);
    localStorage.setItem("movies-review", JSON.stringify(updated));
  };

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  
  useEffect(() => {
    const query = search.trim() === "" ? "Avengers" : search.trim();

    (async () => {
      try {
        const res = await searchMovies(query);
     

        

        //  if there is no data it will set empty array
        if (
          !res.data ||
          res.data.Response === "False" ||
          !res.data.Search
        ) {
          setData([]);
          return;
        }

        const movies = res.data.Search;

        // Fetch detailed info
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
  }, [search]);

  // Pagination
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / postsPerPage);

  const toggleFavorite = (movie) => {
    const exists = favorites.some((f) => f.imdbID === movie.imdbID);

    if (exists) {
      const updated = favorites.filter(
        (f) => f.imdbID !== movie.imdbID
      );
      setFavorities(updated);
    } else {
      setFavorities((prev) => [movie, ...prev]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050506] via-[#070707] to-[#020202] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {currentPosts.map((movie) => {
              const fav = favorites.some((f) => f.imdbID === movie.imdbID);

              return (
                <div key={movie.imdbID} className="group relative">

                  {/* Poster */}
                  <Link to={`/movies/${movie.imdbID}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={
                          movie.Poster === "N/A"
                            ? "https://deadline.com/wp-content/uploads/2016/06/movie-theater1.jpg"
                            : movie.Poster
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://deadline.com/wp-content/uploads/2016/06/movie-theater1.jpg";
                        }}
                        alt={movie.Title}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </Link>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(movie);
                    }}
                    className="absolute top-3 right-3 bg-black/60 p-2 rounded-full hover:scale-110"
                  >
                    {fav ? (
                      <AiFillHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <AiOutlineHeart className="w-6 h-6 text-white/90" />
                    )}
                  </button>

                  {/* Rating + Year */}
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
                              className={`text-lg ${
                                star <= (ratings[movie.imdbID] || 0)
                                  ? "text-red-500 scale-110"
                                  : "text-gray-600 hover:text-red-400"
                              }`}
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
                        toggleFavorite(movie);
                      }}
                      className="mt-4 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700"
                    >
                      ❤️ Add to Favorites
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

