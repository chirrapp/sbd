import assert from "assert";
import * as tokenizer from "../src/tokenizer";

describe("Empty", () => {
  describe("string", () => {
    it("should not get a sentence", () => {
      const entry = "";
      const sentences = tokenizer.sentences(entry);
      assert.equal(sentences.length, 0);
    });

    it("should not get a sentence from whitespace", () => {
      const entry = "            \n\n                 ";
      const sentences = tokenizer.sentences(entry);
      assert.equal(sentences.length, 0);
    });
  });

  describe("undefined", () => {
    const sentences = tokenizer.sentences();

    it("should not get a sentence", () => {
      assert.equal(sentences.length, 0);
    });
  });

  describe("non string", () => {
    it("should not get a sentence from array", () => {
      const entry = [];
      const sentences = tokenizer.sentences(entry);
      assert.equal(sentences.length, 0);
    });

    it("should not get a sentence from object", () => {
      const entry = {};
      const sentences = tokenizer.sentences(entry);
      assert.equal(sentences.length, 0);
    });
  });

  describe("symbols only", () => {
    const entry = "^&%(*&";
    const sentences = tokenizer.sentences(entry);

    it("should not single entry", () => {
      assert.equal(sentences.length, 1);
    });
  });
});
