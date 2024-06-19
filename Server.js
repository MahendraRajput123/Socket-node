// server.js

const express = require("express");
// const http = require("http");
const https = require("https");
const fs = require("fs");

const { Server } = require("socket.io");

const app = express();

// Replace with the paths to your SSL/TLS certificate and private key files
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/ebitsvisionai.in/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/ebitsvisionai.in/fullchain.pem"),
};

const server = https.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Handle WebSocket connections here
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);

  // Listen for incoming messages from clients
  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Listen for incoming messages from clients
  socket.on("snapshot", (message) => {

    console.log(message,"COMMING SERVRE-----------")
    // Broadcast the message to all connected clients
    io.emit("snapshot", message);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });

  // Handle disconnections
  socket.on("recognised", (data) => {
    console.log(data);
  });

  // Handle disconnections
  socket.on("registered", (data) => {
    console.log(data.name);
  });

  // Handle disconnections
  socket.on("train", (data) => {
    console.log("-------------------------------------fired final event------------------",data);
  });


});

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const PORT = 2020; // or any other port you prefer
server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});