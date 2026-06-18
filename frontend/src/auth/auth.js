import request from "./useFetch.js";

const API = "/api/auth";

const auth = {
  register: async (data) => {
    try {
      const res = await request(`${API}/user/register`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  login: async (data) => {
    try {
      const res = await request(`${API}/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  refreshToken: async () => {
    try {
      const res = await request(`${API}/refresh-token`, {
        method: "POST",
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    try {
      const res = await request(`${API}/logout`, {
        method: "POST",
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  verify: async () => {
    try {
      const res = await request(`${API}/user/auth`, {
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
};

export default auth;