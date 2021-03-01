import intelSockets from './intel-sockets.js';

/**
 * Endpoints to include within the server.
 * @param {import('socket.io').Server} io Socket.io Server object
 * @param {import('pino')} pino Pino logger object
 */
const socketEvents = (io, pino) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
      console.log(`${socket.id} has joined room: ${room}`);
      socket.join(room);
    });

    intelSockets(io, socket, pino);
  });
}

export default socketEvents;
