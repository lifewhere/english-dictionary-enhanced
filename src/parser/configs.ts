
const pos = new Map<string, string>()
  .set("n", "noun")
  .set("v", "verb")
  .set("a", "adjective")
  .set("s", "adjective satellite")
  .set("r", "adverb");

const pointerSymbolsNoun = new Map<string, string>()
  .set("!", "Antonym")
  .set("@", "Hypernym")
  .set("@i", "Instance Hypernym")
  .set("~", "Hyponym")
  .set("~i", "Instance Hyponym")
  .set("#m", "Member holonym")
  .set("#s", "Substance holonym")
  .set("#p", "Part holonym")
  .set("%m", "Member meronym")
  .set("%s", "Substance meronym")
  .set("%p", "Part meronym")
  .set("=", "Attribute")
  .set("+", "Derivationally related form")
  .set(";c", "Domain of synset - TOPIC")
  .set("-c", "Member of this domain - TOPIC")
  .set(";r", "Domain of synset - REGION")
  .set("-r", "Member of this domain - REGION")
  .set(";u", "Domain of synset - USAGE")
  .set("-u", "Member of this domain - USAGE");

const pointerSymbolsVerb = new Map<string, string>()
  .set("!", "Antonym")
  .set("@", "Hypernym")
  .set("~", "Hyponym")
  .set("*", "Entailment")
  .set(">", "Cause")
  .set("^", "Also see")
  .set("$", "Verb Group")
  .set("+", "Derivationally related form")
  .set(";c", "Domain of synset - TOPIC")
  .set(";r", "Domain of synset - REGION")
  .set(";u", "Domain of synset - USAGE");

const pointerSymbolsAdjective = new Map<string, string>()
  .set("!", "Antonym")
  .set("&", "Similar to")
  .set("<", "Participle of verb")
  .set("\\", "Pertainym (pertains to noun)")
  .set("=", "Attribute")
  .set("^", "Also see")
  .set(";c", "Domain of synset - TOPIC")
  .set(";r", "Domain of synset - REGION")
  .set(";u", "Domain of synset - USAGE");

const pointerSymbolsAdverb = new Map<string, string>()
  .set("!", "Antonym")
  .set("\\", "Derived from adjective")
  .set(";c", "Domain of synset - TOPIC")
  .set(";r", "Domain of synset - REGION")
  .set(";u", "Domain of synset - USAGE");

const pointerSymbols = new Map<string, Map<string, string>>()
  .set("n", pointerSymbolsNoun)
  .set("v", pointerSymbolsVerb)
  .set("a", pointerSymbolsAdjective)
  .set("r", pointerSymbolsAdverb);

export default { pos, pointerSymbols };