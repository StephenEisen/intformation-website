const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const options = { cors: true, origins: ["http://localhost:3000"] };
const io = require("socket.io")(server, options);
const mongodb = require("./mongodb/connection.js");
const queries = require("./mongodb/queries.js");
const bodyParser = require('body-parser');
const { updatePassword, authenticateIntel } = require('./passwords');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./mongodb/users.js");
const { query } = require("express");

// Connect to mongodb
mongodb.connect();

app.use(cors());
app.use(bodyParser.json())

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
    const plainText = "password";
    if (await authenticateIntel(request.params.pageId, plainText)) {
      const intel = await queries.findIntel(request.params.pageId);
      if (intel) {
        response.status(200).send(intel);
      } else {
        response.status(404).send();
      }
    } else {
      response.status(403).send("Forbidden");
    }
  } catch (err) {
    response.status(500).send("Server error");
  }
});

app.post("/api/intel/:pageId/password", async (request, response) => {
  try {
    await updatePassword(request.body);
    response.status(204).send();
  } catch (err) {
    response.status(500).send("Server error");
  }
});

app.post("/api/intel/:pageId/token", async (request, response) => {

  // TODO: Implement JWT token creation
  response.status(204).send();
});

// Listen to socket events
io.on("connection", (socket) => {
  socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);


    console.log(`${user.username} has joined room: ${user.room} with socket ${user.id}`);

    socket.join(user.room);



    // Get users and room info
    // io.to(user.room).emit('getRoomUsers', {
    //   room: user.room,
    //   users: getRoomUsers(user.room)
    // });
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

    // Broadcast to other users that a tower was created
    // io.sockets.broadcast.to(user.room).emit('newTower' ,`${user.username} has created a tower.`);
  });

  socket.on("updateCharacter", async (characterData) => {
    const updatedCharacter = await queries.updateCharacter(characterData);
    io.sockets.to(characterData.pageId).emit("updateCharacterSuccess", updatedCharacter);
  });
});

server.listen(8080);
