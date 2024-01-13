import { create } from "zustand";
import { getAllRobots } from "../lib/actions/robot.actions";
import { flask_socket } from "@/lib/flask_socket";
import { node_socket } from "@/lib/node_socket";

export const useRobotStore = create((set) => ({
  robots: [],
  isLoading: false,
  error: null,
  getRobots: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllRobots({
        query: "",
        page: 1,
        limit: 6,
      });
      set({ robots: response.data, error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  addRobot: (newRobot) => {
    set((state) => {
      return { robots: [...state.robots, newRobot] };
    });
  },
}));

export const useBotStore = create((set) => ({
  id: "",
  isPending: false,
  activation: (id, isPending, robot = null) => {
    manageBot(robot);
    set({ isPending, id });
  },
}));

const handleBot = (action, data) => {
  switch (action) {
    case "bot_started":
      useRobotStore.getState().getRobots();
      useBotStore.getState().activation("", false);
      break;
    default:
      break;
  }
};

const manageBot = (robot) => {
  if (robot) {
    if (robot.active) {
      if (robot.socket === "Python") {
        flask_socket.emit("handleBot", {
          id: robot._id,
          activate: false,
        });
      }
      if (robot.socket === "Node") {
        node_socket.emit("handleBot", {
          id: robot._id,
          activate: false,
        });
      }
    } else {
      let auto = false;
      if (robot.category.name !== "Semi-Auto") {
        auto = true;
      }
      if (robot.socket === "Python") {
        flask_socket.emit("handleBot", {
          id: robot._id,
          activate: true,
          auto,
        });
      }
      if (robot.socket === "Node") {
        node_socket.emit("handleBot", {
          id: robot._id,
          activate: true,
          auto,
        });
      }
    }
  }
};

//Listen to the bot
flask_socket.on("bot", ({ action, data }) => {
  handleBot(action, data);
});
node_socket.on("bot", ({ action, data }) => {
  handleBot(action, data);
});
