import React, { createContext, useState } from "react";
const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [dummy,setDummy] = useState("rudra")
  return (
    <UserContext.Provider value={{dummy,setDummy}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };