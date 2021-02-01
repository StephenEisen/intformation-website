const GuildData = require('./guild-data.js');
const Authentication = require('./intel-password')

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
        data: {
          name: towerData.name,
          location: towerData.location,
          characters: Array(6).fill({}),
        },
      },
    },
    { new: true }
  );
}

async function updateCharacter(characterData) {
  const queryKey = `data.${characterData.towerIndex}.characters.${characterData.characterIndex}`;

  return GuildData.findOneAndUpdate(
    { pageId: characterData.pageId },
    {
      $set: {
        [queryKey]: {
          team: characterData.team,
          name: characterData.name,
          hp: characterData.hp,
          minSpeed: characterData.minSpeed,
          maxSpeed: characterData.maxSpeed,
          artifact: characterData.artifact,
          notes: characterData.notes,
          immunity: characterData.immunity,
          counter: characterData.counter,
          lifesteal: characterData.lifesteal
        },
      },
    },
    { new: true, upsert: true }
  );
}

async function countTotalGuilds() {
  return GuildData.countDocuments();
}

async function countMostUsedTeams() {
  const teamMap = new Map();
  const guildData = await GuildData.find({});

  guildData.forEach(guild => {
    guild.data.forEach(data => {
      if (data.characters) {
        let team1 = data.characters.filter(c => c.team === 1).map(c => c.name).sort().join(':')
        let team2 = data.characters.filter(c => c.team === 2).map(c => c.name).sort().join(':')

        if (team1.length == 3 && team2.length == 3) {
          if (teamMap.has(team1)) {
            teamMap.set(team1, teamMap.get(team1) + 1);
          } else {
            teamMap.set(team1, 1);
          }
          if (teamMap.has(team2)) {
            teamMap.set(team2, teamMap.get(team2) + 1);
          } else {
            teamMap.set(team2, 1);
          }
        }
      }
    });
  });

  return [...teamMap.entries()].sort((a, b) => b[1] - a[1]);
}

async function findIntelPassword(pageId) {
  const intelPassword = await Authentication.findOne({ pageId: pageId });
  return intelPassword;
}

async function updateIntelPassword(pageId, hash) {
  const newAuth = new Authentication({
    pageId: pageId,
    password: hash
  });
  return newAuth.save();
}

module.exports = {
  findIntel,
  createIntel,
  createTower,
  updateCharacter,
  countTotalGuilds,
  countMostUsedTeams,
  findIntelPassword,
  updateIntelPassword
};
