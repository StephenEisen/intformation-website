import DOMPurify from 'dompurify';
import { clone, isEmptyString } from './utils';

/**
 * Sanitizes all the values within the object recursively.
 * @param {object} obj oject
 */
export const sanitizeObject = (obj) => {
  const clonedObj = clone(obj);
  traverseAndSanitize(clonedObj);
  return clonedObj;
};

/**
 * Sanitizes the given input.
 * @param {string|number|boolean} input
 */
export const sanitizeInput = (input) => {
  const cleanInput = DOMPurify.sanitize(input);
  return convertInputType(input, cleanInput);
}

/** =============================================
 ** Helper functions
 ** ========================================== */
const traverseAndSanitize = (obj) => {
  for (const key in obj) {
    if (obj[key] === 'object') {
      traverseAndSanitize(obj[key]);
    } else {
      // Sanitize the input and update to correct type
      const cleanInput = DOMPurify.sanitize(obj[key]);
      obj[key] = convertInputType(obj[key], cleanInput);
    }
  }
};

const convertInputType = (dirtyInput, cleanInput) => {
  if (typeof dirtyInput === 'string') {
    return cleanInput;
  } else if (typeof dirtyInput === 'boolean') {
    return cleanInput === 'true';
  } else {
    return !isEmptyString(cleanInput) ? cleanInput : null;
  }
}
