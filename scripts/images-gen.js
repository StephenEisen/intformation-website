const fs = require('fs');
const characters = JSON.parse(fs.readFileSync('../client/src/constants/character-info.json'));

const importArr = [];
const importMap = {};

for (let i = 0; i < characters.length; i++){
  console.log(characters[i].value);
  const value = characters[i].value.replace(/ /g, '').replace(/-/g, '').replace(/'/g, '');
  importArr.push(`import ${value} from '${characters[i].photo}';`);
}
importArr.push('');
importArr.push('export default CharacterImages = {');
for (let i = 0; i < characters.length; i++){
  const value = characters[i].value.replace(/ /g, '').replace(/-/g, '').replace(/'/g, '');
  importArr.push(`  ${value}: ${value},`)
}
importArr.push('}');

fs.writeFileSync('../client/src/globals/images.js', importArr.join("\n"));



