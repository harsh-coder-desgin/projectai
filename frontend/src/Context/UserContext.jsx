import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [chatdata, setchatdata] = useState();

  return (
    <UserContext.Provider value={{ user, setUser ,chatdata , setchatdata}}>
      {children}
    </UserContext.Provider>
  );
};