const bcrypt = require('bcrypt');
const queries = require('./mongodb/queries');
const saltRounds = 10;

const updatePassword = request => {
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

const authenticateIntel = async (pageId, plainText) => {
  try {
    const intelPassword = await queries.findIntelPassword(pageId);
    if (!intelPassword) {
      return true;
    }
  } catch (err) {
    console.log('Error', err);
    reject(err);
  }
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, intelPassword.password, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { updatePassword, authenticateIntel };