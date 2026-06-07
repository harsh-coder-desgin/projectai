import { useState } from "react";
import "./login.css";
import { Button, Input } from "../Componets/index.js";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    visible: false,
    message: "",
  });

  const showToast = (message) => {
    setToast({ visible: true, message });

    setTimeout(() => {
      setToast({
        visible: false,
        message: "",
      });
    }, 2500);
  };

  const handleSignup = () => {
    if (!username || !email || !password) {
      showToast("Please fill in all fields");
      return;
    }

    showToast("Account created successfully");
  };

  return (
    <div className="login-body">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-logo">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7v10l9 5 9-5V7L12 2z"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M12 2v20M3 7l9 5 9-5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="login-title">Create Account</h1>

          <p className="login-subtitle">
            Join us and start building your profile
          </p>

          {toast.visible && (
            <div className="login-toast">
              {toast.message}
            </div>
          )}

          <div className="login-field">
            <label htmlFor="username">Username</label>

            <div className="login-input-wrap">
              <Input
                type="text"
                id="username"
                placeholder="john_doe"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="email">Email address</label>

            <div className="login-input-wrap">
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <div className="login-input-wrap">
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>
          </div>

          <Button
            className="login-btn-primary"
            onClick={handleSignup}
          >
            Create Account
          </Button>

          <div className="login-divider">or</div>

          <div className="login-signup-row">
            Already have an account?{" "}
            <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}