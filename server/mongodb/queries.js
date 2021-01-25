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
  const queryKey =
    "data." +
    characterData.towerIndex +
    ".characters." +
    characterData.characterIndex;

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
          notes: characterData.notes,
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
  guildData.forEach(guild => { console.log(guild.data)
    // let team1 = [];
    // let team2 = [];
    // guild.data.forEach(tower => {
    //  team1 = tower.characters.filter(a => a.team == 0).map(a => a.name).sort().join(":");
    // });
    // guild.data.forEach(tower => {
    //  team2 = tower.characters.filter(a => a.team == 1).map(a => a.name).sort().join(":");
    // });
    // if (teamMap.has(team1)){
    //   teamMap.set(team1, teamMap.get(team1) + 1);
    // }
    // else {
    //   teamMap.set(team1, 1);
    // }

    // if (teamMap.has(team2)){
    //   teamMap.set(team2, teamMap.get(team2) + 1);
    // }
    // else {
    //   teamMap.set(team2, 1);
    // }

  })
  console.log(teamMap);
  return null;
  // let teamMap = new Map();
  // return new Promise((resolve, reject) => {
  //   GuildData.find().stream()
  //   .on('data', element => {


  //   })
  //   .on('error', function(err){
  //     reject(err);
  //   })
  //   .on('end', function(){
  //     resolve(teamMap);
  //   });
  // })
}

module.exports = {
  findIntel,
  createIntel,
  createTower,
  updateCharacter,
  countTotalGuilds,
  countMostUsedTeams
};
