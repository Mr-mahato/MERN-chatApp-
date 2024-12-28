const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room", // Ensure this matches the name of your Room model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this matches the name of your User model
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
