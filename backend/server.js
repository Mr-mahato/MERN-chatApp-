const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);

// this is to allow the server to have cors with the client
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update this to match your client URL
    methods: ["GET", "POST"],
  },
});

require("dotenv").config();
const port = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" })); // Update this to match your client URL


// socket connection started
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // this will join to some room here
  socket.on("join_room", ({roomid , name}) => {
    // THIS IS JOINING THE ROOM WITH ID
    socket.join(roomid);
    // sending the name to other that the user has joined
    socket.to(roomid).emit('user_joined',{name});
    console.log(`User ID :- ${socket.id} joined room : ${roomid}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message",data);
  });


 

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("error", (err) => {
    console.log("Socket error:", err);
  });
});

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is alive: http://localhost:${port}`);
});
