# Smol Sentence Boundary Detection (SBD)

Tiny sentence boundary detection library for JavaScript/TypeScript.

It uses [the vanilla strategy](https://en.wikipedia.org/wiki/Sentence_boundary_disambiguation#Strategies) covering ~95% of cases.

This is modernized and trimmed fork of [Fabiën Tesselaar's](https://github.com/Tessmore) [sbd](https://github.com/Tessmore/sbd). Unlike the original version, it is focused on the single task and removes extra options.

## Installation

The package is available on npm:

```sh
npm install smolsdb
```

## Usage

Import the `sentences` function and pass a string to it. It will return an array of sentences.

```ts
import { sentences } from "smolsdb";

sentences(
  "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S. Millions attended the Inauguration.",
);
//=> [
//=>   "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S.",
//=>   "Millions attended the Inauguration.",
//=> ]
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Fabiën Tesselaar](./LICENSE)
