require("dotenv").config();
const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require('cors')
server.use(helmet());
server.use(express.json());
server.use(cors())

const UserRouter = require("../Routes/users/users-route");
const RegisterRoute = require("../Routes/auth/auth-route");

server.use("/user", UserRouter);
server.use("/auth", RegisterRoute);

server.get("/", (req, res) => {
  res.status(200).json({ Server: "API working" });
});

module.exports = server;
