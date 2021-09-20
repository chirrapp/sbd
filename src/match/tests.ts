import { isCapitalized } from ".";

describe("match", () => {
  describe("isCapitalized", () => {
    it("checks if the string is capitalized", () => {
      expect(isCapitalized("Hello")).toBe(true);
      expect(isCapitalized("hello")).toBe(false);
      // TODO: Make it work using (toUpperCase)
      // expect(isCapitalized("Привет")).toBe(true);
      // expect(isCapitalized("привет")).toBe(false);
    });
  });
});
