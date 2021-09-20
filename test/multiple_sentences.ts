import assert from "assert";
import * as tokenizer from "../src/tokenizer";

describe("Multiple sentences", () => {
  describe("Include ellipsis as ending if starts with capital", () => {
    const entry = "First sentence... Another sentence";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Two sentences", () => {
    const entry =
      "Lorem ipsum, dolor sed amat frequentor minimus. Second sentence.";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Difficult two sentences (A)", () => {
    const entry =
      "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S. Millions attended the Inauguration.";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Difficult two sentences (B)", () => {
    const entry =
      "Sen. Barack Obama became the 44th President of the US. Millions attended.";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentence", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Difficult two sentences (C)", () => {
    const entry =
      "Barack Obama, previously Sen. of lorem ipsum, became the 44th President of the U.S. Millions attended.";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentence", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Difficult two sentences (D)", () => {
    const entry =
      "Baril, a Richmond lawyer once nominated for a federal prosecutors job, endorsed a faith-based drug initiative in local jails patterned after the Henrico County jails therapeutic program called Project R.I.S.E. Just as important, he had a great foil across the net.";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentence", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Difficult two sentences (E)", () => {
    const entry =
      "Newsletter AIDs CARE, EDUCATION AND TRAINING Issue No. 7. Acet Home Care, which moves into the building in July, will share the offices with two other AIDS charities, P.A.L.S. (Portsmouth AIDS Link Support) and the Link Project.";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentence", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Difficult two sentences (F)", () => {
    const entry =
      "Another is expanded hours of operation -- from fewer than five hours a day to 9:30 a.m. to 4 p.m. Monday through Saturday. Sunday remains closed.";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentence", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Difficult two sentences (G)", () => {
    const entry =
      "Gold Wing Road Rider's Association - Coffee break, Guzzardo's Italian Villa, eat, 6 p.m.; ride, 7 p.m. Then at 9 p.m. go home.";
    const sentences = tokenizer.sentences(entry);

    it("should get two sentence", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Dot in middle of word is not skipped if followed by capital letter", () => {
    const entry = "Hello Barney.The bird in the word.";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Question- and exlamation mark", () => {
    const entry =
      "Hello this is my first sentence? There is also a second! A third";
    const sentences = tokenizer.sentences(entry);

    it("should get 3 sentences", () => {
      assert.equal(sentences.length, 3);
    });
  });

  describe("It should skip keywords/code with a dot in it", () => {
    const entry = "HELLO A.TOP IS NICE";
    const sentences = tokenizer.sentences(entry);

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 1);
    });
  });

  describe("If newlines are boundaries", () => {
    const entry =
      "Search on http://google.com\n\nThen send me an email: gg@gggg.kk";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Sentences with quotations", () => {
    const entry =
      "“If there’s no balance and your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School.";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("Sentences with quotations", () => {
    const entry =
      "“If there’s no balance! And your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School.";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 3 sentences", () => {
      assert.equal(sentences.length, 3);
    });
  });

  describe("Sentences with a name ending a sentence", () => {
    const entry = `If your boss assumes he can interrupt you any time and it’s "impacting the way you do your job," you should communicate that "you feel stretched," says Hill. A growing body of research shows that being “always on” hurts results.`;
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });

  describe("If newlines are boundaries (B)", () => {
    const entry =
      "FAMILIY HISTORY   ========================================== Nothing interesting";
    const sentences = tokenizer.sentences(entry, { newline_boundaries: true });

    it("should get 2 sentences", () => {
      assert.equal(sentences.length, 2);
    });
  });
});
