import * as queries from '../mongodb/queries.js';

/**
 * All the socket event listeners for the intel page.
 * @param {import('socket.io').Server} io Socket.io Server object
 * @param {import('socket.io').Socket} socket Socket.io Socket object
 */
const intelSockets = (io, socket) => {
  socket.on('addTower', async (towerData) => {
    const updatedIntel = await queries.addTower(towerData);
    const towerLocation = towerData.towerLocation;
    const towerList = updatedIntel.towerList;
    const towerId = towerList[towerLocation][towerData.towerIndex]._id;
    const newTowerData = { towerList, towerLocation, towerId };

    // Emit new tower only to client
    socket.emit('addTowerSuccess', newTowerData);

    // Emit updated tower list to everyone
    io.sockets.to(towerData.pageId).emit('towerListUpdateSuccess', towerList);
  });

  socket.on('filterTower', async ({ pageId, towerLocation }) => {
    const exisitingIntel = await queries.findIntel(pageId);
    const towerList = exisitingIntel.towerList;
    socket.emit('filterTowerSuccess', { towerList, towerLocation });
  });

  socket.on('updateTowerName', async (towerData) => {
    const updatedIntel = await queries.updateTowerName(towerData);
    const towerList = updatedIntel.towerList;
    const newTowerData = { towerId: towerData.towerId, towerName: towerData.towerName };
    socket.broadcast.to(towerData.pageId).emit('updateTowerNameSuccess', newTowerData);

    // Emit updated tower list to everyone
    io.sockets.to(towerData.pageId).emit('towerListUpdateSuccess', towerList);
  });

  socket.on('updateCharacter', async (characterData) => {
    const updatedIntel = await queries.updateCharacter(characterData);
    const towerLocation = characterData.towerLocation;
    const towerList = updatedIntel.towerList[towerLocation];
    const towerData = towerList.find((tower) => tower._id.toString() === characterData.towerId);
    socket.broadcast.to(characterData.pageId).emit('updateCharacterSuccess', towerData);

    // Emit updated tower list so the back and forward button work correctly
    socket.emit('towerListUpdateSuccess', updatedIntel.towerList);
  });

  socket.on('updateCharactersUsed', async (charactersUsedData) => {
    const updatedIntel = await queries.updateCharactersUsed(charactersUsedData);

    const characters = {
      towerId: charactersUsedData.towerId,
      team: charactersUsedData.team,
      rowIndex: charactersUsedData.rowIndex,
      victory: charactersUsedData.victory,
      characters: charactersUsedData.characters
    };

    socket.broadcast.to(charactersUsedData.pageId).emit('updateCharactersUsedSuccess', characters);

    // Emit updated tower list so the back and forward button work correctly
    socket.emit('towerListUpdateSuccess', updatedIntel.towerList);
  });
};

export default intelSockets;
