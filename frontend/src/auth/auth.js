import request from "./useFetch.js";

const API = "/api/auth";

const auth = {
  register: async (data) =>
    request(`${API}/user/register`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

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
};

export default auth;