import { describe, expect, it } from "vitest";
import { englishAbbreviations } from "./abbreviations.js";
import {
  isBoundaryChar,
  isCapitalized,
  isCommonAbbreviation,
  isConcatenated,
  isCustomAbbreviation,
  isDottedAbbreviation,
  isNameAbbreviation,
  isNumber,
  isPhoneNumber,
  isSentenceStarter,
  isTimeAbbreviation,
  isURLOrEmail,
} from "./matcher.js";

describe("matcher", () => {
  describe("isCapitalized", () => {
    it("checks if the string is capitalized", () => {
      expect(isCapitalized("Hello")).toBe(true);
      expect(isCapitalized("hello")).toBe(false);
      expect(isCapitalized("Привет")).toBe(true);
      expect(isCapitalized("привет")).toBe(false);
    });
  });

  describe("isSentenceStarter", () => {
    it("returns true if the string is capitalized", () => {
      expect(isSentenceStarter("Hello")).toBe(true);
      expect(isSentenceStarter("hello")).toBe(false);
    });

    it("returns true if the string is number", () => {
      expect(isSentenceStarter("123")).toBe(true);
      expect(isSentenceStarter("123.x")).toBe(false);
    });

    it("returns true if the string starts with quotes", () => {
      expect(isSentenceStarter("'Hello world'")).toBe(true);
      expect(isSentenceStarter('"Hello world"')).toBe(true);
      expect(isSentenceStarter("``What is that?``")).toBe(true);
    });
  });

  describe("isCommonAbbreviation", () => {
    it("returns true if the string is an abbreviation", () => {
      expect(isCommonAbbreviation(englishAbbreviations, "Mr.")).toBe(true);
      expect(isCommonAbbreviation(englishAbbreviations, "Ml.")).toBe(false);
    });
  });

  describe("isTimeAbbreviation", () => {
    it("returns true for day time abbreviantion with a day name next to it", () => {
      expect(isTimeAbbreviation("p.m.", "Monday")).toBe(true);
      expect(isTimeAbbreviation("a.m.", "Tuesday")).toBe(true);
      expect(isTimeAbbreviation("p.m.", "hello")).toBe(false);
    });
  });

  describe("isDottedAbbreviation", () => {
    it("returns true if the string is a dotted abbreviation", () => {
      expect(isDottedAbbreviation("K.L.M")).toBe(true);
      expect(isDottedAbbreviation("M.R.T")).toBe(true);
      expect(isDottedAbbreviation("M.R")).toBe(true);
      expect(isDottedAbbreviation("MR")).toBe(false);
    });
  });

  describe("isCustomAbbreviation", () => {
    it("returns true if the next word is a number and the word is short", () => {
      expect(isCustomAbbreviation("wow", "123")).toBe(true);
      expect(isCustomAbbreviation("wowwow", "123")).toBe(false);
    });

    it("returns true if the next word is a number and the word is capitalized or a number", () => {
      expect(isCustomAbbreviation("123456", "123")).toBe(true);
      expect(isCustomAbbreviation("Wowwow", "123")).toBe(true);
    });
  });

  describe("isNameAbbreviation", () => {
    it("returns true if it is a name abbreviation", () => {
      expect(isNameAbbreviation(3, ["Hello"])).toBe(true);
      expect(isNameAbbreviation(4, ["123"])).toBe(true);
      expect(isNameAbbreviation(5, ["123"])).toBe(false);
      expect(isNameAbbreviation(4, ["1234567"])).toBe(false);
    });

    it("returns true if three or more words are capitalized", () => {
      expect(isNameAbbreviation(1, ["Vladimir", "Ilyich", "Ulyanov"])).toBe(
        true,
      );
      expect(isNameAbbreviation(1, ["Vladimir", "ilyich", "Ulyanov"])).toBe(
        false,
      );
    });

    it("returns false if the words length is 0", () => {
      expect(isNameAbbreviation(123, [])).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("returns true if the string is a number", () => {
      expect(isNumber("123")).toBe(true);
      expect(isNumber("123.456")).toBe(true);
      expect(isNumber("123.x")).toBe(false);
    });
  });

  describe("isPhoneNumber", () => {
    it("returns true if the string is a phone number", () => {
      expect(isPhoneNumber("+1-234-567-8901")).toBe(true);
      expect(isPhoneNumber("88")).toBe(false);
    });
  });

  describe("isURLOrEmail", () => {
    it("returns true if the string is an URL", () => {
      expect(isURLOrEmail("https://www.google.com")).toBe(true);
      expect(isURLOrEmail("t.me/kossnocorp")).toBe(true);
      expect(isURLOrEmail("tme/kossnocorp")).toBe(false);
      expect(isURLOrEmail("koss@nocorp.me")).toBe(true);
      expect(isURLOrEmail("koss@t.me")).toBe(true);
      expect(isURLOrEmail("koss@tme")).toBe(false);
    });
  });

  describe("isConcatenated", () => {
    it("returns true if that are concatenated words", () => {
      expect(isConcatenated("well.Fine")).toEqual(["well", "Fine"]);
      expect(isConcatenated("ah.Okay")).toEqual(["ah", "Okay"]);
      expect(isConcatenated("ahOkay")).toEqual(null);
    });
  });

  describe("isBoundaryChar", () => {
    it("returns true if the word is a boundary char", () => {
      expect(isBoundaryChar(".")).toBe(true);
      expect(isBoundaryChar("!")).toBe(true);
      expect(isBoundaryChar("?")).toBe(true);
      expect(isBoundaryChar("x")).toBe(false);
      expect(isBoundaryChar("#")).toBe(false);
    });
  });
});
