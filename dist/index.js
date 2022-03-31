
// src/reader/index.ts
import readline from "readline";
import fs from "fs";

// src/parser/configs.ts
var pos = new Map().set("n", "noun").set("v", "verb").set("a", "adjective").set("s", "adjective satellite").set("r", "adverb");
var pointerSymbolsNoun = new Map().set("!", "Antonym").set("@", "Hypernym").set("@i", "Instance Hypernym").set("~", "Hyponym").set("~i", "Instance Hyponym").set("#m", "Member holonym").set("#s", "Substance holonym").set("#p", "Part holonym").set("%m", "Member meronym").set("%s", "Substance meronym").set("%p", "Part meronym").set("=", "Attribute").set("+", "Derivationally related form").set(";c", "Domain of synset - TOPIC").set("-c", "Member of this domain - TOPIC").set(";r", "Domain of synset - REGION").set("-r", "Member of this domain - REGION").set(";u", "Domain of synset - USAGE").set("-u", "Member of this domain - USAGE");
var pointerSymbolsVerb = new Map().set("!", "Antonym").set("@", "Hypernym").set("~", "Hyponym").set("*", "Entailment").set(">", "Cause").set("^", "Also see").set("$", "Verb Group").set("+", "Derivationally related form").set(";c", "Domain of synset - TOPIC").set(";r", "Domain of synset - REGION").set(";u", "Domain of synset - USAGE");
var pointerSymbolsAdjective = new Map().set("!", "Antonym").set("&", "Similar to").set("<", "Participle of verb").set("\\", "Pertainym (pertains to noun)").set("=", "Attribute").set("^", "Also see").set(";c", "Domain of synset - TOPIC").set(";r", "Domain of synset - REGION").set(";u", "Domain of synset - USAGE");
var pointerSymbolsAdverb = new Map().set("!", "Antonym").set("\\", "Derived from adjective").set(";c", "Domain of synset - TOPIC").set(";r", "Domain of synset - REGION").set(";u", "Domain of synset - USAGE");
var pointerSymbols = new Map().set("n", pointerSymbolsNoun).set("v", pointerSymbolsVerb).set("a", pointerSymbolsAdjective).set("r", pointerSymbolsAdverb);
var configs_default = { pos, pointerSymbols };

// src/parser/index.line.ts
class IndexLine {
  line;
  constructor() {
    this.line = {
      lemma: "",
      pos: "",
      offsetCount: 0,
      offsets: [],
      offsetData: [],
      pointerCount: 0,
      pointers: [],
      senseCount: 0,
      tagSenseCount: 0,
      isComment: false
    };
  }
  parse(line) {
    if (line.charAt(0) === " ") {
      this.line.isComment = true;
      return this.line;
    }
    const tokens = line.split(" ");
    this.line.lemma = tokens.shift();
    const posAbbr = tokens.shift();
    this.line.pos = configs_default.pos.get(posAbbr);
    this.line.offsetCount = parseInt(tokens.shift(), 10);
    this.line.pointerCount = parseInt(tokens.shift(), 10);
    this.line.pointers = [];
    for (let index = 0;index < this.line.pointerCount; index += 1) {
      const token = tokens.shift();
      if (token !== undefined) {
        const pointerSymbol = configs_default.pointerSymbols.get(posAbbr);
        const pointerSymbolValue = pointerSymbol.get(token);
        if (pointerSymbolValue !== undefined) {
          const pointer = {
            symbol: pointerSymbolValue,
            offset: 0,
            pos: this.line.pos
          };
          this.line.pointers.push(pointer);
        }
      }
    }
    this.line.senseCount = parseInt(tokens.shift(), 10);
    this.line.tagSenseCount = parseInt(tokens.shift(), 10);
    this.line.offsets = [];
    for (let index = 0;index < this.line.offsetCount; index += 1) {
      this.line.offsets.push(parseInt(tokens.shift(), 10));
    }
    return this.line;
  }
}
var index_line_default = IndexLine;

// src/parser/data.line.ts
class DataLine {
  line;
  constructor() {
    this.line = {
      offset: 0,
      pos: "",
      wordCount: 0,
      words: [],
      pointerCnt: 0,
      pointers: [],
      glossary: [],
      isComment: false
    };
  }
  parse(line) {
    if (line.charAt(0) === " ") {
      this.line.isComment = true;
      return this.line;
    }
    const glossarySplit = line.split("|");