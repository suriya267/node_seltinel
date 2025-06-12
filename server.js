const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const server = express();
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDb();

server.use(cors());

server.use(express.json());
server.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
