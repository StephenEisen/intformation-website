const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const options = { cors: true, origins: ["http://127.0.0.1:3000"] };
const io = require("socket.io")(server, options);
const mongodb = require("./mongodb/connection.js");
const queries = require("./mongodb/queries.js");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

// Connect to mongodb
mongodb.connect();

app.get("/api/statistics/totalIntels", cors(corsOptions), async (request, response) => {
  const totalGuilds = await queries.countTotalGuilds();
  response.send({totalGuilds: totalGuilds});
});

app.get("/api/statistics/mostFrequentlyUsed", cors(corsOptions), async (request, response) => {
  try {
    const mostUsed = await queries.countMostUsedTeams();
    response.send(mostUsed);
  } catch (err){
    console.log(err);
  }
});

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

  socket.on("updateCharacter", async (characterData) => {
    const updatedCharacter = await queries.updateCharacter(characterData);
    io.sockets.emit("updateCharacterSuccess", updatedCharacter);
  });
});

server.listen(8080);
