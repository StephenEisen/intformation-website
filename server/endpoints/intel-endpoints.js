import fs from 'fs';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import express from 'express';
import { Server } from 'socket.io';
import { corsOptions } from './index.js';
import * as queries from '../mongodb/queries.js';
import * as passwords from '../utils/passwords.js';

const apiPath = '/api/intel';

/**
 * ALl endpoints defined for the intel page.
 * @param {express.Express} app
 * @param {Server} io
 */
const intelEndpoints = (app, io) => {
  /**
   * Creates a new intel in the database.
   */
  app.options(`${apiPath}`, cors(corsOptions));
  app.post(`${apiPath}`, cors(corsOptions), async (request, response) => {
    try {
      const newIntel = await queries.createIntel();
      response.status(201).send(newIntel);
    } catch (err) {
      response.status(500).send("Intel creation failed");
    }
  });

  /**
   * Finds an intel from the database and returns all the data for it.
   */
  app.options(`${apiPath}/:pageId`, cors(corsOptions));
  app.get(`${apiPath}/:pageId`, cors(corsOptions), async (request, response) => {
    try {
      const pageId = request.params.pageId;
      const intel = await queries.findIntel(pageId);

      if (intel) {
        let token = "";
        const images = {};

        // Get the token from the authorization header
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
          token = request.headers.authorization.split(' ')[1];
        }

        if (await passwords.authRequired(pageId)) {
          if (token && await passwords.authenticateIntel(pageId, token)) {
            populateIntelImages(`./images/${pageId}`, images);
            return response.status(200).send({ intel, images });
          } else {
            return response.status(403).send("Forbidden");
          }
        } else {
          populateIntelImages(`./images/${pageId}`, images);
          return response.status(200).send({ intel, images });
        }
      } else {
        return response.status(404).send('Intel not found');
      }

    } catch (err) {
      console.error(err);
      response.status(500).send("Server error");
    }
  });

  /**
   * Set or update a password for the given intel.
   */
  app.options(`${apiPath}/:pageId/password`, cors(corsOptions));
  app.post(`${apiPath}/:pageId/password`, cors(corsOptions), async (request, response) => {
    try {
      await passwords.updatePassword(request.body);
      response.status(204).send();
    } catch (err) {
      response.status(500).send("Server error");
    }
  });

  /**
   * Verify the given password and generate and token.
   */
  app.options(`${apiPath}/:pageId/token`, cors(corsOptions));
  app.post(`${apiPath}/:pageId/token`, cors(corsOptions), async (request, response) => {
    try {
      const plainText = request.body.password;

      if (await passwords.verifyPassword(request.params.pageId, plainText)) {
        const token = await passwords.generateToken(request.params.pageId);
        response.status(201).send(token);
      } else {
        response.status(403).send("Forbidden");
      }
    } catch (err) {
      response.status(500).send("Server error");
    }
  });

  /**
   * Writes the given image to a server directory. The teamIndex is used as the file name.
   * Currently the path is "images/<pageId>/<towerIndex>/<teamIndex>".
   *
   * TODO: Check if image is appropriate before saving.
   */
  app.options(`${apiPath}/:pageId/image`, cors(corsOptions));
  app.post(`${apiPath}/:pageId/image`, cors(corsOptions), multer().single('uploadedImage'), async (request, response) => {
    try {
      const pageId = request.params.pageId;
      const towerIndex = request.query.towerIndex;
      const teamIndex = request.query.teamIndex;

      await fs.promises.mkdir(`./images/${pageId}/${towerIndex}`, { recursive: true });
      fs.writeFileSync(`./images/${pageId}/${towerIndex}/${teamIndex}`, request.file.buffer);

      io.sockets.to(pageId).emit("imageUploadSuccess", {
        file: request.file,
        towerIndex: Number(towerIndex),
        teamIndex: Number(teamIndex)
      });

      response.status(204).send();
    } catch (err) {
      console.log(err)
    }
  });
}

/** =============================================
 ** Helper functions
 ** ========================================== */
const populateIntelImages = (dirName, images) => {
  if (fs.existsSync(dirName)) {
    const files = fs.readdirSync(dirName);

    files.forEach((file) => {
      const fullPath = path.join(dirName, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        populateIntelImages(fullPath, images);
      }
      else {
        const formatedPathParts = fullPath.replace(/\\/g, "/").split("/");
        const towerIndex = formatedPathParts[2];
        const teamIndex = formatedPathParts[3] - 1;
        images[towerIndex] = images[towerIndex] || Array(2).fill('');
        images[towerIndex].splice(teamIndex, 1, fs.readFileSync(fullPath));
      }
    });
  }
};

export default intelEndpoints;
