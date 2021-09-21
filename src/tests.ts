import assert from "assert";
import { sentences } from ".";

describe("sentences", () => {
  describe("with single sentence", () => {
    it("returns the sentence", () => {
      expect(sentences("First sentence.")).toEqual(["First sentence."]);
    });

    it("skips ellipsis", () => {
      expect(sentences("First sentence... another sentence")).toEqual([
        "First sentence... another sentence",
      ]);
    });

    it("correctly splits difficult sentences", () => {
      expect(
        sentences(
          "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S."
        )
      ).toEqual([
        "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S.",
      ]);

      expect(
        sentences(
          "It happened around 5:30 p.m. in the 500 block of W. 82nd St. Investigators say Terrence Taylor, 22, and Deontrell Sloan, 17, got into an argument over money during the game."
        )
      ).toEqual([
        "It happened around 5:30 p.m. in the 500 block of W. 82nd St. Investigators say Terrence Taylor, 22, and Deontrell Sloan, 17, got into an argument over money during the game.",
      ]);

      expect(
        sentences(
          "GARY Mayor Scott L. King has declared a 'cash crisis' and has asked city department heads to put off all non-essential spending until June."
        )
      ).toEqual([
        "GARY Mayor Scott L. King has declared a 'cash crisis' and has asked city department heads to put off all non-essential spending until June.",
      ]);

      expect(
        sentences(
          "HOWELL, Mich. - Blissfield was only nine outs away from ending the longest winning streak"
        )
      ).toEqual([
        "HOWELL, Mich. - Blissfield was only nine outs away from ending the longest winning streak",
      ]);

      expect(
        sentences(
          "33 FORT LAUDERDALE U.S. President George W Bush touted free trade as a means of strengthening democracy"
        )
      ).toEqual([
        "33 FORT LAUDERDALE U.S. President George W Bush touted free trade as a means of strengthening democracy",
      ]);

      expect(
        sentences(
          "Mike Tyler rides his bike on Del. 1 near Lewes early last month"
        )
      ).toEqual([
        "Mike Tyler rides his bike on Del. 1 near Lewes early last month",
      ]);
    });

    // Questionable behavior, but can only be fixed using ML?
    it("skips dot in middle of word", () => {
      expect(sentences("Hello.this is my first sentence.")).toEqual([
        "Hello.this is my first sentence.",
      ]);
    });

    it("skips punctuation inside brackets", () => {
      expect(
        sentences(
          "Lorem ipsum, dolor sed amat frequentor minimus with a sentence [example?] that should not (Though sometimes...)) be two or more (but one!) sentences."
        )
      ).toEqual([
        "Lorem ipsum, dolor sed amat frequentor minimus with a sentence [example?] that should not (Though sometimes...)) be two or more (but one!) sentences.",
      ]);
    });
  });

  describe("with multiple sentences", () => {
    it("includes ellipsis as ending if starts with capital", () => {
      expect(sentences("First sentence... Another sentence")).toEqual([
        "First sentence... ",
        "Another sentence",
      ]);
    });

    it("split sentences by boundary", () => {
      expect(
        sentences(
          "Lorem ipsum, dolor sed amat frequentor minimus. Second sentence."
        )
      ).toEqual([
        "Lorem ipsum, dolor sed amat frequentor minimus. ",
        "Second sentence.",
      ]);
    });

    it("correctly splits difficult sentences", () => {
      expect(
        sentences(
          "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S. Millions attended the Inauguration."
        )
      ).toEqual([
        "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S. ",
        "Millions attended the Inauguration.",
      ]);

      expect(
        sentences(
          "Sen. Barack Obama became the 44th President of the US. Millions attended."
        )
      ).toEqual([
        "Sen. Barack Obama became the 44th President of the US. ",
        "Millions attended.",
      ]);

      expect(
        sentences(
          "Barack Obama, previously Sen. of lorem ipsum, became the 44th President of the U.S. Millions attended."
        )
      ).toEqual([
        "Barack Obama, previously Sen. of lorem ipsum, became the 44th President of the U.S. ",
        "Millions attended.",
      ]);

      expect(
        sentences(
          "Baril, a Richmond lawyer once nominated for a federal prosecutors job, endorsed a faith-based drug initiative in local jails patterned after the Henrico County jails therapeutic program called Project R.I.S.E. Just as important, he had a great foil across the net."
        )
      ).toEqual([
        "Baril, a Richmond lawyer once nominated for a federal prosecutors job, endorsed a faith-based drug initiative in local jails patterned after the Henrico County jails therapeutic program called Project R.I.S.E. ",
        "Just as important, he had a great foil across the net.",
      ]);

      expect(
        sentences(
          "Newsletter AIDs CARE, EDUCATION AND TRAINING Issue No. 7. Acet Home Care, which moves into the building in July, will share the offices with two other AIDS charities, P.A.L.S. (Portsmouth AIDS Link Support) and the Link Project."
        )
      ).toEqual([
        "Newsletter AIDs CARE, EDUCATION AND TRAINING Issue No. 7. ",
        "Acet Home Care, which moves into the building in July, will share the offices with two other AIDS charities, P.A.L.S. (Portsmouth AIDS Link Support) and the Link Project.",
      ]);

      expect(
        sentences(
          "Another is expanded hours of operation -- from fewer than five hours a day to 9:30 a.m. to 4 p.m. Monday through Saturday. Sunday remains closed."
        )
      ).toEqual([
        "Another is expanded hours of operation -- from fewer than five hours a day to 9:30 a.m. to 4 p.m. Monday through Saturday. ",
        "Sunday remains closed.",
      ]);

      expect(
        sentences(
          "Gold Wing Road Rider's Association - Coffee break, Guzzardo's Italian Villa, eat, 6 p.m.; ride, 7 p.m. Then at 9 p.m. go home."
        )
      ).toEqual([
        "Gold Wing Road Rider's Association - Coffee break, Guzzardo's Italian Villa, eat, 6 p.m.; ride, 7 p.m. ",
        "Then at 9 p.m. go home.",
      ]);
    });

    // TODO: Fix the bug or give up?
    xit("doesn't skip dot in middle of word if followed by capital letter", () => {
      expect(sentences("Hello Barney.The bird in the word.")).toEqual([
        "Hello Barney.",
        "The bird in the word.",
      ]);
    });

    it("splits by question and exclamation marks", () => {
      expect(
        sentences(
          "Hello this is my first sentence? There is also a second! A third"
        )
      ).toEqual([
        "Hello this is my first sentence? ",
        "There is also a second! ",
        "A third",
      ]);
    });

    it("skips keywords/code with a dot in it", () => {
      expect(sentences("HELLO A.TOP IS NICE")).toEqual(["HELLO A.TOP IS NICE"]);
    });

    it("splits sentences with quotations", () => {
      expect(
        sentences(
          "“If there’s no balance and your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School."
        )
      ).toEqual([
        "“If there’s no balance and your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” ",
        "What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School.",
      ]);

      expect(
        sentences(
          "“If there’s no balance! And your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School."
        )
      ).toEqual([
        "“If there’s no balance! ",
        "And your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” ",
        "What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School.",
      ]);
    });

    it("splits sentences with a name ending a sentence", () => {
      expect(
        sentences(
          'If your boss assumes he can interrupt you any time and it’s "impacting the way you do your job," you should communicate that "you feel stretched," says Hill. A growing body of research shows that being “always on” hurts results.'
        )
      ).toEqual([
        'If your boss assumes he can interrupt you any time and it’s "impacting the way you do your job," you should communicate that "you feel stretched," says Hill. ',
        "A growing body of research shows that being “always on” hurts results.",
      ]);
    });
  });

  describe("with spaces", () => {
    it("preseves basic spaces", () => {
      expect(
        sentences(
          "First sentence... Another list: \n - green \n - blue \n - red"
        )
      ).toEqual([
        "First sentence... ",
        "Another list: \n - green \n - blue \n - red",
      ]);
    });

    it("preserves newlines", () => {
      expect(
        sentences(
          "First sentence... Another sentence.\nThis is a new paragraph."
        )
      ).toEqual([
        "First sentence... ",
        "Another sentence.",
        "\nThis is a new paragraph.",
      ]);
    });

    it("preserves spaces in multiline strings", () => {
      expect(
        sentences(
          "How now brown cow.\
        \
        Peter Piper Picked a peck of pickled peppers. A peck of pickled peppers peter piper picked."
        )
      ).toEqual([
        "How now brown cow.                ",
        "Peter Piper Picked a peck of pickled peppers. ",
        "A peck of pickled peppers peter piper picked.",
      ]);
    });

    it("preserves irregular spaces", () => {
      const entry =
        " This is\ta  sentence   with  funny whitespace.  And this  is \tanother.\tHere  is   a third. ";
      const result = sentences(entry);
      assert.equal(result.join(""), entry);
      expect(result).toEqual([
        " This is\ta  sentence   with  funny whitespace.  ",
        "And this  is \tanother.\t",
        "Here  is   a third. ",
      ]);
    });

    it("preserves single-word list sentences", () => {
      expect(
        sentences(
          "iv. determining that the advertisement in the lift study is a candidate ad for the user, computing whether to include the user in a test group or a control group for the lift study ([0032]), v. based on the computation indicating that the user is in the control group, holding out the advertisement from completing the ad selection process for the user ([0032]), and vi. based on the computation indicating that the user is in the test group, allowing the advertisement to continue through the ad selection process such that the user receives either the advertisement in the lift study or another advertisement ([0032]); and "
        )
      ).toEqual([
        "iv. determining that the advertisement in the lift study is a candidate ad for the user, computing whether to include the user in a test group or a control group for the lift study ([0032]), v. based on the computation indicating that the user is in the control group, holding out the advertisement from completing the ad selection process for the user ([0032]), and vi. ",
        "based on the computation indicating that the user is in the test group, allowing the advertisement to continue through the ad selection process such that the user receives either the advertisement in the lift study or another advertisement ([0032]); and ",
      ]);
    });
  });

  describe("with abbreviations in sentences", () => {
    it("skips dotted abbreviations", () => {
      expect(
        sentences(
          "Lorem ipsum, dolor sed amat frequentor minimus In I.C.T we have multiple challenges! There should only be two sentences."
        )
      ).toEqual([
        "Lorem ipsum, dolor sed amat frequentor minimus In I.C.T we have multiple challenges! ",
        "There should only be two sentences.",
      ]);

      expect(
        sentences(
          "From amat frequentor minimus hello there at 8 a.m. there p.m. should only be two sentences."
        )
      ).toEqual([
        "From amat frequentor minimus hello there at 8 a.m. there p.m. should only be two sentences.",
      ]);

      expect(
        sentences(
          "The school, called Booker T and Stevie Ray's Wrestling and Mixed Mart Arts Academy, will have an open house 2-6 p.m. Saturday."
        )
      ).toEqual([
        "The school, called Booker T and Stevie Ray's Wrestling and Mixed Mart Arts Academy, will have an open house 2-6 p.m. Saturday.",
      ]);
    });

    it("skips common abbreviations", () => {
      expect(
        sentences(
          "Fig. 2. displays currency rates i.e. something libsum. Currencies widely available (i.e. euro, dollar, pound), or alternatively (e.g. €, $, etc.)"
        )
      ).toEqual([
        "Fig. 2. displays currency rates i.e. something libsum. ",
        "Currencies widely available (i.e. euro, dollar, pound), or alternatively (e.g. €, $, etc.)",
      ]);
    });

    it("skips two worded abbreviations", () => {
      expect(
        sentences(
          "Claims 1–6 and 15–26 are rejected under pre-AIA 35 USC § 103(a) as being unpatentable over Chalana et al. (US 2012/0179503) in view of Oh (US 2013/0013993)."
        )
      ).toEqual([
        "Claims 1–6 and 15–26 are rejected under pre-AIA 35 USC § 103(a) as being unpatentable over Chalana et al. (US 2012/0179503) in view of Oh (US 2013/0013993).",
      ]);
    });

    it("skips two worded abbreviations", () => {
      expect(
        sentences(
          "Et al. is an abbreviation of the Latin loanphrase et alii, meaning and others. It is similar to etc. (short for et cetera, meaning and the rest), but whereas etc. applies to things, et al. applies to people."
        )
      ).toEqual([
        "Et al. is an abbreviation of the Latin loanphrase et alii, meaning and others. ",
        "It is similar to etc. (short for et cetera, meaning and the rest), but whereas etc. applies to things, et al. applies to people.",
      ]);
    });

    it("allows to pass the abbreviations list", () => {
      expect(
        sentences(
          "Random words pré. other words and things. Different status updates all assigned",
          ["pré"]
        )
      ).toEqual([
        "Random words pré. other words and things. ",
        "Different status updates all assigned",
      ]);
    });

    it("supports non-English languages", () => {
      expect(
        sentences(
          "Trzeba tu coś napisać, np. fragment odnoszący się do pkt. 3 wcześniejszego tekstu.",
          ["np", "pkt"]
        )
      ).toEqual([
        "Trzeba tu coś napisać, np. fragment odnoszący się do pkt. 3 wcześniejszego tekstu.",
      ]);
    });

    it("supports non-latin languages", () => {
      expect(
        sentences(
          "матрицю SWOT- аналізу (табл. hello). Факторами макросередовища (рис. 5.8.). Things on a new line",
          ["табл", "рис"]
        )
      ).toEqual([
        "матрицю SWOT- аналізу (табл. hello). ",
        "Факторами макросередовища (рис. 5.8.). ",
        "Things on a new line",
      ]);
    });
  });

  describe("with irregular string", () => {
    it("returns empty array for empty string", () => {
      expect(sentences("")).toEqual([]);
    });

    it("returns empty array for space-only string", () => {
      expect(sentences("            \n\n                 ")).toEqual([]);
    });

    it("does't split symbols-only sentences", () => {
      expect(sentences("^&%(*&")).toEqual(["^&%(*&"]);
    });
  });

  describe("with symbols", () => {
    it("skips numbers", () => {
      expect(
        sentences("10 times 10 = 10.00^2. 13.000 14.50 and 14,000,000.50")
      ).toEqual(["10 times 10 = 10.00^2. ", "13.000 14.50 and 14,000,000.50"]);
    });

    it("skips URLs and emails", () => {
      expect(
        sentences(
          "Search on http://google.com. Then send me an email: fabien@somedomain.com or fabien@anotherdomain.cc"
        )
      ).toEqual([
        "Search on http://google.com. ",
        "Then send me an email: fabien@somedomain.com or fabien@anotherdomain.cc",
      ]);
    });

    it("skips phone numbers", () => {
      expect(sentences("Call +44.3847838 for whatever.")).toEqual([
        "Call +44.3847838 for whatever.",
      ]);
    });

    it("skips money with currency indication", () => {
      expect(
        sentences(
          "I paid €12.50 for that CD. Twelve dollars and fifty cent ($12.50). Ten pounds - £10.00 it is fine."
        )
      ).toEqual([
        "I paid €12.50 for that CD. ",
        "Twelve dollars and fifty cent ($12.50). ",
        "Ten pounds - £10.00 it is fine.",
      ]);
    });

    it("doesn't split by newlines/paragraph", () => {
      expect(
        sentences(
          "The humble bundle sale\r\nDate: Monday-Fri starting 2015-01-01"
        )
      ).toEqual([
        "The humble bundle sale\r\nDate: Monday-Fri starting 2015-01-01",
      ]);
    });
  });
});
