import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../auth/auth.js"

function AuthLayout({ children }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const techData = localStorage.getItem("tech");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await auth.verify()
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
  }, []);

  if (loading) {
    return <div></div>;
  }

  // No tech selected
  if (!isLoggedIn && !techData && location.pathname !== "/tech") {
    return <Navigate to="/tech" replace />;
  }

  // Tech already selected
  if (!isLoggedIn && techData && location.pathname === "/tech") {
    return <Navigate to="/login" replace />;
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