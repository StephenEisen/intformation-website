const server = require("http").createServer();
const options = { cors: true, origins: ["http://127.0.0.1:3000"] };
const io = require("socket.io")(server, options);
const mongodb = require('./mongodb/connection.js');
const queries = require('./mongodb/queries.js');

mongodb.connect();

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("updateTower", async (data) => {
    // Get data from database
    //const towerDataFromDB = towerData.find((tower) => tower.name === data.name);
    const towerDataFromDB = await queries.findById(data.pageId);

    // Emit to everyone and create new tower
    if (towerDataFromDB == null) {
      // Save new record into database
      const newData = await queries.saveNewData(data);
      io.sockets.emit("towerUpdateSuccess", newData);
    } else {
      socket.emit("towerUpdateError", "Tower already exists");
    }
  });

  socket.on("updateCharacterHp", async (data) => {
    const towerDataFromDb = await queries.findById(data.pageId);
    const towerData = towerDataFromDb.data.find((towerData) => towerData.name === data.name);
    console.log(towerData);
  });

});

server.listen(8080);
