import GuildData from './guild-data.js';
import IntelPassword from './intel-password.js';
import UserAccount from './accounts.js'

export async function findIntel(pageId) {
  return GuildData.findOne({ pageId });
}

export async function createIntel() {
  const newData = new GuildData({
    pageId: Math.random().toString(36).slice(2),
    createdDate: new Date(),
    towerList: {
      'Stronghold': {},
      'Bronze Fortress': Array(9).fill({}),
      'Silver Fortress': Array(9).fill({}),
      'Dalberg Fortress': Array(9).fill({})
    }
  });
  return newData.save();
}

export async function addTower(towerData) {
  const setQueryKey = `towerList.${towerData.towerLocation}.${towerData.towerIndex}`;

  const newTowerName = towerData.towerName && towerData.towerName.replace(/\s/g, '').length > 0
    ? towerData.towerName
    : `Tower ${towerData.towerIndex + 1}`;

  return GuildData.findOneAndUpdate(
    {
      pageId: towerData.pageId
    },
    {
      $set: {
        [setQueryKey]: {
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
  const towerLocation = characterData.towerLocation;
  const findQueryKey = `towerList.${towerLocation}._id`;
  const setQueryKey = `towerList.${towerLocation}.$.characters.${characterData.characterIndex}`;

  return GuildData.findOneAndUpdate(
    {
      pageId: characterData.pageId,
      [findQueryKey]: characterData.towerId
    },
    {
      $set: {
        [setQueryKey]: {
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

export async function updateCharactersUsed(charactersUsedData) {
  const towerLocation = charactersUsedData.towerLocation;
  const operator = charactersUsedData.isNewRow ? '$push' : '$set';
  const findQueryKey = `towerList.${towerLocation}._id`;

  // Create the set query key depending on if a new row or not
  let setQueryKey = `towerList.${towerLocation}.$.charactersUsed.team${charactersUsedData.team}`;
  setQueryKey = !charactersUsedData.isNewRow ? `${setQueryKey}.${charactersUsedData.rowIndex}` : setQueryKey;

  // Push or set data
  return GuildData.findOneAndUpdate(
    {
      pageId: charactersUsedData.pageId,
      [findQueryKey]: charactersUsedData.towerId
    },
    {
      [operator]: {
        [setQueryKey]: {
          team: charactersUsedData.team,
          characters: charactersUsedData.characters,
          victory: charactersUsedData.victory
        }
      }
    },
    {
      new: true,
      upsert: true
    }
  );
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
