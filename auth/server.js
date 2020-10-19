require('dotenv').config()
const express = require("express");
const server = express();
const helmet = require("helmet");
server.use(helmet());
server.use(express.json())

server.get('/',(req,res)=>{
    res.status(200).json({Server: "API working"})
})

module.exports = server