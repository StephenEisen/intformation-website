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

async function updateTower(towerData) {
  const queryKey = `data.${towerData.towerIndex}.characters.${towerData.teamIndex}`;

  return GuildData.findOneAndUpdate(
    { pageId: towerData.pageId, "data.name": towerData.towerName },
    {
      $set: {
        [queryKey]: {
          team: towerData.teamIndex, name: towerData.characterName
        }
      }
    },
    { new: true, upsert: true }
  );
};

module.exports = { findIntel, createIntel, createTower, updateTower };
