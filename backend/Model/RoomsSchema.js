const { mongoose } = require("mongoose");
const { Schema } = mongoose;
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;
