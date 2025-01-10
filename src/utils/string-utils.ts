/**
 * capitalize() is a function that takes in a string as an argument and returns the same string with the first character capitalized.
 * It uses the optional chaining operator (?.) to check if the string exists before attempting to access its properties or methods.
 * The function uses charAt() to get the first character of the string and toUpperCase() to capitalize it, then combines it with the
 * rest of the string using slice().
 * Finally, it returns the modified string.
 */

export const capitalize = string => {
  if (!string) return string;
  return (
    string?.charAt?.(0)?.toUpperCase?.() + string?.slice?.(1)?.toLowerCase?.()
  );
};

export function isValidUrl(string) {
  try {
    if (string) {
      new URL(string);
      return true;
    }
  } catch (_) {
    return false;
  }
  return false;
}

export const sentenceCase = str => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
