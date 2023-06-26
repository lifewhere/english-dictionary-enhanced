
import Database from "../database";
import Index from "../parser/interace.index";
import SearchSimple from "./interface.searchSimple";

class Dictionary {
  path: string;
  database: Database;

  constructor(path: string) {
    this.path = path;
    this.database = new Database(this.path);
  }

  async init() {
    await this.database.init();
  }

  searchFor(term: string[]) {
    let output = new Map<string, Map<string, Index>>();

    output = this.database.indexLemmaSearch(term);
    output.forEach((lemmaMap, lemma) => {
      lemmaMap.forEach((index) => {
        const lemmaData = this.searchOffsetsInDataFor(index.offsets);
        index.offsetData = [];
        lemmaData.forEach((data) => {
          index.offsetData.push(data);
        });
        if (output.get(lemma)) {
          output.get(lemma)!.set(index.pos, index);
        }
      });
    });
    return output;
  }

  searchOffsetsInDataFor(offsets: number[]) {
    return this.database.dataOffsetSearch(offsets);
  }

  searchSimpleFor(words: string[]) {
    const output = new Map<string, Map<string, SearchSimple>>();
    const result = this.searchFor(words);

    result.forEach((lemmaMap: Map<string, Index>, lemma: string) => {
      lemmaMap.forEach((index) => {
        if (index.offsetData.length > 0) {
          let meaning = "";
          const firstWords = index.offsetData[0].words.join(", ");
          if (index.offsetData[0].glossary.length > 0) {
            meaning = index.offsetData[0].glossary[0];
          }

          if (output.get(lemma)) {
            output.get(lemma)!.set(index.pos, {
              words: firstWords,
              meaning: meaning,
              lemma: lemma,
            });
          } else {
            output.set(
              lemma,
              new Map<string, SearchSimple>([
                [
                  index.pos,
                  {
                    words: firstWords,
                    meaning: meaning,
                    lemma: lemma,
                  },
                ],
              ])
            );
          }
        }
      });
    });

    return output;
  }

  wordsStartingWith(prefix: string) {
    let output: string[] = [];
    if (prefix !== "") {
      output = this.database.index
        .filter((item) => item.lemma.startsWith(prefix))
        .map((item) => item.lemma);
    }
    return output;
  }

  wordsEndingWith(suffix: string) {
    let output: string[] = [];
    if (suffix !== "") {
      output = this.database.index
        .filter((item) => item.lemma.endsWith(suffix))
        .map((item) => item.lemma);
    }
    return output;
  }

  wordsIncluding(word: string) {
    let output: string[] = [];
    if (word !== "") {
      output = this.database.index
        .filter((item) => item.lemma.includes(word))
        .map((item) => item.lemma);
    }
    return output;
  }

  wordsUsingAllCharactersFrom(query: string, ignorePhrases = true) {
    let output: string[] = [];
    if (query === "") {
      return output;
    }
