const bcrypt = require('bcrypt');
const queries = require('./mongodb/queries');
const saltRounds = 10;

const updatePassword = intel => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(intel.password, salt, async (err, hash) => {
        intel.password = hash;
        try {
          const updated = await queries.updatePassword(intel);
          resolve(updated);
        } catch (err) {
          reject(err);
        }
      });
    });
  });
}

module.exports = { updatePassword };