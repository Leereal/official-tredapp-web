import { io } from "socket.io-client";

const socketURL = process.env.NEXT_PUBLIC_NODE_SOCKETIO_URL;

export const socket = io(socketURL);
