import GuildData from './guild-data.js';
import IntelPassword from './intel-password.js';

export async function findIntel(pageId) {
  return GuildData.findOne({ pageId });
}

export async function createIntel() {
  const newData = new GuildData({
    pageId: Math.random().toString(36).slice(2),
  });
  return newData.save();
}

export async function createTower(towerData) {
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

export async function updateCharacter(characterData) {
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

// The stackoverflow masterminds say this may not be efficeint
export async function countTotalGuilds() {
  const result = await GuildData.find({ $where: "this.data.length >= 10" });
  return result.length;
}

export async function countMostUsedTeams() {
  const teamMap = new Map();
  const guildData = await GuildData.find({ $where: "this.data.length >= 10" });

  guildData.forEach(guild => {
    guild.data.forEach(data => {
      if (data.characters) {
        let team1 = data.characters.filter(c => c.team === 1).map(c => c.name).sort();
        let team2 = data.characters.filter(c => c.team === 2).map(c => c.name).sort();
        if (team1.length == 3 && team2.length == 3) {
          team1 = team1.join(':');
          team2 = team2.join(':');
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

export async function findIntelPassword(pageId) {
  const intelPassword = await IntelPassword.findOne({ pageId: pageId });
  return intelPassword;
}

export async function updateIntelPassword(pageId, hash) {
  const newAuth = new IntelPassword({
    pageId: pageId,
    password: hash
  });
  return newAuth.save();
}
