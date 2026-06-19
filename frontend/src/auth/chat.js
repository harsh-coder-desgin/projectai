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
    }
  },

  demoChat: async (data) => {
    console.log(data);
    try {
      const res = await request(`${API}/chats/demo`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      console.log(error);
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
    }
  },
};

export default chat;