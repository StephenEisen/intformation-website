import * as queries from '../mongodb/queries.js';

/**
 * All the socket event listeners for the intel page.
 * @param {import('socket.io').Server} io Socket.io Server object
 * @param {import('socket.io').Socket} socket Socket.io Socket object
 */
const intelSockets = (io, socket) => {
  socket.on('addTower', async ({ pageId, towerLocation, towerName }) => {
    // Get data from database
    const exisitingIntel = await queries.findIntel(pageId);

    // Emit to everyone and create new tower
    if (towerLocation === 'Stronghold' && exisitingIntel.data.filter((tower) => tower.location === 'Stronghold').length < 1) {
      const updatedIntel = await queries.createTower(pageId, towerLocation, towerName);
      io.sockets.to(pageId).emit('addTowerSuccess', updatedIntel.data);
    }
    else if (towerLocation !== 'Stronghold' && exisitingIntel.data.filter((tower) => tower.location === towerLocation).length < 9 && !exisitingIntel.data.some((tower) => tower.name === towerName)) {
      const updatedIntel = await queries.createTower(pageId, towerLocation, towerName);
      io.sockets.to(pageId).emit('addTowerSuccess', updatedIntel.data);
    }
    else {
      io.sockets.to(pageId).emit('addTowerError', 'Tower already exists');
    }
  });

  socket.on('filterTower', async (pageId) => {
    const exisitingIntel = await queries.findIntel(pageId);
    socket.emit('filterTowerSuccess', exisitingIntel.data);
  });

  socket.on('updateCharacter', async (characterData) => {
    const updatedIntel = await queries.updateCharacter(characterData);
    socket.broadcast.to(characterData.pageId).emit('updateCharacterSuccess', updatedIntel.data);
  });
}

export default intelSockets;
