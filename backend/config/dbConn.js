const { mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Error in db connection ", error);
  }
};

module.exports = connectDB;
