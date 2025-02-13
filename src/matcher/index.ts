/**
 * This module is responsible for matching text - checking if word
 * is capitalized, if it is a time abbreviation, etc.
 * @module
 */

/**
 * Checks if the word is capitalized.
 *
 * @param word - the word to check
 * @returns true if the word is capitalized
 */
export function isCapitalized(word: string): boolean {
  const char = word.charAt(0);
  return char.toLowerCase() !== char;
}

/**
 * Checks if the word starts with an opening quote, a capitalized letter or
 * a number.
 *
 * @param word - the word to check
 * @returns true if the word is a sentence starter
 */
export function isSentenceStarter(word: string): boolean {
  const firstChar = word.charAt(0);
  return (
    isCapitalized(word) ||
    isNumber(word) ||
    firstChar === '"' ||
    firstChar === "'" ||
    word.substring(0, 2) === "``"
  );
}

const trimRegExp = /[-'`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi;

/**
 * Checks if the word is an abbreviation.
 *
 * @param abbreviations - the abbreviations list
 * @param word - the word to check
 * @returns true if the word is an abbreviation
 */
export function isCommonAbbreviation(
  abbreviations: string[],
  word: string
): boolean {
  const trimmedWord = word.replace(trimRegExp, "");
  return abbreviations.includes(trimmedWord);
}

const dayRegExp = /day\W*$/;

/**
 * Checks if the word combination is a time abbreviation.
 *
 * @param word - the word to check
 * @param nextWord - the word after the actual word
 * @returns true if the word is a time abbreviation
 */
export function isTimeAbbreviation(word: string, nextWord: string) {
  return (word === "a.m." || word === "p.m.") && dayRegExp.test(nextWord);
}

const dottedRegExp = /.\../;

/**
 * Checks if the word is a dotted abbreviation (i.e. K.L.M or I.C.T).
 *
 * @param word - the word to check
 * @returns true if the word is a dotted abbreviation
 */
export function isDottedAbbreviation(word: string) {
  return dottedRegExp.test(word);
}

/**
 * Returns true if the word pair is a custom abbreviation (i.e. T 3000)
 *
 * @param word - the word to check
 * @param nextWord - the next word
 * @returns true if the word pair is a custom abbreviation
 */
export function isCustomAbbreviation(word: string, nextWord: string) {
  return (
    isNumber(nextWord) &&
    (word.length <= 3 || isCapitalized(word) || isNumber(word))
  );
}

/**
 * Checks if the word is a name.
 *
 * Uses current word count in sentence and next few words to check if it is
 * more likely an abbreviation + name or new sentence.
 *
 * @param wordCount - the current word count in the sentence
 * @param words - the words in the sentence
 * @returns true if the word is detected as a name
 */
export function isNameAbbreviation(wordCount: number, words: string[]) {
  if (words.length > 0) {
    if (
      wordCount < 5 &&
      words[0].length < 6 &&
      (isCapitalized(words[0]) || isNumber(words[0]))
    ) {
      return true;
    }

    let count = 0;

    for (const word of words) {
      if (isCapitalized(word)) count++;
      if (count >= 3) return true;
    }
  }

  return false;
}

/**
 * Checks if the string is a number.
 *
 * @param str - the string to check
 * @returns true if the string is a number
 */
export function isNumber(str: string) {
  return !isNaN(+str);
}

const phoneRegExp =
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

/**
 * Checks if the string is a valid phone number.
 *
 * Source: https://stackoverflow.com/a/123666/951517
 *
 * @param str - the string to check
 * @returns true if the string is a phone number
 */
export function isPhoneNumber(str: string) {
  return phoneRegExp.test(str);
}

const urlRegExp =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

/**
 * Checks if the string is a URl or email.
 *
 * Source: https://stackoverflow.com/a/3809435/951517
 *
 * @param str - the string to check
 * @returns true if the string is a URL or email
 */
export function isURLOrEmail(str: string) {
  return urlRegExp.test(str);
}

const letterRegExp = /[a-zA-Z]/;

/**
 * Checks if the string is a concatenation of two words.
 *
 * @param str - the string to check
 * @returns true if the string is a concatenation of two words
 */
export function isConcatenated(str: string): [string, string] | null {
  let index = 0;

  if (
    (index = str.indexOf(".")) > -1 ||
    (index = str.indexOf("!")) > -1 ||
    (index = str.indexOf("?")) > -1
  ) {
    const char = str.charAt(index + 1);

    // Check if the next word starts with a letter
    if (letterRegExp.test(char)) {
      return [str.slice(0, index), str.slice(index + 1)];
    }
  }

  return null;
}

/**
 * Checks if the word is a sentence boundary char.
 *
 * @param word - the word to check
 * @returns true if the word is a boundary char
 */
export function isBoundaryChar(word: string) {
  return word === "." || word === "!" || word === "?";
}
