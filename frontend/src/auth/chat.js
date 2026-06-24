import request from "../hooks/useFetch.js";

const API = "/api/chat";

const chat = {
  saveTech: async (data) => {
    try {
      const res = await request(`${API}/tech`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      console.log(error);
      return error
    }
  },

  demoChat: async (data) => {
    try {
      const res = await request(`${API}/chats/demo`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      console.log(error);
      return error
    }
  },

  sendChat: async (data) => {
    try {
      const res = await request(`${API}/chats`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      console.log(error);
      return error
    }
  },

  getAllChats: async () => {
    try {
      const res = await request(`${API}/chats`, {
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log(error);
      return error
    }
  },

  getOneChat: async (chatId) => {
    try {
      const res = await request(`${API}/chats/${chatId}`, {
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log(error);
      return error
    }
  },
};

export default chat;