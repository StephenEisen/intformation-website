import express from 'express';
import sessionEndpoints from './session-endpoints.js'
import intelEndpoints from './intel-endpoints.js';
import statisticsEndpoints from './statistics-endpoints.js';
import { origin } from '../utils/constants.js';

// Common variables endpoints will use.
export const corsOptions = { origin: origin, optionsSuccessStatus: 200 };

/**
 * Endpoints to include within the server.
 * @param {import("express").Express} app Express object
 * @param {import("socket.io").Server} io Socket.io Server object
 */
const endpoints = (app, io) => {
  // Middlewares
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Endpoints
  intelEndpoints(app, io);
  statisticsEndpoints(app);
  sessionEndpoints(app, io);
}

export default endpoints;
