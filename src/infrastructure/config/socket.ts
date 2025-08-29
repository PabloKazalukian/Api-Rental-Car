// infrastructure/config/socket.ts
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer;

export const initSocket = (server: any) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:4200"],
      credentials: true,
    },
  });

  console.log("work");
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io no inicializado");
  return io;
};
