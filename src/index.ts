/**
 * The root library module, exports the sentences function.
 * @module
 */

import { englishAbbreviations } from "./abbreviations.js";
import * as matcher from "./matcher.js";

const spaceRegExp = /\S/;
const enumListRegExp = /^.{1,2}[.]$/;
const enumListAnotherRegExp = /[.]/;
const wordsSplitRegExp = /(\S+|\n+)/;

export interface SentencesOptions {
  abbreviations?: string[];
}

// Split the entry into sentences.
export function sentences(
  text: string,
  abbreviations = englishAbbreviations,
): string[] {
  // Whitespace-only string has no sentences
  if (!spaceRegExp.test(text)) return [];

  // Split the text into words
  let words: string[] | null;
  let tokens: string[];

  // Split the text into words
  tokens = text.split(wordsSplitRegExp);

  // every other token is a word
  words = tokens.filter((_, i) => i % 2);

  let wordCount = 0;
  let index = 0;
  let temp: string[] | null = null;
  let sentences = [];
  let current = [];

  // If given text is only whitespace (or nothing of \S+)
  if (!words || !words.length) {
    return [];
  }

  for (let i = 0; i < words.length; i++) {
    wordCount++;

    // Add the word to current sentence
    current.push(words[i]);

    // Sub-sentences, reset counter
    // @ts-expect-error: TODO
    if (~words[i].indexOf(",")) {
      wordCount = 0;
    }

    if (
      // @ts-expect-error: TODO
      matcher.isBoundaryChar(words[i]) ||
      // @ts-expect-error: TODO
      "?!".indexOf(words[i].slice(-1)) > -1
    ) {
      sentences.push(current);

      wordCount = 0;
      current = [];

      continue;
    }

    // @ts-expect-error: TODO
    if (words[i].endsWith('"') || words[i].endsWith("”")) {
      // @ts-expect-error: TODO
      words[i] = words[i].slice(0, -1);
    }

    // A dot might indicate the end sentences.
    //
    // Exception: The next sentence starts with a word (non abbreviation)
    // that has a capital letter.
    // @ts-expect-error: TODO
    if (words[i].endsWith(".")) {
      // Check if there is a next word
      // This probably needs to be improved with machine learning
      if (i + 1 < words.length) {
        // Single character abbr.
        // @ts-expect-error: TODO
        if (words[i].length === 2 && isNaN(+words[i].charAt(0))) {
          continue;
        }

        // Common abbr. that often do not end sentences
        // @ts-expect-error: TODO
        if (matcher.isCommonAbbreviation(abbreviations, words[i])) {
          continue;
        }

        // Next word starts with capital word, but current sentence is
        // quite short
        // @ts-expect-error: TODO
        if (matcher.isSentenceStarter(words[i + 1])) {
          // @ts-expect-error: TODO
          if (matcher.isTimeAbbreviation(words[i], words[i + 1])) {
            continue;
          }

          // Dealing with names at the start of sentences
          if (matcher.isNameAbbreviation(wordCount, words.slice(i, 6))) {
            continue;
          }

          // @ts-expect-error: TODO
          if (matcher.isCustomAbbreviation(words[i], words[i + 1])) {
            continue;
          }
        } else {
          // Skip ellipsis
          // @ts-expect-error: TODO
          if (words[i].endsWith("..")) {
            continue;
          }

          //// Skip abbreviations
          // Short words + dot or a dot after each letter
          // @ts-expect-error: TODO
          if (matcher.isDottedAbbreviation(words[i])) {
            continue;
          }

          if (matcher.isNameAbbreviation(wordCount, words.slice(i, 5))) {
            continue;
          }
        }
      }

      sentences.push(current);
      current = [];
      wordCount = 0;

      continue;
    }

    // Check if the word has a dot in it
    // @ts-expect-error: TODO
    if ((index = words[i].indexOf(".")) > -1) {
      // NOTE: I've no idea why slice is needed, but I did extract it from
      // isNumber (@kossnocorp)
      // @ts-expect-error: TODO
      if (matcher.isNumber(words[i].slice(index - 1, index + 2))) {
        continue;
      }

      // Custom dotted abbreviations (like K.L.M or I.C.T)
      // @ts-expect-error: TODO
      if (matcher.isDottedAbbreviation(words[i])) {
        continue;
      }

      // Skip urls / emails and the like
      // @ts-expect-error: TODO
      if (matcher.isURLOrEmail(words[i]) || matcher.isPhoneNumber(words[i])) {
        continue;
      }
    }

    // @ts-expect-error: TODO
    if ((temp = matcher.isConcatenated(words[i]))) {
      current.pop();
      current.push(temp[0]);
      sentences.push(current);

      current = [];
      wordCount = 0;
      current.push(temp[1]);
    }
  }

  if (current.length) {
    sentences.push(current);
  }

  // Clear "empty" sentences
  sentences = sentences.filter((s) => s.length > 0);

  const result = sentences.slice(1).reduce(
    (out, sentence) => {
      const lastSentence = out[out.length - 1];

      // Single words, could be "enumeration lists"
      // @ts-expect-error: TODO
      if (lastSentence.length === 1 && enumListRegExp.test(lastSentence[0])) {
        // Check if there is a next sentence
        // It should not be another list item
        // @ts-expect-error: TODO
        if (!enumListAnotherRegExp.test(sentence[0])) {
          out.pop();
          // @ts-expect-error: TODO
          out.push(lastSentence.concat(sentence));
          return out;
        }
      }

      out.push(sentence);

      return out;
    },
    [sentences[0]],
  );

  // Join tokens back together
  return result.map((sentence, sentenceIndex) => {
    // @ts-expect-error: TODO
    const tokenCount = sentence.length * 2 + (sentenceIndex === 0 ? 1 : 0);
    return tokens.splice(0, tokenCount).join("");
  });
}
