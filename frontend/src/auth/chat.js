import request from "../hooks/useFetch.js";

const API = "/api/chat";

const chat = {
  saveTech: async (data) => {
    const res = await request(`${API}/tech`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  },

  demoChat: async (data) => {
    const res = await request(`${API}/chats/demo`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  },

  sendChat: async (data) => {
    const res = await request(`${API}/chats`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  },

  getAllChats: async () => {
    const res = await request(`${API}/chats`, {
      method: "GET",
    });
    return res;
  },

  getOneChat: async (chatId) => {
    const res = await request(`${API}/chats/${chatId}`, {
      method: "GET",
    });
    return res;
  },
};

export default chat;