import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from "./Componets/index.js"
import App from './App.jsx'
import Tech from './pages/Tech.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx' 
import Chat from './pages/Chat.jsx' 
import Home from './pages/Home.jsx' 
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
       {
        path: "/",
        element: (
          // <AuthLayout>
            <Home />
          // </AuthLayout>
        ),
      },
      {
        path: "/tech",
        element: (
          // <AuthLayout>
            <Tech />
          // </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          // <AuthLayout>
            <Login />
          // </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          // <AuthLayout>
            <Signup />
          // </AuthLayout>
        ),
      },
      {
        path: "/chat",
        element: (
          // <AuthLayout>
            <Chat />
          // </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)