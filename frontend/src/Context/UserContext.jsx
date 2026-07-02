import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [chatdata, setchatdata] = useState();
  const [skills, setskills] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser ,chatdata , setchatdata, skills, setskills}}>
      {children}
    </UserContext.Provider>
  );
};