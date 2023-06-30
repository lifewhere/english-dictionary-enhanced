const enWordnet = require("en-wordnet").default;
import { expect, test, describe, beforeAll } from "bun:test";
import Dictionary from "./index";

const dictionary = new Dictionary(enWordnet.get("3.0"));

describe("Test the index file for EnDictionary", () => {
  beforeAll(async () => {
    await dictionary.init();
  }, 10000);

  test("Test initialization", () => {
    const result = dictionary.searchFor(["yet"]);
    expect(result.get("yet")!.get("adverb")!.lemma).toBe("yet");
    expect(result.get("yet")!.get("adverb")!.pos).toBe("adverb");
  }, 10000);
});

describe("Test that all POS are indexed", () => {
