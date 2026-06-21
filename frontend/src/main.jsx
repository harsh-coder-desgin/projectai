import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from "./Componets/index.js"
import { UserProvider } from "./Context/UserContext.jsx";
import { Tech,Login,Signup,Chat,Home,ViewChat } from "./pages/index.js"
import App from "../src/App.jsx"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/tech",
        element: (
          <AuthLayout>
            <Tech />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/chat",
        element: (
          <AuthLayout>
            <Chat />
          </AuthLayout>
        ),
      },
       {
        path: "/chat/:id",
        element: (
          <AuthLayout>
            <ViewChat />
          </AuthLayout>
        ),
      }, // i wil make a page and use url and send api data to chat.jsx // 
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)