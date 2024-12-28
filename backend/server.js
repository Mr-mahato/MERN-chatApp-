const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { createServer } = require("http");
dotenv.config();
const connectDB = require("./config/dbConn");
const User = require("./Model/UserSchema");
const Message = require("./Model/MessageSchema");
const Room = require("./Model/RoomsSchema");
const authRouter = require("./Routes/userRegistration");
const app = express();
app.use(cors());
const server = createServer(app);
app.use(express.json());
app.use("/api/v1", authRouter);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const users = new Map();

io.on("connection", (socket) => {
  console.log("Connection established", socket.id);

  // Handle user authentication
  socket.on("authenticate", async (userId) => {
    const user = await User.findById(userId); // after getting the user
    if (user) {
      users.set(user.username, { username: user.username, socketId: socket.id });

      io.emit("online users", Array.from(users.values()));
    } else {
      socket.disconnect();
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    users.forEach((value, key) => {
      if (value.socketId === socket.id) {
        users.delete(key);
      }
    });
    io.emit("online users", Array.from(users.values()));
  });

  // Handle user messages within a room
  socket.on("send message", async ({ payload, isChannel, chatName }) => {
    try {
      if (isChannel) {
        const message = new Message({
          content: payload.content,
          userId: payload.userId,
          roomId: payload.roomId,
          username: payload.username,
          timestamp: payload.time,
        });
        // await message.save();
        io.to(chatName).emit("new message", payload);
      } else {
        console.log(payload);

        // here the chatName is gonna be the socket id of the person who i want to send the messages.
        io.to(chatName).emit("new message", payload);
      }
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error_saving_message", { error: "Failed to save message" });
    }
  });

  // sender -> name , receiver->name
  socket.on("private message", ({ sender, receiver, message }) => {
    let receiverInfo = users[receiver];
    console.log(sender , receiver , message)
    users.forEach((val , ind)=>{
      if(val.username === receiver){
        receiverInfo = val;
      }
    })
    console.log(receiverInfo);
    console.log(receiverInfo);
    if (receiverInfo) {
      io.to(receiverInfo.socketId).emit("private_message", { sender, message });
    }
    // Send the message back to the sender as well
    socket.emit("private_message", { sender, message });
  });

  // Handle room joining / creation of the room when a particular socket joins the room
  socket.on("joinRoom", async (roomDetail) => {
    const { roomName, owner } = roomDetail;
    socket.join(roomName);

    let room = await Room.findOne({ name: roomName });
    if (!room) {
      room = new Room({ name: roomName, owner });
      await room.save();
    }
    io.emit("activeRooms", await Room.find().select("name"));
  });

  // Handle request to get all the rooms we have
  socket.on("allRooms", async () => {
    const rooms = await Room.find().select("name");
    socket.emit("activeRooms", rooms);
  });

  // Handle request for connected sockets or those who are online
  socket.on("getConnectedSockets", () => {
    socket.emit("connectedSockets", Array.from(io.sockets.sockets.keys()));
  });

  // Handle request for room information
  socket.on("getRoomInfo", async (roomName) => {
    const room = await Room.findOne({ name: roomName });
    if (room) {
      socket.emit("roomInfo", room);
    } else {
      socket.emit("roomInfo", { error: "Room not found" });
    }
  });
});

server.listen(3001, async (err) => {
  if (err) console.log("Error found", err);
  await connectDB();
  console.log("Your server is running like Usain Bolt....");
});
