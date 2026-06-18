import React from 'react'
import { Icon, Button } from "../Componets/index.js"

function Navbar({sidebar}) {
  //here setsidebar is need
  return (
    <div className="topbar">
      <div className="topbar-left">
        {!sidebar && (
          <Button className="icon-btn" onClick={() => setSidebarOpen(true)} title="Open sidebar">
            <Icon.MenuOpen />
          </Button>
        )}
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