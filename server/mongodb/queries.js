import GuildData from './guild-data.js';
import IntelPassword from './intel-password.js';
import UserAccount from './accounts.js'

export async function findIntel(pageId) {
  return GuildData.findOne({ pageId });
}

export async function createIntel() {
  const newData = new GuildData({
    pageId: Math.random().toString(36).slice(2),
    data: Array(9).fill({})
  });
  return newData.save();
}

export async function updateTowerName(towerData) {
  const queryKey = `data.${towerData.towerIndex}`;

  const newTowerName = towerData.towerName && towerData.towerName.replace(/\s/g, '').length > 0
    ? towerData.towerName
    : `Tower ${towerData.towerIndex + 1}`;

  return GuildData.findOneAndUpdate(
    {
      pageId: towerData.pageId
    },
    {
      $set: {
        [queryKey]: {
          location: towerData.towerLocation,
          name: newTowerName,
          characters: Array(6).fill({})
        }
      }
    },
    {
      new: true,
      upsert: true
    }
  );
}

export async function updateCharacter(characterData) {
  const queryKey = `data.$.characters.${characterData.characterIndex}`;

  return GuildData.findOneAndUpdate(
    {
      pageId: characterData.pageId,
      'data._id': characterData.towerId
    },
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
        }
      }
    },
    {
      new: true,
      upsert: true
    }
  );
}

// The stackoverflow masterminds say this may not be efficeint
export async function countTotalGuilds() {
  const result = await GuildData.find({ $where: "this.data.length >= 5" });
  return result.length;
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

export async function createOrUpdateUser(user) {
  return UserAccount.findOneAndUpdate(
    {
      email: user.email
    },
    {
      $set: user
    },
    {
      new: true,
      upsert: true
    }
  );
}
