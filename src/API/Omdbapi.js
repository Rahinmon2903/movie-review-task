import axios from "axios";

const API_KEY = "80440b73";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies=(query, type)=>{

  const finalquery= query.length <= 2 ? `${query}*` : query ;

   let url = `${BASE_URL}?apikey=${API_KEY}&s=${finalquery}&page=1`;
   if(type){
    url +=`&type=${type}`
    
     
   }
   return axios.get(url);

}

export const getMovieDetails = (id) => {
  return axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
};