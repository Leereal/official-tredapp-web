import { io } from "socket.io-client";

const socketURL = process.env.NEXT_PUBLIC_SOCKETIO_URL;

export const flask_socket = io(socketURL);
