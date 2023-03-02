import { expect, test, describe, beforeAll } from "bun:test";
const wordnet = require("en-wordnet").default;
import Dictionary from "../dictionary";

const dictionary = new Dictionary(wordnet.get("3.0")!);

describe("Test the dictionary", () => {
  beforeAll(async () => {
    await dictionary.init();
  }, 20000);

  test("Test searchWord", 