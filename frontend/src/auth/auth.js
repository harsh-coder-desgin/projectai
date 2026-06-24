import request from "../hooks/useFetch.js";

const API = "/api/auth";

const auth = {
  register: async (data) => {
    const res = await request(`${API}/user/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  },

  login: async (data) => {
    const res = await request(`${API}/user/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  },

  refreshToken: async () => {
    const res = await request(`${API}/refresh-token`, {
      method: "POST",
    });
    return res;
  },

  logout: async () => {
    const res = await request(`${API}/logout`, {
      method: "POST",
    });
    return res;
  },

  verify: async () => {
    const res = await request(`${API}/user/auth`, {
      method: "GET",
    });
    return res;
  }
};

export default auth;