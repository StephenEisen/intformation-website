const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('./mongodb/queries');
const saltRounds = 10;

const updatePassword = async request => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(request.password, salt, async (err, hash) => {
        try {
          const updated = await queries.updateIntelPassword(request.pageId, hash);
          resolve(updated);
        } catch (err) {
          reject(err);
        }
      });
    });
  });
};

const verifyPassword = async (pageId, plainText) => {
  const record = await queries.findIntelPassword(pageId);
  if (!record) {
    return true;
  }
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, record.password, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const generateToken = async (pageId) => {
  return new Promise((resolve, reject) => {
    const data = {
      pageId: pageId
    }
    const signature = "qMW!6uk5DV981hVY" // Generate a better secret and read from file system
    const expiration = "24h"
    return jwt.sign(data, signature, { expiresIn: expiration }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  })
}

const authenticateIntel = async (pageId, token) => {
  return new Promise((resolve, reject) => {
    const signature = "qMW!6uk5DV981hVY" // Generate a better secret and read from file system
    jwt.verify(token, signature, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded.pageId === pageId);
    });
  });
}

const authRequired = async (pageId) => {
  const record = await queries.findIntelPassword(pageId);
  if (record) {
    return true;
  }
  return false;
}

module.exports = {
  updatePassword,
  authenticateIntel,
  generateToken,
  authRequired,
  verifyPassword
};