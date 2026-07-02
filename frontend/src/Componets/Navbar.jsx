import React from 'react'
import { Button } from "../Componets/index.js"
import { useNavigate } from "react-router-dom";

function Navbar() {  
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="auth-buttons">
          <Button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar