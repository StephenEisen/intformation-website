import { Server } from 'socket.io';
import intelSockets from './intel-sockets.js';

/**
 * Endpoints to include within the server.
 * @param {Server} io Socket.io Server object
 */
const socketEvents = (io) => {
  io.on("connection", (socket) => {
    socket.on('joinRoom', (room) => {
      console.log(`${socket.id} has joined room: ${room}`);
      socket.join(room);
    });

    intelSockets(io, socket);
  });
}

export default socketEvents;
