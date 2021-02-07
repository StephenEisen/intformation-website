import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import intelEndpoints from './intel-endpoints.js';
import statisticsEndpoints from './statistics-endpoints.js';

// Common variables endpoints will use.
export const corsOptions = { origin: process.env.ORIGIN, optionsSuccessStatus: 200 };

/**
 * Endpoints to include within the server.
 * @param {express.Express} app Express object
 * @param {Server} io Socket.io Server object
 */
const endpoints = (app, io) => {
  // Middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())

  // Endpoints
  intelEndpoints(app, io);
  statisticsEndpoints(app);
}

export default endpoints;
