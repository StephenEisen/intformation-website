import express from 'express';
import http from 'http';
import Pino from 'pino';
import PinoHttp from 'express-pino-logger';
import { Server } from 'socket.io';
import { connectToDatabase } from './mongodb/connection.js';
import { origin } from './utils/constants.js';
import endpoints from './endpoints/index.js';
import socketEvents from './socket.io/index.js';

// Setup server
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: true, origins: [origin] });
const pino = new Pino(process.env.LOG_LOCATION || './server.log');
const logger = new PinoHttp({ logger: pino, useLevel: process.env.LOG_LEVEL || 'info' });

// Setup middleware
app.use(logger);

// Connect to mongodb
connectToDatabase();

// Setup endpoints and socket.io listeners
endpoints(app, io);
socketEvents(io, pino);

// Start the server
server.listen(8080);
