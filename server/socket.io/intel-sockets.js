import * as queries from '../mongodb/queries.js';

/**
 * All the socket event listeners for the intel page.
 * @param {import('socket.io').Server} io Socket.io Server object
 * @param {import('socket.io').Socket} socket Socket.io Socket object
 * @param {import('pino')} pino Pino logger object
 */
const intelSockets = (io, socket, pino) => {
  socket.on('addTower', async (towerData) => {
    try {
      const updatedIntel = await queries.addTower(towerData);
      const towerLocation = towerData.towerLocation;
      const towerList = updatedIntel.towerList;
      const towerId = towerList[towerLocation][towerData.towerIndex]._id;
      const newTowerData = { towerList, towerLocation, towerId };

      // Emit new tower only to client
      socket.emit('addTowerSuccess', newTowerData);

      // Emit updated tower list to everyone
      io.sockets.to(towerData.pageId).emit('towerListUpdateSuccess', towerList);

    } catch (err) {
      socket.emit('addTowerError', 'Error: Could not add a new tower');
      pino.error(err, '500: Could not add a new tower');
    }
  });

  socket.on('filterTower', async ({ pageId, towerLocation }) => {
    try {
      const exisitingIntel = await queries.findIntel(pageId);
      const towerList = exisitingIntel.towerList;
      socket.emit('filterTowerSuccess', { towerList, towerLocation });
    } catch (err) {
      socket.emit('filterTowerError', 'Error: Could not filter the location or tower');
      pino.error(err, '500: Could not filter the location or tower');
    }
  });

  socket.on('updateTowerName', async (towerData) => {
    try {
      const updatedIntel = await queries.updateTowerName(towerData);
      const towerList = updatedIntel.towerList;
      const newTowerData = { towerId: towerData.towerId, towerName: towerData.towerName };
      socket.broadcast.to(towerData.pageId).emit('updateTowerNameSuccess', newTowerData);

      // Emit updated tower list to everyone
      io.sockets.to(towerData.pageId).emit('towerListUpdateSuccess', towerList);

    } catch (err) {
      socket.emit('updateTowerNameError', 'Error: Could not update the tower name');
      pino.error(err, '500: Could not update the tower name');
    }
  });

  socket.on('updateCharacter', async (characterData) => {
    try {
      const updatedIntel = await queries.updateCharacter(characterData);
      const towerLocation = characterData.towerLocation;
      const towerList = updatedIntel.towerList[towerLocation];
      const towerData = towerList.find((tower) => tower._id.toString() === characterData.towerId);
      socket.broadcast.to(characterData.pageId).emit('updateCharacterSuccess', towerData);

      // Emit updated tower list so the back and forward button work correctly
      socket.emit('towerListUpdateSuccess', updatedIntel.towerList);

    } catch (err) {
      socket.emit('updateCharacterError', 'Error: Could not update the character');
      pino.error(err, '500: Could not update the character');
    }
  });

  socket.on('updateCharactersUsed', async (charactersUsedData) => {
    try {
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

    } catch (err) {
      socket.emit('updateCharactersUsedError', 'Error: Could not update the characters used');
      pino.error(err, '500: Could not update the characters used');
    }
  });
};

export default intelSockets;
