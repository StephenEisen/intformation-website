const GuildData = require("./guild-data.js");

async function findIntel(pageId) {
  return GuildData.findOne({ pageId });
}

async function createIntel() {
  const newData = new GuildData({
    pageId: Math.random().toString(36).slice(2)
  });
  return newData.save();
}

async function createTower(towerData) {
  return GuildData.findOneAndUpdate(
    { pageId: towerData.pageId },
    {
      $push: {
        data: {
          name: towerData.name,
          location: towerData.location,
          characters: Array(6).fill({})
        }
      }
    },
    { new: true }
  );
}

async function updateTower(towerData) {
  const queryKey = `data.${towerData.towerIndex}.characters.${towerData.characterIndex}`;

  return GuildData.findOneAndUpdate(
    { pageId: towerData.pageId },
    {
      $set: {
        [queryKey]: {
          team: towerData.teamIndex,
          name: towerData.characterName
        }
      }
    },
    { new: true, upsert: true }
  );
};

async function countTotalGuilds(){
  return GuildData.count({});
};

async function countMostUsedDefence(){

};

module.exports = { findIntel, createIntel, createTower, updateTower, countTotalGuilds };
