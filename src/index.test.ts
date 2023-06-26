const enWordnet = require("en-wordnet").default;
import { expect, test, describe, beforeAll } from "bun:test";
import Dictionary from "./index";

const dictionary = new Dictionary(enWordnet.get("3.0"));

describe("Test the index file for 