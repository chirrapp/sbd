import Benchmark from "benchmark";
import { sentences } from ".";
import { sentences as prevSentences } from "../lib";

import "./matcher/benchmark";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const suite = new Benchmark.Suite();

suite.add("sbd", () => {
  sentences(text);
});

if (!process.env.CI) {
  suite.add("Previous sbd", () => {
    prevSentences(text);
  });
}

suite
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  .run();
