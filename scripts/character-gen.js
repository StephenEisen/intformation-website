
const fs = require('fs');
const characters = JSON.parse(fs.readFileSync('../client/src/constants/character-info.json'));

for (let i = 0; i < characters.length; i++){
    characters[i].photo = "assets/characters/" + characters[i].value + ".png";
}

const updatedCharacters = JSON.stringify(characters);
fs.writeFileSync('../client/src/constants/character-info.json', updatedCharacters);