import http from "http";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { error } from "./core/shared/errors/error";
import { userRoutes } from "./routes/user-routes";
import { roomRoutes } from "./routes/room-routes";
import { roomUserRoutes } from "./routes/room-user-routes";
import path from "path";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

// registrando as rotas do sistema
app.use(userRoutes);
app.use(roomRoutes);
app.use(roomUserRoutes);

// middleware para lidar com erros
app.use(error);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

io.on("connection", (socket) => {
  socket.on("userAdded", (data) => {
    handleUserAdded(data);
  });

  function handleUserAdded(data: any) {
    const { roomId, userId } = data;
    socket.join(roomId);
    io.to(roomId).emit("userEntered", { roomId, userId });
  }

  socket.on("sendMessage", (messageData) => {
    handleSendMessage(messageData);
  });

  function handleSendMessage(messageData: any) {
    const { roomId, userId, message } = messageData;
    socket.join(roomId);
    io.to(roomId).emit("messageReceived", { roomId, userId, message });
  }
});

export { serverHttp, io };
