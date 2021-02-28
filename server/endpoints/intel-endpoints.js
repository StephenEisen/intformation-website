import cors from 'cors';
import multer from 'multer';
import { corsOptions } from './index.js';
import { uploadImageToS3, getImagesFromS3 } from '../aws/s3.js';
import * as queries from '../mongodb/queries.js';
import * as passwords from '../utils/passwords.js';

const apiPath = '/api/intel';
const upload = multer({ limits: { fileSize: 10e6 } })

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
      request.log.error('500: Intel creation failed', err);
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
      request.log.error('500: Server error on intel retrieval', err);
      response.status(500).send();
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
      request.log.error('500: Server error on update password', err);
      response.status(500).send();
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
        request.log.error('403: Forbidden due to invalid token');
        response.status(403).send();
      }
    } catch (err) {
      request.log.error('500: Server error on token verification', err);
      response.status(500).send();
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

      // Upload to AWS S3 bucket
      const imagePath = await uploadImageToS3(request.file, pageId, towerId, teamIndex);
      const imageData = { imagePath, towerId, teamIndex };

      // Upload image path to database (TODO: Add back in if we can sync deleting images from S3 and our database)
      // const towerLocation = request.query.towerLocation;
      // await queries.updateTeamImage({ imagePath: imageData.imagePath, pageId, towerLocation, towerId, teamIndex });

      // Send back information to all clients
      io.sockets.to(pageId).emit('imageUploadSuccess', imageData);

      response.status(204).send();

    } catch (err) {
      io.sockets.to(pageId).emit('imageUploadError', 'Error uploading image');
      request.log.error('500: Server error on image upload', err);
      response.status(500).send();
    }
  });

  app.get(`${apiPath}/:pageId/image`, cors(corsOptions), async (request, response) => {
    try {
      const pageId = request.params.pageId;
      const towerId = request.query.towerId;
      const images = await getImagesFromS3(pageId, towerId);

      // Retrieve image path from database (TODO: Add back in if we can sync deleting images from S3 and our database)
      // const towerLocation = request.query.towerLocation;
      // const images = await queries.getTeamImages({ pageId, towerLocation, towerId });

      response.status(200).send(images);

    } catch (err) {
      request.log.error('500: Server error on image upload', err);
      response.status(500).send({});
    }
  });
}

export default intelEndpoints;
