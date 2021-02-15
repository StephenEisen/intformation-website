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
