const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);

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
  // user sending some message to the socket
  socket.on("userMessage", (mssg) => {
    console.log(mssg);
    io.emit("chat_message", mssg);
  });
});

server.listen(3001, (err) => {
  if (err) console.log("Error found", err);
  console.log("Your server is running like usain bolt....");
});
