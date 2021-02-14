import * as queries from '../mongodb/queries.js';

/**
 * All the socket event listeners for the intel page.
 * @param {import('socket.io').Server} io Socket.io Server object
 * @param {import('socket.io').Socket} socket Socket.io Socket object
 */
const intelSockets = (io, socket) => {
  socket.on('addTower', async (towerData) => {
    const exisitingIntel = await queries.findIntel(towerData.pageId);

    // Emit to everyone and create new tower
    if (towerData.towerLocation === 'Stronghold' && exisitingIntel.data.filter((tower) => tower.location === 'Stronghold').length < 1) {
      const updatedIntel = await queries.updateTowerName(towerData);
      const towerList = updatedIntel.data;
      const towerId = updatedIntel.data[towerData.towerIndex]._id;
      io.sockets.to(towerData.pageId).emit('addTowerSuccess', { towerList, towerId });
    }
    else if (towerData.towerLocation !== 'Stronghold' && exisitingIntel.data.filter((tower) => tower.location === towerData.towerLocation).length < 9) {
      const updatedIntel = await queries.updateTowerName(towerData);
      const towerList = updatedIntel.data;
      const towerId = updatedIntel.data[towerData.towerIndex]._id;
      io.sockets.to(towerData.pageId).emit('addTowerSuccess', { towerList, towerId });
    }
    else {
      io.sockets.to(towerData.pageId).emit('addTowerError', 'Tower already exists');
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
};

export default intelSockets;
