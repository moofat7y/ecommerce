const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected successfuly");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = dbConnect;
