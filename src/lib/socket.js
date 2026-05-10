import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_API_URL_WEBSOCKET || "http://localhost:3000",
  {
    autoConnect: false, // penting: biar connect manual
    transports: ["websocket"],
  },
);
