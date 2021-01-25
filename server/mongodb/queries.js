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

async function updateCharacter(characterData) {
  const queryKey = 'data.' + characterData.towerIndex + '.characters.' + characterData.characterIndex;

  return GuildData.findOneAndUpdate(
    { pageId: characterData.pageId },
    {
      $set: {
        [queryKey]: {
          team: characterData.team,
          name: characterData.name,
          hp: characterData.hp,
          speed: characterData.speed,
          artifact: characterData.artifact,
          notes: characterData.notes
        }
      }
    },
    { new: true, upsert: true }
  );
};

async function countTotalGuilds() {
  return GuildData.countDocuments();
};

module.exports = { findIntel, createIntel, createTower, updateCharacter, countTotalGuilds };
