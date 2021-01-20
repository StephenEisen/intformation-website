const importAll = (r) => r.keys().map(r);

/**
 * Array of all the character images located in "assets/characters".
 */
export const characterImages = importAll(require.context("assets/characters", false, /\.(png|jpe?g|svg)$/));

/**
 * Retrieve the path to a character image located in "assets/characters".
 *
 * @param {*} name String holding the character name.
 */
export const getCharacterImage = (name) => {
  const image = characterImages.find((image) => {
    const characterName = image.default.split('/')[3].split('.')[0];
    return characterName === name;
  });

  return image.default;
}

/**
 * Clones the given object to prevent having the same reference being updated.
 *
 * @param {*} obj Object
 */
export const clone = (obj) => {
  return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
}
