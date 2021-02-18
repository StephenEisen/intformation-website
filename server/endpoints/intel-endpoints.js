import fs from 'fs';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import { corsOptions } from './index.js';
import { uploadImageToS3 } from '../aws/s3.js';
import * as queries from '../mongodb/queries.js';
import * as passwords from '../utils/passwords.js';

const apiPath = '/api/intel';
const upload = multer({limits: {fileSize: 10e6}})

/**
 * ALl endpoints defined for the intel page.
 * @param {import('express').Express} app Express object
 * @param {import('socket.io').Server} io Socket.io Server object
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
      response.status(500).send('Intel creation failed');
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
        let token = '';

        // Get the token from the authorization header
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
          token = request.headers.authorization.split(' ')[1];
        }

        if (await passwords.authRequired(pageId)) {
          if (token && await passwords.authenticateIntel(pageId, token)) {
            return response.status(200).send(intel);
          } else {
            return response.status(403).send('Forbidden');
          }
        } else {
          return response.status(200).send(intel);
        }
      } else {
        return response.status(404).send('Intel not found');
      }

    } catch (err) {
      console.error(err);
      response.status(500).send('Server error');
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
      response.status(500).send('Server error');
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
        response.status(403).send('Forbidden');
      }
    } catch (err) {
      response.status(500).send('Server error');
    }
  });

  /**
   * Writes the given image to a server directory. The teamIndex is used as the file name.
   * Currently the path is 'images/<pageId>/<towerIndex>/<teamIndex>'.
   *
   * TODO: Check if image is appropriate before saving.
   */
  app.options(`${apiPath}/:pageId/image`, cors(corsOptions));
  app.post(`${apiPath}/:pageId/image`, cors(corsOptions), upload.single('uploadedImage'), async (request, response) => {
    try {
      const pageId = request.params.pageId;
      const towerId = request.query.towerId;
      const teamIndex = Number(request.query.teamIndex);

      try {
        const imagePath = await uploadImageToS3(pageId, towerId, teamIndex, request.file);
        const imageData = { imagePath, towerId, teamIndex };
        io.sockets.to(pageId).emit('imageUploadSuccess', imageData);
      } catch (e) {
        io.sockets.to(pageId).emit('imageUploadError', 'Error uploading image');
      }

      response.status(204).send();
    } catch (err) {
      console.log(err)
    }
  });

  app.get(`${apiPath}/:pageId/image`, cors(corsOptions), (request, response) => {
    const pageId = request.params.pageId;
    const towerId = request.query.towerId;
    const images = getTowerImages(pageId, towerId);
    return response.status(200).send(images);
  })
}

/** =============================================
 ** Helper functions
 ** ========================================== */
const getTowerImages = (pageId, towerId) => {
  const dirName = `./images/${pageId}/${towerId}`;
  let towerImages = Array(2).fill('');

  if (fs.existsSync(dirName)) {
    const files = fs.readdirSync(dirName);

    for (let i = 0; i < files.length; i++) {
      const fullPath = path.join(dirName, files[i]);
      const fullPathParts = fullPath.replace(/\\/g, '/').split('/');
      const teamIndex = fullPathParts[3] - 1;
      towerImages.splice(teamIndex, 1, fs.readFileSync(fullPath));
    }
  }

  return { [towerId]: towerImages };
}

export default intelEndpoints;
