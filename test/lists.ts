import assert from "assert";
import * as tokenizer from "../lib/tokenizer";

describe("Lists", () => {
  describe("It should skip list enumeration", () => {
    const entry = "1. The item\n2. Another item";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("It should skip alternative list enumeration", () => {
    const entry = "a. The item\nab. Another item\n(1.) Third item";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 3 sentences", () => {
      assert.equal(sentences.length, 3);
    });
  });

  describe("It should keep empty list enumeration", () => {
    const entry = "a. The item\nzz.\nab.\ncd. Hello";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 4 sentences", () => {
      assert.equal(sentences.length, 4);
    });
  });
});
