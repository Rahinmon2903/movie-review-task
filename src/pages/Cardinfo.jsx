import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../API/Omdbapi";

const Cardinfo = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getMovieDetails(id);
        setCardData(res.data);
      } catch (err) {
        console.error(err);
        setCardData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

if (loading) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      
    
      <div className="absolute inset-0 animate-pulse opacity-40 bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center blur-xl"></div>

  
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

    
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="w-24 h-24 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin shadow-[0_0_25px_rgba(255,0,0,0.5)]"></div>

     
        <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-red-500 drop-shadow-lg animate-pulse">
          Fetching Movie Details…
        </h2>

       
        <p className="text-gray-400 text-sm tracking-wide animate-pulse">
          Please wait while magic loads 🎬✨
        </p>
      </div>
    </div>
  );
}

  if (!cardData) return <div className="min-h-screen flex items-center justify-center text-gray-400">Details not available</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030303] to-[#070707] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
          <img src={cardData.Poster !== "N/A" ? cardData.Poster : "https://i.ibb.co/jzypJPW/cinema-seats-placeholder.jpg"} alt={cardData.Title} className="w-full h-auto block" />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-extrabold mb-3">{cardData.Title}</h1>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-[#0d0d0d] rounded-md text-gray-300">{cardData.Year}</span>
            <span className="px-3 py-1 bg-[#0d0d0d] rounded-md text-gray-300">{cardData.Genre}</span>
            <span className="px-3 py-1 bg-[#0d0d0d] rounded-md text-gray-300">{cardData.Runtime}</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{cardData.Plot}</p>

          <div className="flex gap-8 mb-6 items-center">
            <div>
              <p className="text-3xl font-bold text-red-500">⭐ {cardData.imdbRating}</p>
              <p className="text-sm text-gray-400">IMDB</p>
            </div>

            {cardData.Ratings?.map((r) => (
              <div key={r.Source}>
                <p className="text-lg font-semibold">{r.Value}</p>
                <p className="text-xs text-gray-400">{r.Source}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <p><strong>Director:</strong> {cardData.Director}</p>
            <p><strong>Writer:</strong> {cardData.Writer}</p>
            <p><strong>Actors:</strong> {cardData.Actors}</p>
            <p><strong>Awards:</strong> {cardData.Awards}</p>
            <p><strong>Box Office:</strong> {cardData.BoxOffice || "N/A"}</p>
            <p><strong>Production:</strong> {cardData.Production || "Unknown"}</p>
          </div>

          <div className="mt-8">
            <Link to="/" className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold">
              ← Back to search
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cardinfo;
