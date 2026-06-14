import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import auth from "../auth/auth.js"

function AuthLayout({ children }) {
  const location = useLocation();
  const { setUser, user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const techData = localStorage.getItem("techSkills");

  useEffect(() => {
    // if (!user) {
    const verifyUser = async () => {
      try {
        const data = await auth.verify()
        console.log(data);

        setUser({
          username: data.data.username,
          email: data.data.email,
        });
        //save data in usecontect and make api for getuser
        setIsLoggedIn(true);
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            await auth.refreshToken();
            setIsLoggedIn(true);
          } catch (error) {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } finally {
        setLoading(false);
      }
    };
    // }
    verifyUser()
  }, []);

  if (loading) {
    return <div></div>;
  }

  // No tech selected
  // if (!isLoggedIn && !techData && location.pathname !== "/tech") {
  //   return <Navigate to="/tech" replace />;
  // }

  // Tech already selected
  if (!isLoggedIn && techData && location.pathname === "/tech") {
    return <Navigate to="/login" replace />;
  }

  if (!isLoggedIn && !techData && location.pathname === "/chat") {
    return <Navigate to="/tech" replace />;
  }

  // Logged in user cannot access auth pages
  if (
    isLoggedIn &&
    ["/tech", "/login", "/signup"].includes(location.pathname)
  ) {
    return <Navigate to="/chat" replace />;
  }

  return children;
}

export default AuthLayout;