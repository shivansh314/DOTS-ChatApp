import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    console.log("🔍 getUsers called - setting loading to true");
    set({ isUsersLoading: true });

    try {
      console.log("🌐 Making API call to /messages/users");
      console.log("🔗 Axios base URL:", axiosInstance.defaults.baseURL);

      const res = await axiosInstance.get("/messages/users");

      console.log("✅ API call successful:", res.data);
      console.log("📊 Response status:", res.status);

      set({ users: res.data });
    } catch (error) {
      console.error("❌ Error in getUsers:", error);

      // Better error handling
      if (error.response) {
        // Server responded with error status
        console.error("📡 Server Error Response:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });

        const errorMessage =
          error.response.data?.message ||
          `Server Error: ${error.response.status}`;
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received (network error, CORS, etc.)
        console.error(
          "🌐 Network Error - No response received:",
          error.request
        );
        console.error("🔧 Error message:", error.message);

        if (error.message.includes("CORS")) {
          toast.error("CORS Error: Cannot connect to server");
        } else if (error.code === "ECONNREFUSED") {
          toast.error("Connection refused: Server might be down");
        } else if (error.code === "ETIMEDOUT") {
          toast.error("Request timeout: Server is not responding");
        } else {
          toast.error(`Network Error: ${error.message}`);
        }
      } else {
        // Something else happened
        console.error("⚠️ Unexpected Error:", error.message);
        toast.error(`Unexpected Error: ${error.message}`);
      }
    } finally {
      console.log("🏁 getUsers finished - setting loading to false");
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error in getMessages:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Error loading messages: ${error.message}`);
      } else {
        toast.error("Failed to load messages");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Error in sendMessage:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Error sending message: ${error.message}`);
      } else {
        toast.error("Failed to send message");
      }
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
