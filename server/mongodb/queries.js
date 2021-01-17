const GuildData = require("./guild-data.js");

async function findIntel(pageId) {
  return GuildData.findOne({ pageId });
}

async function createIntel() {
  const newData = new GuildData({
    pageId: Math.random().toString(36).slice(2),
  });
  return newData.save();
}

async function createTower(towerData) {
  return GuildData.findOneAndUpdate(
    { pageId: towerData.pageId },
    {
      $push: {
        data: { name: towerData.name, location: towerData.location }
      }
    },
    { new: true }
  );
}

module.exports = { findIntel, createIntel, createTower };
