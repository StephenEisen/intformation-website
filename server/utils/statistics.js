import GuildData from '../mongodb/guild-data.js'

export async function getStatsData() {
  const teamList = [];
  const guildData = await GuildData.find();
  let totalGuildsAnalyzed = 0;

  guildData.forEach(guild => {
    const towerList = [
      ...guild.towerList['Stronghold'],
      ...guild.towerList['Bronze Fortress'],
      ...guild.towerList['Silver Fortress'],
      ...guild.towerList['Dalberg Fortress']
    ];

    const towersToAnalyze = towerList.filter((tower) => {
      const hasCharacterNames = tower.characters.length > 0 && tower.characters.every((character) => character.name);
      return hasCharacterNames;
    });

    if (towersToAnalyze && towersToAnalyze.length >= 5) {
      totalGuildsAnalyzed++;

      towerList.forEach(tower => {
        // Get the characters for each team
        const team1Characters = tower.characters.filter(c => c.team === 1);
        const team2Characters = tower.characters.filter(c => c.team === 2);

        if (team1Characters.length == 3 && team2Characters.length == 3) {
          // Build the team keys using the names and a delimeter
          const team1Key = team1Characters.map((c) => c.name).sort().join(':');
          const team2Key = team2Characters.map((c) => c.name).sort().join(':');

          // Get a new or an existing team object from the team list data
          // If a new one is returned, it will be pushed to the list.
          const team1Object = getTeamObject(teamList, team1Key, team1Characters);
          const team2Object = getTeamObject(teamList, team2Key, team2Characters);

          // Populate the stats per artifact for a given character in each team.
          populateArtifactData(team1Object, team1Characters);
          populateArtifactData(team2Object, team2Characters);
        }
      });
    }
  });

  // Calculate the averages per artifact for each character in all the available teams.
  calculateAverages(teamList);

  // Return a sorted list
  return { guildsAnalyzed: totalGuildsAnalyzed, teamList: teamList.sort((a, b) => b.pickRate - a.pickRate) };
}

function calculateAverages(teamList) {
  teamList.forEach((teamData) => {
    const teamDataKeyList = Object.keys(teamData);

    teamDataKeyList.forEach((dataKey) => {
      if (typeof teamData[dataKey] !== 'string' && Object.keys(teamData[dataKey]).length > 0) {
        const artifactKeyList = Object.keys(teamData[dataKey]);

        artifactKeyList.forEach((artifactKey) => {
          const artifactObject = teamData[dataKey][artifactKey];
          artifactObject.hpAverage = artifactObject.hpAverage / artifactObject.hpCounter;
          artifactObject.speedAverage = artifactObject.speedAverage / artifactObject.speedCounter;
        });
      }
    });
  });
}

function populateArtifactData(teamObject, teamCharacters) {
  for (let i = 0; i < teamCharacters.length; i++) {
    const character = teamCharacters[i];
    const nameKey = character.name;
    const artifactKey = character.artifact;

    if (artifactKey) {
      if (!teamObject[nameKey][artifactKey]) {
        teamObject[nameKey][artifactKey] = {
          hpAverage: 0,
          speedAverage: 0
        }
      }

      const artifactObject = teamObject[nameKey][artifactKey];
      artifactObject.artifactCounter = artifactObject.artifactCounter + 1 || 1;
      sumHpAverage(artifactObject, character);
      sumSpeedAverage(artifactObject, character);
    }
  }
}

function sumHpAverage(artifactObject, character) {
  if (character.hp > 0) {
    artifactObject.hpAverage = artifactObject.hpAverage + character.hp;
    artifactObject.hpCounter = artifactObject.hpCounter + 1 || 1;
  }
}

function sumSpeedAverage(artifactObject, character) {
  if (character.minSpeed > 0 && character.maxSpeed > 0) {
    artifactObject.speedAverage = artifactObject.speedAverage + (character.minSpeed + character.maxSpeed) / 2;
    artifactObject.speedCounter = artifactObject.speedCounter + 1 || 1;
  }
}

function getTeamObject(teamList, teamKey, teamCharacters) {
  let teamObject = teamList.find((team) => team.teamKey === teamKey);

  if (!teamObject) {
    teamObject = {
      teamKey: teamKey,
      [teamCharacters[0].name]: {},
      [teamCharacters[1].name]: {},
      [teamCharacters[2].name]: {},
    };
    teamList.push(teamObject);
  }

  teamObject.pickRate = teamObject.pickRate + 1 || 1;
  return teamObject;
}
