import GuildData from '../mongodb/guild-data.js'

export async function getStatsData() {
  const teamList = [];
  const guildData = await GuildData.find({ $where: "this.data.length >= 5" });

  guildData.forEach(guild => {
    guild.data.forEach(data => {
      const team1Characters = data.characters.filter(c => c.team === 1);
      const team2Characters = data.characters.filter(c => c.team === 2);

      if (team1Characters.length == 3 && team2Characters.length == 3) {
        const team1Key = team1Characters.map((c) => c.name).sort().join(':');
        const team2Key = team2Characters.map((c) => c.name).sort().join(':');

        const teamObject1 = getTeamObject(team1Key, team1Characters, teamList);
        const teamObject2 = getTeamObject(team2Key, team2Characters, teamList);

        setArtifactKey(teamObject1, team1Characters);
        setArtifactKey(teamObject2, team2Characters);
      }
    });
  });

  calculateAverages(teamList);
  return teamList.sort((a, b) => b.pickRate - a.pickRate);
}

function calculateAverages(teamList){
  teamList.forEach((teamData) => {
    const teamKeys = Object.keys(teamData);
    teamKeys.forEach((key) => {
      if (typeof teamData[key] !== 'string' && Object.keys(teamData[key]).length > 0) {
       const charactersKeys = Object.keys(teamData[key]);
       charactersKeys.forEach((characterKey) => {
         const artifactObject = teamData[key][characterKey];
         artifactObject.hpAverage = artifactObject.hpAverage / artifactObject.hpCounter;
         artifactObject.speedAverage = artifactObject.speedAverage / artifactObject.speedCounter;
       })
      }
    })
  })
}

function setArtifactKey(teamObject, teamCharacters){
  for (let i = 0; i < teamCharacters.length; i++){
    const nameKey = teamCharacters[i].name;
    const artifactKey = teamCharacters[i].artifact;

    if (artifactKey){
      if (!teamObject[nameKey][artifactKey]){
        teamObject[nameKey][artifactKey] = {
          hpAverage: 0,
          speedAverage: 0
        }
      }

      teamObject[nameKey][artifactKey].artifactCounter = teamObject[nameKey][artifactKey].artifactCounter + 1 || 1;
      calculateHpAverage(teamObject[nameKey][artifactKey], teamCharacters[i]);
      calculateSpeedAverage( teamObject[nameKey][artifactKey], teamCharacters[i]);
    }
  }
}

function calculateHpAverage(artifactObject, character){
  if (character.hp > 0){
    artifactObject.hpAverage = artifactObject.hpAverage + character.hp;
    artifactObject.hpCounter = artifactObject.hpCounter + 1 || 1;
  }
}

function calculateSpeedAverage(artifactObject, character){
  if (character.minSpeed > 0 && character.maxSpeed > 0){
    artifactObject.speedAverage = artifactObject.speedAverage +
    (character.minSpeed + character.maxSpeed) / 2;
    artifactObject.speedCounter = artifactObject.speedCounter + 1 || 1;
  }
}

function getTeamObject(teamKey, teamCharacters, teamList) {
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
