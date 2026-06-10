import request from "./useFetch.js";

const API = "/api/chat";

const chat = {
  // Save user's tech stack
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

  // Demo chat (without login)
  demoChat: async (data) => {
    console.log(data);
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

  // Send chat (logged-in user)
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

  // Get all chats
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

  // Get one chat
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