import { expect, test, describe } from "bun:test";
import DataLine from "./data.line";

describe("Test parsing a data line", () => {
  test("Parse a data line", () => {
    let item = new DataLine().parse(
      "