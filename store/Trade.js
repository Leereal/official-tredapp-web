import { create } from "zustand";
import { flask_socket } from "@/lib/flask_socket";
import { node_socket } from "@/lib/node_socket";
import { getAllRobots } from "@/lib/actions/robot.actions";
import { toast } from "sonner";

export const useTradeStore = create((set) => ({
  isLoading: false,
  error: null,
  symbols: [],
  deriv: false,
  isSending: false,
  trade_error: "",
  getSymbols: async (socket) => {
    try {
      set({ isLoading: true });
      const response = await getAllRobots({
        query: "",
        category: "Semi-Auto",
        page: 1,
        limit: 100,
        socket, //Whether it's for python or node
      });
      set({ symbols: response.data[0]?.symbols, error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  setDeriv: (value) => {
    set((state) => {
      if (value) {
        state.getSymbols("Python");
        return { deriv: !value };
      } else {
        state.getSymbols("Node");
        return { deriv: !value };
      }
    });
  },
  trade: (data) => {
    handleEmit("signal", data);
    set({ isSending: true, trade_error: "" });
  },
  setIsSending: (value) => {
    set({ isSending: value });
  },
  setTradeError: (message) => {
    set({ trade_error: message, isSending: false });
  },
}));
const handleEmit = (action, data) => {
  const isDeriv = useTradeStore.getState().deriv;
  if (isDeriv) {
    node_socket.emit(action, data);
  } else {
    flask_socket.emit(action, data);
  }
};
const handleBot = (action, data) => {
  switch (action) {
    case "trade_success":
      useTradeStore.getState().setIsSending(false);
      toast.success("Trade opened successfully");
      break;
    case "trade_fail":
      useTradeStore.getState().setIsSending(false);
      toast.error(
        "Trade failed. Please make sure it's not running if so try again or contact support"
      );
      break;
    default:
  }
};
//Listen to the bot
flask_socket.on("bot", ({ action, data }) => {
  handleBot(action, data);
});
node_socket.on("bot", ({ action, data }) => {
  handleBot(action, data);
});

flask_socket.on("pending_order_success", (data) => {
  toast.success("Pending Order set successfully");
  useTradeStore.getState().setIsSending(false);
});

node_socket.on("pending_order_success", (data) => {
  toast.success("Pending Order set successfully");
  useTradeStore.getState().setIsSending(false);
});
