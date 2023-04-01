import { expect, test, describe, beforeAll } from "bun:test";
const wordnet = require("en-wordnet").default;
import Dictionary from "../dictionary";

const dictionary = new Dictionary(wordnet.get("3.0")!);

describe("Test the dictionary", () => {
  beforeAll(async () => {
    await dictionary.init();
  }, 20000);

  test("Test searchWord", () => {
    console.time("search");
    let result = dictionary.searchFor(["coaxing"]);
    console.timeEnd("search");
    expect(result.get("coaxing")!.get("noun")!.lemma).toBe("coaxing");
    expect(result.get("coaxing")!.get("noun")!.pos).toBe("noun");

    expect(
      result
        .get("coaxing")!
        .get("noun")!
        .offsetData.map((item) => item.words)
        .join(",")
    ).toContain("coaxing");
    expect(
      result
        .get("coaxing")!
        .get("noun")!
        .offsetData.map((item) => item.glossary)
        .join(",")
    ).toContain("flattery designed to gain");

    console.time("search2");
    result = dictionary.searchFor(["yet", "preposterous"]);
    console.timeEnd("search2");
    expect(result.get("yet")!.get("adverb")!.lemma).toBe("yet");
    expect(result.get("yet")!.get("adverb")!.pos).toBe("adverb");

    expect(
      result
        .get("yet")!
        .get("adverb")!
        .offsetData.map((item) => item.words)
        .join(",")
    ).toContain("yet");
    expect(
      result
        .get("yet")!
        .get("adverb")!
        .offsetData.map((item) => item.glossary)
        .join("