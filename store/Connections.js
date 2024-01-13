import { create } from "zustand";
import { getConnectionsByUser } from "@/lib/actions/connection.actions";
import { flask_socket } from "@/lib/flask_socket";
import { node_socket } from "@/lib/node_socket";

export const useConnectionStore = create((set) => ({
  robotConnections: [],
  isLoading: false,
  error: null,
  getConnections: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await getConnectionsByUser({
        userId: userId,
        page: 1,
        limit: 10,
      });
      set({ robotConnections: response.data, error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  setProfit: (profit_data) => {
    set((state) => {
      if (profit_data.profit === null) {
        const u_id = state.robotConnections.find(
          (conn) => conn._id === profit_data._id
        )?.connector._id;
        state.getConnections(u_id);
      }
      const updatedRobotConnections = state.robotConnections.map(
        (robotConnection) => {
          if (robotConnection._id === profit_data._id) {
            return {
              ...robotConnection,
              profit: profit_data.current_profit,
            };
          }
          return robotConnection;
        }
      );

      return { robotConnections: updatedRobotConnections };
    });
  },
}));

const handleBot = (action, data) => {
  switch (action) {
    case "balance":
      useConnectionStore.getState().getConnections(data.connector);
      break;
    case "trade_success":
      useConnectionStore.getState().getConnections(data.connector);
      break;
    case "current_profit":
      useConnectionStore.getState().setProfit(data);
      break;
    case "closed_trade":
      useConnectionStore.getState().setProfit({ _id: data._id, profit: null });
      break;
    case "target_reached":
      useConnectionStore.getState().getConnections(data.connector);
      break;
    default:
      break;
  }
};

//Listen to the bot
flask_socket.on("bot", ({ action, data }) => {
  handleBot(action, data);
});
node_socket.on("bot", ({ action, data }) => {
  handleBot(action, data);
});
