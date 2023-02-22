
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