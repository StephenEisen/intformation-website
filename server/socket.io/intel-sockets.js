import * as queries from '../mongodb/queries.js';

/**
 * All the socket event listeners for the intel page.
 * @param {import('socket.io').Server} io Socket.io Server object
 * @param {import('socket.io').Socket} socket Socket.io Socket object
 */
const intelSockets = (io, socket) => {
  socket.on('addTower', async (towerData) => {
    // Emit to everyone and create new tower
    if (towerData.towerLocation === 'Stronghold') {
      const newTowerData = await addNewTower(towerData);
      io.sockets.to(towerData.pageId).emit('addTowerSuccess', newTowerData);
    }
    else {
      const newTowerData = await addNewTower(towerData);
      io.sockets.to(towerData.pageId).emit('addTowerSuccess', newTowerData);
    }
  });

  socket.on('filterTower', async ({ pageId, towerLocation }) => {
    const exisitingIntel = await queries.findIntel(pageId);
    const towerList = exisitingIntel.towerList;
    socket.emit('filterTowerSuccess', { towerList, towerLocation });
  });

  socket.on('updateCharacter', async (characterData) => {
    const updatedIntel = await queries.updateCharacter(characterData);
    const towerList = updatedIntel.towerList;
    const towerLocation = characterData.towerLocation;
    socket.broadcast.to(characterData.pageId).emit('updateCharacterSuccess', { towerList, towerLocation });
  });
};

/** =============================================
 ** Helper functions
 ** ========================================== */
const addNewTower = async (towerData) => {
  const updatedIntel = await queries.addTower(towerData);
  const towerLocation = towerData.towerLocation;
  const towerList = updatedIntel.towerList;
  const towerId = towerList[towerLocation][towerData.towerIndex]._id;

  return { towerList, towerLocation, towerId };
}

export default intelSockets;
