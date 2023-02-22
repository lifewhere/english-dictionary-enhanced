
import { expect, test, describe, beforeAll } from "bun:test";
const wordnet = require("en-wordnet").default;
import Database from "../database";
import IndexLine from "../parser/index.line";
import DataLine from "../parser/data.line";

// const db = new Database(path.join(__dirname, '..', 'mockWordnet'))
const db = new Database(wordnet.get("3.0"));

describe("Test the dictionary", () => {
  beforeAll(async () => {
    await db.init();
  }, 10000);

  test("Test addIndex", () => {
    const indexline = new IndexLine();
    const index = indexline.parse(
      "test_christmas_tree n 5 2 @ #m 5 0 12787364 12738599 11621547 11621281 03026626  "
    );
    console.time("addIndex");
    db.addIndex(index);
    console.timeEnd("addIndex");
    expect(
      db.indexLemmaIndex.get("test_christmas_tree")!.get("noun")!.lemma
    ).toBe("test_christmas_tree");
    expect(
      db.indexLemmaIndex.get("test_christmas_tree")!.get("noun")!.offsets
    ).toEqual([12787364, 12738599, 11621547, 11621281, 3026626]);
    expect(db.indexOffsetIndex.get(12787364)![0].offsets.join(",")).toContain(
      "12787364"
    );
  });

  test("Test IndexLemmaSearch", () => {
    console.time("indexLemmaSearch");
    let result = db.indexLemmaSearch(["christmas_tree"]);
    console.timeEnd("indexLemmaSearch");
    expect(result.get("christmas_tree")!.get("noun")!.lemma).toBe(
      "christmas_tree"
    );
    expect(
      result
        .get("christmas_tree")!
        .get("noun")!
        .offsets.join(",")
    ).toContain("12787364");

    console.time("indexLemmaSearch2");
    result = db.indexLemmaSearch(["christmas_tree", "preposterous"]);
    console.timeEnd("indexLemmaSearch2");
    expect(result.get("christmas_tree")!.get("noun")!.lemma).toBe(
      "christmas_tree"
    );
    expect(
      result
        .get("christmas_tree")!
        .get("noun")!
        .offsets.join(",")
    ).toContain("12787364");
    expect(result.get("preposterous")!.get("adjective")!.lemma).toBe(
      "preposterous"
    );
    expect(
      result
        .get("preposterous")!
        .get("adjective")!
        .offsets.join(",")
    ).toContain("2570643");
  });

  test("Test IndexOffsetSearch", () => {
    console.time("indexOffsetSearch");
    let result = db.indexOffsetSearch([12787364]);
    console.timeEnd("indexOffsetSearch");
    expect(
      result
        .get(12787364)!
        .map((item) => item.lemma)
        .join(",")
    ).toContain("christmas_tree");
    expect(
      result
        .get(12787364)!
        .map((item) => item.offsets)
        .join(",")
    ).toContain("12787364");

    console.time("indexOffsetSearch2");
    result = db.indexOffsetSearch([12787364, 2570643]);
    console.timeEnd("indexOffsetSearch2");
    expect(
      result
        .get(12787364)!