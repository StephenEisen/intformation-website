import cors from 'cors';
import jwt from 'jsonwebtoken';
import { corsOptions } from './index.js';
import { OAuth2Client } from 'google-auth-library';
import UserAccount from '../mongodb/accounts.js';
import { createOrUpdateUser } from '../mongodb/queries.js';

const apiPath = '/api/session';

const clientId = '724205843180-cct4ta2hobvdop43rrfn9ac28pr0pldp.apps.googleusercontent.com';
const oauthClient = new OAuth2Client(clientId);

const tokenSecret = 'g%lNBvVg4S$LMzSX9iT0$81Kz'; // TODO: Generate a better secret and read from file system

const verify = async (token) => {
  const ticket = await oauthClient.verifyIdToken({
    idToken: token.id_token,
    audience: clientId
  });
  return ticket.getPayload();
};

const upsert = async (user) => {
  return await createOrUpdateUser({
    email: user.email,
    emailVerified: user.email_verified,
    name: user.name,
    firstName: user.given_name,
    lastName: user.family_name,
    locale: user.locale
  });
}

const generateToken = async (data) => {
  return new Promise((resolve, reject) => {
    const expiration = "24h";
    return jwt.sign(data, tokenSecret, { expiresIn: expiration }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

const sessionEndpoints = (app, io) => {
  app.options(`${apiPath}`, cors(corsOptions));
  app.post(`${apiPath}`, cors(corsOptions), async (request, response) => {
    try {
      const payload = await verify(request.body.token);
      const user = await upsert(payload);
      const token = await generateToken({
        email: user.email,
        emailVerified: user.emailVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        locale: user.locale,
        name: user.name
      });
      response.status(201).send(token);
    } catch (err) {
      console.error(err);
      response.status(500).send();
    }
  });
};

export default sessionEndpoints;


// email: {
//   type: String,
//   unique: true
// },
// emailVerified: Boolean,
// name: String,
// firstName: String,
// lastName: String,
// locale: String