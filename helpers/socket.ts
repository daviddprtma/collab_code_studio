import toast from "react-hot-toast";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export const initSocket = async () => {
  const socket = io("http://localhost:3000", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnection: true,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("connect_error", (err) => {
    console.log("Socket connection error", err);
    toast.error("Socket Connection failed, try again later");
  });

  socket.on("connect_timeout", (timeout) => {
    console.log("Socket connection timeout", timeout);
    toast.error("Socket Connection timeout, try again later");
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log("Socket reconnected", attemptNumber);
    toast.success("Socket reconnected");
  });

  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log("Socket reconnect attempt", attemptNumber);
    toast("Reconnecting to the server", {
      icon: "🔌",
    });
  });

  socket.on("reconnect_failed", () => {
    console.log("Socket reconnection failed");
    toast.error("Socket reconnection failed");
  });

  socket.on("reconnect_error", (error) => {
    console.log("Socket reconnection error", error);
    toast.error("Socket reconnection error");
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected", reason);
    toast.error("Socket disconnected");
  });

  return socket;
};
