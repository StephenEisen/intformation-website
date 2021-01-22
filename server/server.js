const server = require("http").createServer();
const options = { cors: true, origins: ["http://epic7.gg"] };
const io = require("socket.io")(server, options);
const mongodb = require("./mongodb/connection.js");
const queries = require("./mongodb/queries.js");

// Connect to mongodb
mongodb.connect();

// Listen to socket events
io.on("connection", (socket) => {
  console.log(socket.id);

  //Creates new intel page, first checks to make sure the unique pageid is not already being used
  socket.on("createIntel", async () => {
    // Save new record into database
    const newIntel = await queries.createIntel();
    socket.emit("createIntelSuccess", newIntel);
  });

  // Search database for existing intel
  socket.on("findIntel", async (pageId) => {
    const exisitingIntel = await queries.findIntel(pageId);

    if (exisitingIntel != null) {
      socket.emit("findIntelSuccess", exisitingIntel);
    } else {
      socket.emit("findIntelError", "Intel not found or does not exist");
    }
  });

  socket.on("createTower", async (data) => {
    // Get data from database
    const exisitingIntel = await queries.findIntel(data.pageId);

    // Emit to everyone and create new tower
    if (data.location === "Stronghold" && exisitingIntel.data.filter((tower) => tower.location === "Stronghold").length < 1) {
      const newTower = await queries.createTower(data);
      io.sockets.emit("createTowerSuccess", newTower);
    }
    else if (data.location !== "Stronghold" && exisitingIntel.data.filter((tower) => tower.location === data.location).length < 9 && !exisitingIntel.data.some((tower) => tower.name === data.name)) {
      const newTower = await queries.createTower(data);
      io.sockets.emit("createTowerSuccess", newTower);
    }
    else {
      socket.emit("createTowerError", "Tower already exists");
    }
  });

  socket.on("getStatistics", async () => {
    const totalGuilds = await queries.countTotalGuilds();
    sockets.emite("getStatisticsSuccess", totalGuilds);
  });

  socket.on("updateCharacter", async (data) => {
    const updatedCharacter = await queries.updateTower(data);
    io.sockets.emit("updateCharacterSuccess", updatedCharacter);
  });
});

server.listen(8080);
