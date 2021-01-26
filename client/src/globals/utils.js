/**
 * Array of all the character images located in "assets/characters".
 */
export const characterImages = require.context("assets/characters", true);

/**
 * Clones the given object to prevent having the same reference being updated.
 *
 * @param {*} obj Object
 */
export const clone = (obj) => {
  return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
}
