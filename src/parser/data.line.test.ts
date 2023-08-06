import { expect, test, describe } from "bun:test";
import DataLine from "./data.line";

describe("Test parsing a data line", () => {
  test("Parse a data line", () => {
    let item = new DataLine().parse(
      "  20 ABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE  "
    );
    expect(item.isComment).toBe(true);

    item = new DataLine().parse(
      '00002684 03 n 02 object 0 physical_object 0 039 @ 00001930 n 0000 + 00532607 v 0105 ~ 00003553 n 0000 ~ 00027167 n 0000 ~ 03009633 n 0000 ~ 03149951 n 0000 