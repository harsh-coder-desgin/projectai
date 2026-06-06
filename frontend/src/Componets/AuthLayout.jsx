import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function AuthLayout({ children }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const techData = localStorage.getItem("tech");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await authuser.getuser();
        setIsLoggedIn(true);
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            await authuser.refreshtoken();
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
    ["/tech", "/login", "/signup", "/verfiyemail"].includes(location.pathname)
  ) {
    return <Navigate to="/chat" replace />;
  }

  return children;
}

export default AuthLayout;

// if login so no /tech /logn /sinup
// if not login all allwored
// if no tech data in local storage push /tech 
// if tech data in local storage not allwoed in /tech 
// if login refrhtoken need or not check