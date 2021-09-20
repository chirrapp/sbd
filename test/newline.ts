import assert from "assert";
import * as tokenizer from "../lib/tokenizer";

describe("Save newlines", () => {
  describe("Basic", () => {
    const entry =
      "First sentence... Another list: \n - green \n - blue \n - red";
    const sentences = tokenizer.sentences(entry);

    it("second sentence should have newlines", () => {
      assert.equal(sentences[1], "Another list: \n - green \n - blue \n - red");
    });
  });

  describe("Sentence without lists", () => {
    const entry =
      "First sentence... Another sentence.\nThis is a new paragraph.";
    const sentences = tokenizer.sentences(entry);

    it("second sentence should have newlines", () => {
      assert.equal(sentences.length, 3);
    });
  });

  describe("With option to use newlines as sentence boundaries", () => {
    const entry =
      "First sentence... Another list: \n - green \n - blue \n - red";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("second sentence should have newlines", () => {
      assert.equal(sentences.length, 5);
    });
  });

  describe("Multiline strings", () => {
    const entry =
      "How now brown cow.\
        \
        Peter Piper Picked a peck of pickled peppers. A peck of pickled peppers peter piper picked.";

    const sentences = tokenizer.sentences(entry);

    it("Should have 3 sentences ending in periods", () => {
      assert.equal(sentences[0], "How now brown cow.");
      assert.equal(
        sentences[1],
        "Peter Piper Picked a peck of pickled peppers."
      );
    });
  });

  describe("Template multiline strings", () => {
    const entry = `How now brown cow.

        Peter Piper Picked a peck of pickled peppers. A peck of pickled peppers peter piper picked.`;

    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("Should have 3 sentences ending in periods", () => {
      assert.equal(sentences[0], "How now brown cow.");
      assert.equal(
        sentences[1],
        "Peter Piper Picked a peck of pickled peppers."
      );
    });
  });
});
