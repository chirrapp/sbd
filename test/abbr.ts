import assert from "assert";
import * as tokenizer from "../lib/tokenizer";

describe("Abbreviations in sentences", () => {
  describe("Skip dotted abbreviations", () => {
    const entry =
      "Lorem ipsum, dolor sed amat frequentor minimus In I.C.T we have multiple challenges! There should only be two sentences.";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Skip dotted abbreviations (B)", () => {
    const entry =
      "From amat frequentor minimus hello there at 8 a.m. there p.m. should only be two sentences.";
    const sentences = tokenizer.sentences(entry);

    it("should get 1 sentence", () => {
      assert.equal(sentences.length, 1);
    });
  });

  describe("Skip dotted abbreviations (C)", () => {
    const entry =
      "The school, called Booker T and Stevie Ray's Wrestling and Mixed Mart Arts Academy, will have an open house 2-6 p.m. Saturday.";
    const sentences = tokenizer.sentences(entry);

    it("should get 1 sentence", () => {
      assert.equal(sentences.length, 1);
    });
  });

  describe("Skip common abbreviations", () => {
    const entry =
      "Fig. 2. displays currency rates i.e. something libsum. Currencies widely available (i.e. euro, dollar, pound), or alternatively (e.g. €, $, etc.)";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Skip two worded abbreviations", () => {
    const entry =
      "Claims 1–6 and 15–26 are rejected under pre-AIA 35 USC § 103(a) as being unpatentable over Chalana et al. (US 2012/0179503) in view of Oh (US 2013/0013993).";
    const sentences = tokenizer.sentences(entry);

    it("should get 1 sentence", () => {
      assert.equal(sentences.length, 1);
    });
  });

  describe("Skip two worded abbreviations", () => {
    const entry =
      "Et al. is an abbreviation of the Latin loanphrase et alii, meaning and others. It is similar to etc. (short for et cetera, meaning and the rest), but whereas etc. applies to things, et al. applies to people.";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Use other languages (accented)", () => {
    const options = {
      newline_boundaries: true,
      preserve_whitespace: true,
      abbreviations: ["pré"],
    };

    const entry =
      "Random words pré. other words and things. Different status updates all assigned";
    const sentences = tokenizer.sentences(entry, options);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Use other languages", () => {
    const entry =
      "Trzeba tu coś napisać, np. fragment odnoszący się do pkt. 3 wcześniejszego tekstu.";
    const sentencesEN = tokenizer.sentences(entry);
    const sentencesPL = tokenizer.sentences(entry, {
      abbreviations: ["np", "pkt"],
    });

    it("should get 1 sentence", () => {
      assert.equal(sentencesEN.length, 3);
      assert.equal(sentencesPL.length, 1);
    });

    it("should not permanently override abbreviations", () => {
      const sentences = tokenizer.sentences(entry);
      assert.equal(sentences.length, 3);
    });
  });

  describe("Use other languages (Cyrillic)", () => {
    const options = {
      newline_boundaries: true,
      preserve_whitespace: true,
      abbreviations: ["табл", "рис"],
    };

    const entry =
      "матрицю SWOT- аналізу (табл. hello). Факторами макросередовища (рис. 5.8.). Things on a new line";
    const sentencesCyrillic = tokenizer.sentences(entry, options);

    it("should get 3 sentences", () => {
      assert.equal(sentencesCyrillic.length, 3);
    });
  });
});
