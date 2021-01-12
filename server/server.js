const server = require("http").createServer();
const options = { cors: true, origins: ["http://127.0.0.1:3000"] };
const io = require("socket.io")(server, options);

// SAMPLE DATA...REMOVE!!!!!!!!!!!!!!!!!!!!!!!!!
const towerData = [{
  name: "tower1",
  pageKey: "2398123asdj9",
  location: "Bronze Fortress",
}];

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("updateTower", (data) => {
    // Get data from database
    const towerDataFromDB = towerData.find((tower) => tower.name === data.name);

    // Emit to everyone and create new tower
    if (towerDataFromDB == null) {
      // Save new record into database
      towerData.push({ name: data.name, location: data.location });
      io.sockets.emit("towerUpdateSuccess", towerData[towerData.length-1]);
    } else {
      socket.emit("towerUpdateError", "Tower already exists");
    }
  });
});

server.listen(8080);
