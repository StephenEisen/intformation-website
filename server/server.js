const server = require("http").createServer();
const options = { cors: true, origins: ["http://127.0.0.1:3000"] };
const io = require("socket.io")(server, options);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("test", (data) => {
    io.sockets.emit("testOutput", data);
  });
});

server.listen(8080);
