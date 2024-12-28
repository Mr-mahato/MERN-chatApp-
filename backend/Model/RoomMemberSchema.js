const { mongoose } = require("mongoose");
const { Schema } = mongoose;
const roomMemberSchema = new Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rooms",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const roomMemberModel = mongoose.model("room_member", roomMemberSchema);
module.exports = roomModel;
