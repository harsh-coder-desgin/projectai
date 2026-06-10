import request from "./useFetch.js";

const API = "/api/auth";

const auth = {
  register: async (data) => {
    try {
      const res = await request(`${API}/user/register`, { method: "POST", body: JSON.stringify(data), })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  login: async (data) =>
    request(`${API}/user/login`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  refreshToken: async () =>
    request(`${API}/refresh-token`, {
      method: "POST",
    }),

  logout: async () =>
    request(`${API}/logout`, {
      method: "POST",
    }),
}

export default auth;


// import useAuth from "../hooks/useAuth";

// function Login() {
//   const { login, loading } = useAuth();

//   const handleLogin = async () => {
//     try {
//       const res = await login({
//         email,
//         password,
//       });

//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <button onClick={handleLogin}>
//       {loading ? "Loading..." : "Login"}
//     </button>
//   );
// }