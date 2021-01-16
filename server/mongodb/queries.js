const GuildData = require("./guild-data.js");

async function findById(id) {
  return GuildData.findOne({ pageId: id });
}

async function createGuildData(guildData) {
  const newData = new GuildData({
    pageId: guildData.pageId,
  });
  return newData.save();
}

async function createTowerData(towerData) {
  // const newData = new GuildData({
  //   pageId: towerData.pageId,
  //   data: [{ name: towerData.name, location: towerData.location }],
  // });

  return GuildData.updateOne(
    { pageId: towerData.pageId },
    { $push: { data: { name: towerData.name, location: towerData.location } } }
  );
}

module.exports = { findById, createTowerData, createGuildData };
