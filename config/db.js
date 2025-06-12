const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    console.log("process.env.MONGODB_URI : ",process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection failed::", err);
  }
};

module.exports = connectDb;
