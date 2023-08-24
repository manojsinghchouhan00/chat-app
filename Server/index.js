const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (username) => {
    socket.username = username;
    console.log(`${username} joined the chat`);
  });

  socket.on("message", (message) => {
    console.log(`${socket.username}: ${message}`);
    io.emit("message", {
      username: socket.username,
      message: message,
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} left the chat`);
  });
});

server.listen(8000, () => {
  console.log("Server started on port 8000");
});
