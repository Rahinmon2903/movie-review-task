import React, { useState, createContext } from "react";

export const myContext = createContext();

const Context = ({ children }) => {
  const [search, setSearch] = useState("");
  const [moviesData, setMovieData] = useState("");
   const [favorites, setFavorities] = useState([]);

   

  
    

  return (
    <myContext.Provider value={{search, setSearch,moviesData, setMovieData,favorites, setFavorities}}>
      {children}
    </myContext.Provider>
  );
};

export default Context;
