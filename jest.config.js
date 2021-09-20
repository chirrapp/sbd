module.exports = {
  testRegex: ["test/*", "tests.ts"],
  transform: {
    "\\.ts$": "esbuild-runner/jest",
  },
};
