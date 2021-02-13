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
      const towerList = filterTowerList(updatedIntel.data, towerLocation);
      io.sockets.to(pageId).emit('addTowerSuccess', towerList);
    }
    else if (towerLocation !== 'Stronghold' && exisitingIntel.data.filter((tower) => tower.location === towerLocation).length < 9 && !exisitingIntel.data.some((tower) => tower.name === towerName)) {
      const updatedIntel = await queries.createTower(pageId, towerLocation, towerName);
      const towerList = filterTowerList(updatedIntel.data, towerLocation);
      io.sockets.to(pageId).emit('addTowerSuccess', towerList);
    }
    else {
      io.sockets.to(pageId).emit('addTowerError', 'Tower already exists');
    }
  });

  socket.on('filterTower', async ({ pageId, towerLocation, towerName }) => {
    const exisitingIntel = await queries.findIntel(pageId);
    const towerList = filterTowerList(exisitingIntel.data, towerLocation, towerName);
    socket.emit('filterTowerSuccess', towerList);
  });

  socket.on('updateCharacter', async (characterData) => {
    const updatedIntel = await queries.updateCharacter(characterData);
    const towerList = filterTowerList(updatedIntel.data, characterData.towerLocation, characterData.towerName);
    socket.broadcast.to(characterData.pageId).emit('updateCharacterSuccess', towerList);
  });
}

/** =============================================
 ** Helper functions
 ** ========================================== */
const filterTowerList = (towerList, towerLocation, towerName) => {
  // Return a filtered list
  if (towerLocation !== 'All') {
    const filteredTowerList = towerList.filter((tower) => {
      if (towerName) {
        return tower.location === towerLocation && tower.name === towerName;
      }
      return tower.location === towerLocation;
    });

    return filteredTowerList;
  }

  // Return all the towers (no filter)
  return towerList;
}

export default intelSockets;
