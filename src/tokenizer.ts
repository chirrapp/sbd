import { englishAbbreviations } from "./abbreviations";
import * as match from "./match";

const newline_placeholder = " @~@ ";
const newline_placeholder_t = newline_placeholder.trim();

const whiteSpaceCheck = new RegExp("\\S", "");
const addNewLineBoundaries = new RegExp("\\n+|[-#=_+*]{4,}", "g");
const splitIntoWords = new RegExp("\\S+|\\n", "g");

export interface SentencesOptions {
  newline_boundaries?: boolean;
  preserve_whitespace?: boolean;
  abbreviations?: string[];
}

// Split the entry into sentences.
export function sentences(
  text: string,
  user_options?: SentencesOptions
): string[] {
  if (!text || typeof text !== "string" || !text.length) {
    return [];
  }

  if (!whiteSpaceCheck.test(text)) {
    // whitespace-only string has no sentences
    return [];
  }

  const options = {
    newline_boundaries: false,
    preserve_whitespace: false,
    abbreviations: null,
  };

  if (typeof user_options === "boolean") {
    // Deprecated quick option
    options.newline_boundaries = true;
  } else {
    // Extend options
    Object.assign(options, user_options);
  }

  if (options.newline_boundaries) {
    text = text.replace(addNewLineBoundaries, newline_placeholder);
  }

  // Split the text into words
  let words: string[] | null;
  let tokens: string[];

  // Split the text into words
  if (options.preserve_whitespace) {
    // <br> tags are the odd man out, as whitespace is allowed inside the tag
    tokens = text.split(/(<br\s*\/?>|\S+|\n+)/);

    // every other token is a word
    words = tokens.filter(function (token, ii) {
      return ii % 2;
    });
  } else {
    // - see http://blog.tompawlak.org/split-string-into-tokens-javascript
    words = text.trim().match(splitIntoWords);
  }

  let wordCount = 0;
  let index = 0;
  let temp: false | string[] = [];
  let sentences = [];
  let current = [];

  // If given text is only whitespace (or nothing of \S+)
  if (!words || !words.length) {
    return [];
  }

  for (let i = 0, L = words.length; i < L; i++) {
    wordCount++;

    // Add the word to current sentence
    current.push(words[i]);

    // Sub-sentences, reset counter
    if (~words[i].indexOf(",")) {
      wordCount = 0;
    }

    if (
      match.isBoundaryChar(words[i]) ||
      endsWithChar(words[i], "?!") ||
      words[i] === newline_placeholder_t
    ) {
      if (options.newline_boundaries && words[i] === newline_placeholder_t) {
        current.pop();
      }

      sentences.push(current);

      wordCount = 0;
      current = [];

      continue;
    }

    if (endsWithChar(words[i], '"') || endsWithChar(words[i], "”")) {
      words[i] = words[i].slice(0, -1);
    }

    // A dot might indicate the end sentences
    // Exception: The next sentence starts with a word (non abbreviation)
    //            that has a capital letter.
    if (endsWithChar(words[i], ".")) {
      // Check if there is a next word
      // This probably needs to be improved with machine learning
      if (i + 1 < L) {
        // Single character abbr.
        if (words[i].length === 2 && isNaN(+words[i].charAt(0))) {
          continue;
        }

        // Common abbr. that often do not end sentences
        if (
          match.isCommonAbbreviation(
            options.abbreviations || englishAbbreviations,
            words[i]
          )
        ) {
          continue;
        }

        // Next word starts with capital word, but current sentence is
        // quite short
        if (match.isSentenceStarter(words[i + 1])) {
          if (match.isTimeAbbreviation(words[i], words[i + 1])) {
            continue;
          }

          // Dealing with names at the start of sentences
          if (match.isNameAbbreviation(wordCount, words.slice(i, 6))) {
            continue;
          }

          if (match.isNumber(words[i + 1])) {
            if (match.isCustomAbbreviation(words[i])) {
              continue;
            }
          }
        } else {
          // Skip ellipsis
          if (words[i].endsWith("..")) {
            continue;
          }

          //// Skip abbreviations
          // Short words + dot or a dot after each letter
          if (match.isDottedAbbreviation(words[i])) {
            continue;
          }

          if (match.isNameAbbreviation(wordCount, words.slice(i, 5))) {
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
    if ((index = words[i].indexOf(".")) > -1) {
      if (match.isNumber(words[i], index)) {
        continue;
      }

      // Custom dotted abbreviations (like K.L.M or I.C.T)
      if (match.isDottedAbbreviation(words[i])) {
        continue;
      }

      // Skip urls / emails and the like
      if (match.isURL(words[i]) || match.isPhoneNr(words[i])) {
        continue;
      }
    }

    if ((temp = match.isConcatenated(words[i]))) {
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
  sentences = sentences.filter(function (s) {
    return s.length > 0;
  });

  const result = sentences.slice(1).reduce(
    function (out, sentence) {
      const lastSentence = out[out.length - 1];

      // Single words, could be "enumeration lists"
      if (lastSentence.length === 1 && /^.{1,2}[.]$/.test(lastSentence[0])) {
        // Check if there is a next sentence
        // It should not be another list item
        if (!/[.]/.test(sentence[0])) {
          out.pop();
          out.push(lastSentence.concat(sentence));
          return out;
        }
      }

      out.push(sentence);

      return out;
    },
    [sentences[0]]
  );

  // join tokens back together
  return result.map(function (sentence, ii) {
    if (options.preserve_whitespace && !options.newline_boundaries) {
      // tokens looks like so: [leading-space token, non-space token, space
      // token, non-space token, space token... ]. In other words, the first
      // item is the leading space (or the empty string), and the rest of
      // the tokens are [non-space, space] token pairs.
      let tokenCount = sentence.length * 2;

      if (ii === 0) {
        tokenCount += 1;
      }

      return tokens.splice(0, tokenCount).join("");
    }

    return sentence.join(" ");
  });
}

function endsWithChar(word: string, char: string): boolean {
  if (char.length > 1) {
    return char.indexOf(word.slice(-1)) > -1;
  } else {
    return word.slice(-1) === char;
  }
}
