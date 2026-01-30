import b from "benny";
import sbd from "sbd";
import { sentences as distSentences } from "../dist/index.js";
import { sentences } from "./index.js";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

b.suite(
  "sentences",

  b.add("smolsbd", () => sentences(text)),
  b.add("sbd", () => sbd.sentences(text)),
  b.add("dist smolsbd", () => distSentences(text)),

  b.cycle(),
  b.complete(),
  b.save({ file: "sentences", format: "chart.html" }),
);
