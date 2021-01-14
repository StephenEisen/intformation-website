const GuildData = require("./guild-data.js");

async function findById(id) {
  return  GuildData.findOne({ pageId: id });
}

async function saveNewData(guildData) {
  const newData = new GuildData({
    pageId: guildData.pageId,
    data: [{ name: guildData.name, location: guildData.location }],
  });

  return  newData.save();
}

module.exports = { findById, saveNewData };
