// infrastructure/config/socket.ts
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer;

export const initSocket = (server: any) => {
  console.log("Initializing Socket.IO...");
  io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:4200", "http://localhost:3000", "*"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  console.log("Socket.IO initialized!");
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
  });

  return io;
};

export const getIO = () => {
  console.log(io)
  if (!io) throw new Error("Socket.io no inicializado");
  return io;
};
