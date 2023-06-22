
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
