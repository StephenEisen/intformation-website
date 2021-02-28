import { Routes, TowerLocations, TowerLocationToPath } from "./constants";

/**
 * Clones the given object to prevent having the same reference being updated.
 * @param {object} obj object
 */
export const clone = (obj) => {
  return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
}

/**
 * Checks if the given string is consists of all whitespace.
 * @param {string} str string
 */
export const isEmptyString = (str) => {
  return str.replace(/\s/g, '').length === 0;
}

/**
 * Updates the URL given the input parameters. This does not trigger a reload.
 * @param {History} history
 * @param {string} pageId
 * @param {string} towerLocation
 * @param {number} towerIndex
 */
export const updateIntelPath = (history, pageId, towerLocation, towerIndex) => {
  let path = `${Routes.Intel}/${pageId}`;

  if (towerLocation && TowerLocations.includes(towerLocation)) {
    const index = towerIndex != null && towerIndex >= 0 && towerIndex <= 8 ? towerIndex + 1 : null;

    path += `/${TowerLocationToPath[towerLocation]}`;
    path = index ? `${path}/${index}` : path;
  }

  history.push(path);
}
