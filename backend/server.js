const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const rooms = new Set();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("Connection established", socket.id);
  // socket disconnection time
  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);
  });
  // user sending some message to particular room to the socket
  socket.on("userMessage", (mssg) => {
    console.log(mssg);
    io.to(mssg.roomId).emit("chat_message", mssg);
  });

  // lets add event for adding the rooms here
  socket.on("joinRoom", (room) => {
    console.log(room);
    socket.join(room);
    rooms.add(room);
    io.emit("activeRooms", Array.from(rooms));
  });

  socket.on("allRooms", () => {
    console.log(rooms);
    console.log(rooms.size);
    socket.emit("activeRooms", Array.from(rooms));
  });

  socket.on("getConnectedSockets", () => {
    const connectedSockets = Array.from(io.sockets.sockets.keys());
    socket.emit("connectedSockets", connectedSockets);
  });

  // work on single individual user
});

server.listen(3001, (err) => {
  if (err) console.log("Error found", err);
  console.log("Your server is running like usain bolt....");
});
