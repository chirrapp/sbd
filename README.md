# Sentence boundary detection

The library is a fork of [@Tessmore's](https://github.com/Tessmore) [sbd](https://github.com/Tessmore/sbd). Unlike the original version, the fork's focused on a single use case and removes extra options.

Split text into sentences with a `vanilla` rule based approach (i.e working ~95% of the time).

- Split a text based on period, question- and exclamation marks.
- Skips (most) abbreviations (Mr., Mrs., PhD.)
- Skips numbers/currency
- Skips urls, websites, email addresses, phone nr.
- Counts ellipsis and ?! as single punctuation

## Installation

The library is available as an npm package published at the GitHub Registry. To install @chirrapp/sbd run:

```sh
npm install @chirrapp/sbd --save
# Or using Yarn:
yarn add @chirrapp/sbd
```

## Using

```ts
import { sentences } from "@chirrapp/sbd";

sentences(
  "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S. Millions attended the Inauguration."
);
//=> [
//=>   "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S.",
//=>   "Millions attended the Inauguration.",
//=> ]
```

## License

[MIT © Fabiën Tesselaar](./LECENSE)
