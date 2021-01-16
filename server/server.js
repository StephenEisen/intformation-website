const server = require("http").createServer();
const options = { cors: true, origins: ["http://127.0.0.1:3000"] };
const io = require("socket.io")(server, options);
const mongodb = require("./mongodb/connection.js");
const queries = require("./mongodb/queries.js");

mongodb.connect();

io.on("connection", (socket) => {
  console.log(socket.id);

  //Creates new intel page, first checks to make sure the unique pageid is not already being used
  socket.on("createGuildData", async (data) => {
    const towerDataFromDB = await queries.findById(data.pageId);

    if (towerDataFromDB == null) {
      // Save new record into database
      const newData = await queries.createGuildData(data);
      socket.emit("createGuildDataSuccess", newData);
      console.log(socket.id);
    } else {
      socket.emit("createGuildDataError", "GuildData already exists");
    }
  });

  // Search database for existing intel
  socket.on("findExistingGuildData", async (data) => {
    const towerDataFromDB = await queries.findById(data.pageId);

    if (towerDataFromDB != null) {
      socket.emit("findExistingGuildDataSuccess", towerDataFromDB.data);
    } else {
      socket.emit("findExistingGuildDataError", "Intel not found or does not exist");
    }
  });

  socket.on("createTowerData", async (data) => {
    // Get data from database
    const towerDataFromDB = await queries.findById(data.pageId);

    // Emit to everyone and create new tower
    if(data.location === "Stronghold" && towerDataFromDB.data.filter((tower) => tower.location === "Stronghold").length < 1){
      const newData = await queries.createTowerData(data);
      io.sockets.emit("createTowerDataSuccess", newData);
    }
    else if(data.location !== "Stronghold" && towerDataFromDB.data.filter((tower) => tower.location === data.location).length < 9 && !towerDataFromDB.data.some((tower) => tower.name === data.name)){
      const newData = await queries.createTowerData(data);
      io.sockets.emit("createTowerDataSuccess", newData);
    }
    else {
      socket.emit("createTowerDataError", "Tower already exists");
    }
  });

  socket.on("updateCharacterHp", async (data) => {
    const towerDataFromDb = await queries.findById(data.pageId);
    const towerData = towerDataFromDb.data.find(
      (towerData) => towerData.name === data.name
    );
    console.log(towerData);
  });
});

server.listen(8080);
