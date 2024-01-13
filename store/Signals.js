import { create } from "zustand";
import { flask_socket } from "@/lib/flask_socket";
import { node_socket } from "@/lib/node_socket";
import { getAllSignals } from "@/lib/actions/signal.actions";

export const useSignalStore = create((set) => ({
  signals: [],
  isLoading: false,
  error: null,
  getSignals: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllSignals({
        query: "",
        page: 1,
        limit: 100,
      });
      set({ signals: response.data, error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

const handleSignal = (action, data) => {
  switch (action) {
    case "signal_posted":
      useSignalStore.getState().getSignals();
      break;
    default:
      break;
  }
};

//Listen to the bot
flask_socket.on("bot", ({ action, data }) => {
  handleSignal(action, data);
});
node_socket.on("bot", ({ action, data }) => {
  handleSignal(action, data);
});
