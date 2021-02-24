import * as queries from '../mongodb/queries.js';

/**
 * All the socket event listeners for the intel page.
 * @param {import('socket.io').Server} io Socket.io Server object
 * @param {import('socket.io').Socket} socket Socket.io Socket object
 */
const intelSockets = (io, socket) => {
  socket.on('addTower', async (towerData) => {
    let newTowerData = {};

    // Emit new tower only to client
    if (towerData.towerLocation === 'Stronghold') {
      newTowerData = await addNewTower(towerData);
      socket.emit('addTowerSuccess', newTowerData);
    }
    else {
      newTowerData = await addNewTower(towerData);
      socket.emit('addTowerSuccess', newTowerData);
    }

    // Emit updated tower list to everyone
    io.sockets.to(towerData.pageId).emit('towerListUpdateSuccess', newTowerData.towerList);
  });

  socket.on('filterTower', async ({ pageId, towerLocation }) => {
    const exisitingIntel = await queries.findIntel(pageId);
    const towerList = exisitingIntel.towerList;
    socket.emit('filterTowerSuccess', { towerList, towerLocation });
  });

  socket.on('updateCharacter', async (characterData) => {
    const updatedIntel = await queries.updateCharacter(characterData);
    const towerList = updatedIntel.towerList[towerLocation];
    const towerLocation = characterData.towerLocation;
    const towerData = towerList.find((tower) => tower._id.toString() === characterData.towerId);
    socket.broadcast.to(characterData.pageId).emit('updateCharacterSuccess', towerData);
  });

  socket.on('updateCharactersUsed', async (charactersUsedData) => {
    await queries.updateCharactersUsed(charactersUsedData);

    const characters = {
      towerId: charactersUsedData.towerId,
      team: charactersUsedData.team,
      rowIndex: charactersUsedData.rowIndex,
      victory: charactersUsedData.victory,
      characters: charactersUsedData.characters
    };

    socket.broadcast.to(charactersUsedData.pageId).emit('updateCharactersUsedSuccess', characters);
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
