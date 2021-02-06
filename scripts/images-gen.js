const fs = require('fs');
const characters = JSON.parse(fs.readFileSync('../client/src/data/characters.json'));

// Write import lines
const importArr = [];

for (let i = 0; i < characters.length; i++) {
  const value = characters[i].value.replace(/ /g, '').replace(/-/g, '').replace(/'/g, '');
  importArr.push(`import ${value} from '${characters[i].photo}';`);
}

// Write javascript object that use the variables from the imports
importArr.push('');
importArr.push('export const CharacterImages = {');

for (let i = 0; i < characters.length; i++) {
  const value = characters[i].value.replace(/ /g, '').replace(/-/g, '').replace(/'/g, '');
  importArr.push(`  \'${characters[i].value}\': ${value},`)
}
importArr.push('};\n');

// Write to specified file
fs.writeFileSync('../client/src/globals/images.js', importArr.join("\n"));
