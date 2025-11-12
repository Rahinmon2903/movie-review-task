import React, { useState, createContext } from "react";

export const myContext = createContext();

const Context = ({ children }) => {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");

  return (
    <myContext.Provider value={[search, setSearch,year, setYear]}>
      {children}
    </myContext.Provider>
  );
};

export default Context;
