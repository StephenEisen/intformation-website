const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const bodyParser = require('body-parser');
const options = { cors: true, origins: ["http://localhost:3000"] };
const io = require("socket.io")(server, options);
const mongodb = require("./mongodb/connection.js");
const queries = require("./mongodb/queries.js");
const passwords = require('./passwords');
const users = require("./mongodb/users.js");

// Connect to mongodb
mongodb.connect();

// Setup middlewear
app.use(cors());
app.use(bodyParser.json())

// Api calls
app.get("/api/statistics/total-intels", async (request, response) => {
  const totalGuilds = await queries.countTotalGuilds();
  response.send({ totalGuilds: totalGuilds });
});

app.get("/api/statistics/most-frequently-used", async (request, response) => {
  try {
    const mostUsed = await queries.countMostUsedTeams();
    response.send(mostUsed);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/intel", async (request, response) => {
  try {
    const newIntel = await queries.createIntel();
    response.status(201).send(newIntel);
  } catch (err) {
    response.status(500).send("Intel create failed");
  }
});

app.get("/api/intel/:pageId", async (request, response) => {
  try {
    let token = "";
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
      token = request.headers.authorization.split(' ')[1];
    }
    const pageId = request.params.pageId;
    const intel = await queries.findIntel(pageId);
    if (await passwords.authRequired(pageId)) {
      if (token && await passwords.authenticateIntel(pageId, token)) {
        return response.status(200).send(intel);
      } else {
        return response.status(403).send("Forbidden");
      }
    } else {
      return response.status(200).send(intel);
    }
  } catch (err) {
    console.error(err);
    response.status(500).send("Server error");
  }
});

app.post("/api/intel/:pageId/password", async (request, response) => {
  try {
    await passwords.updatePassword(request.body);
    response.status(204).send();
  } catch (err) {
    response.status(500).send("Server error");
  }
});

app.post("/api/intel/:pageId/token", async (request, response) => {
  try {
    const plainText = request.body.password;
    if (await passwords.verifyPassword(request.params.pageId, plainText)) {
      const token = await passwords.generateToken(request.params.pageId);
      response.status(201).send(token);
    } else {
      response.status(403).send("Forbidden");
    }
  } catch (err) {
    response.status(500).send("Server error");
  }
});

// Listen to socket events
io.on("connection", (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = users.userJoin(socket.id, username, room);
    console.log(`${user.username} has joined room: ${user.room} with socket ${user.id}`);
    socket.join(user.room);
  });

  socket.on("createTower", async (data) => {
    // Get data from database
    const exisitingIntel = await queries.findIntel(data.pageId);

    // Emit to everyone and create new tower
    if (data.location === "Stronghold" && exisitingIntel.data.filter((tower) => tower.location === "Stronghold").length < 1) {
      const newTower = await queries.createTower(data);
      io.sockets.to(data.pageId).emit("createTowerSuccess", newTower);
    }
    else if (data.location !== "Stronghold" && exisitingIntel.data.filter((tower) => tower.location === data.location).length < 9 && !exisitingIntel.data.some((tower) => tower.name === data.name)) {
      const newTower = await queries.createTower(data);
      io.sockets.to(data.pageId).emit("createTowerSuccess", newTower);
    }
    else {
      io.sockets.to(data.pageId).emit("createTowerError", "Tower already exists");
    }
  });

  socket.on("updateCharacter", async (characterData) => {
    const updatedCharacter = await queries.updateCharacter(characterData);
    socket.broadcast.to(characterData.pageId).emit("updateCharacterSuccess", updatedCharacter);
  });
});

server.listen(8080);
