import assert from "assert";
import * as tokenizer from "../src/tokenizer";

describe("Sentences with symbols", () => {
  describe("It should skip numbers", () => {
    const entry = "10 times 10 = 10.00^2. 13.000 14.50 and 14,000,000.50";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("It should skip urls and emails", () => {
    const entry =
      "Search on http://google.com. Then send me an email: fabien@somedomain.com or fabien@anotherdomain.cc";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("It should skip phone numbers", () => {
    const entry = "Call +44.3847838 for whatever.";
    const sentences = tokenizer.sentences(entry);

    it("should get 1 sentence", () => {
      assert.equal(sentences.length, 1);
    });
  });

  describe("It should skip money with currency indication", () => {
    const entry =
      "I paid €12.50 for that CD. Twelve dollars and fifty cent ($12.50). Ten pounds - £10.00 it is fine.";
    const sentences = tokenizer.sentences(entry);

    it("should get 1 sentence", () => {
      assert.equal(sentences.length, 3);
    });
  });

  describe("Newlines/paragraph must be enabled to end sentences", () => {
    const entry =
      "The humble bundle sale\r\nDate: Monday-Fri starting 2015-01-01";
    const sentences = tokenizer.sentences(entry);

    it("should get 1 sentences", () => {
      assert.equal(sentences.length, 1);
    });
  });

  describe("Newlines/paragraph enabled ends sentences", () => {
    const entry =
      "The humble bundle sale\r\nDate: Monday-Fri starting 2015-01-01\nSales starting at ¤2,50";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 3 sentences", () => {
      assert.equal(sentences.length, 3);
    });
  });
});
