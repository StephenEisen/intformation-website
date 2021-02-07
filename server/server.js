import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectToDatabase } from './mongodb/connection.js';
import endpoints from './endpoints/index.js';
import socketEvents from './socket.io/index.js';

// Setup server
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: true, origins: [process.env.ORIGIN] });

// Connect to mongodb
connectToDatabase();

// Setup endpoints and socket.io listeners
endpoints(app, io);
socketEvents(io);

// Start the server
server.listen(8080);
