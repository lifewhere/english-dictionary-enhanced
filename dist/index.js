
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
