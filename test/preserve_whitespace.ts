import assert from "assert";
import * as tokenizer from "../src/tokenizer";

const options = { preserve_whitespace: true };

describe("Preserve whitespace", () => {
  describe("Basic", () => {
    const entry =
      " This is\ta  sentence   with  funny whitespace.  And this  is \tanother.\tHere  is   a third. ";
    const sentences = tokenizer.sentences(entry, options);

    it("should get 3 sentences", () => {
      assert.equal(sentences.length, 3);
    });

    it("funny whitespace is preserved in the sentences", () => {
      assert.equal(sentences.join(""), entry);
      assert.equal(
        sentences[0],
        " This is\ta  sentence   with  funny whitespace.  "
      );
      assert.equal(sentences[1], "And this  is \tanother.\t");
      assert.equal(sentences[2], "Here  is   a third. ");
    });
  });

  describe("No effect if newline_boundaries are specified", () => {
    const entry = " This is\ta  sentence   with  funny whitespace. ";
    const sentences = tokenizer.sentences(
      entry,
      Object.assign({ newline_boundaries: true }, options)
    );

    it("should get 1 sentences", () => {
      assert.equal(sentences.length, 1);
    });

    it("funny whitespace is not preserved when newline_boundaries is specified", () => {
      assert.equal(sentences[0], "This is a sentence with funny whitespace.");
    });
  });

  describe("It should properly join single-word list sentences", () => {
    const entry =
      "iv. determining that the advertisement in the lift study is a candidate ad for the user, computing whether to include the user in a test group or a control group for the lift study ([0032]), v. based on the computation indicating that the user is in the control group, holding out the advertisement from completing the ad selection process for the user ([0032]), and vi. based on the computation indicating that the user is in the test group, allowing the advertisement to continue through the ad selection process such that the user receives either the advertisement in the lift study or another advertisement ([0032]); and ";
    const sentences = tokenizer.sentences(entry, options);

    it("should get the correct sentences", () => {
      assert.deepEqual(sentences, [
        "iv. determining that the advertisement in the lift study is a candidate ad for the user, computing whether to include the user in a test group or a control group for the lift study ([0032]), v. based on the computation indicating that the user is in the control group, holding out the advertisement from completing the ad selection process for the user ([0032]), and vi. ",
        "based on the computation indicating that the user is in the test group, allowing the advertisement to continue through the ad selection process such that the user receives either the advertisement in the lift study or another advertisement ([0032]); and ",
      ]);
    });
  });
});
