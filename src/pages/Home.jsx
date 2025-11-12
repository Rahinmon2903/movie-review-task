import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Context/Context";

const Home = () => {
  const [data, setData] = useState([]); // store all movies
  const [page,setPage] = useState(1);
  const [search,,year]=useContext(myContext);

  // Fetch movie list when the component loads
  useEffect(() => {
    if(search.trim() !=""){
         fetchData(page,search);

    }
   
  }, [page,search]);

  useEffect(() => {
  setData([]);  // clear old results
  setPage(1);   // reset pagination
}, [search]);

  // Function to fetch movies
  const fetchData = async (pageno,query) => {
    try {
      // "s=avengers" returns a list of movies related to Avengers
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=80440b73&s=${query}&page=${pageno}`
      );

     const movies=response.data.Search || [];
    
        setData((prev)=>[...prev,...movies]);
     
       
      
    } catch (error) {
      console.error("Error fetching movies:", error);
    }

    
  };
  const filteredmovies= data.filter((movies)=>{
        const yearMatch= year === "" || movies.Year == year ;

        return yearMatch;

    })

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* If movies exist, map them */}
      {filteredmovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredmovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://i.ibb.co/5xJdm0t/movie-placeholder.jpg"
                }
                alt={movie.Title}
                className="w-full h-72 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold truncate">{movie.Title}</h2>
              <p className="text-gray-400 text-sm">📅 {movie.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No movies found...</p>
      )}
      <div class="flex justify-center mt-10">
        <button onClick={()=>setPage((prev)=> prev + 1)} class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
