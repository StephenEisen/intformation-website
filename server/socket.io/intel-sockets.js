import { Server, Socket } from 'socket.io';
import * as queries from '../mongodb/queries.js';

/**
 * All the socket event listeners for the intel page.
 * @param {Server} io Socket.io Server object
 * @param {Socket} socket Socket object
 */
const intelSockets = (io, socket) => {
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
}

export default intelSockets;
