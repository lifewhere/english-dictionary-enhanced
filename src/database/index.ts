
import Reader from "../reader";
import Index from "../parser/interace.index";
import Data from "../parser/interface.data";

class Database {
  path: string;
  isReady: boolean;

  index: Index[];
  indexLemmaIndex: Map<string, Map<string, Index>>;
  indexOffsetIndex: Map<number, Index[]>;

  data: Data[];
  dataOffsetIndex: Map<number, Data>;
  dataLemmaIndex: Map<string, Data[]>;

  constructor(path: string) {
    this.isReady = false;
    this.index = [];
    this.indexLemmaIndex = new Map();
    this.indexOffsetIndex = new Map();
    this.data = [];
    this.dataLemmaIndex = new Map();
    this.dataOffsetIndex = new Map();
    this.path = path;
  }

  async init() {
    const reader = new Reader(this);
    await reader.init();
  }

  ready() {
    this.isReady = true;
  }

  addIndex(index: Index) {
    if (index.isComment) {
      return;
    }
    this.index.push(index);
    
    const existingIndicies = this.indexLemmaIndex.get(index.lemma);
    if (existingIndicies) {
      existingIndicies.set(index.pos, index) 
    } else {
      this.indexLemmaIndex.set(
        index.lemma,
        new Map<string, Index>([[index.pos, index]])
      );
    }

    index.offsets.forEach((offset) => {
      let output: Index[] = [];
      if (this.indexOffsetIndex.get(offset) !== undefined) {
        output = this.indexOffsetIndex.get(offset)!;
      }
      output.push(index);
      this.indexOffsetIndex.set(offset, output);
    });
  }

  static copyIndex(indexMap: Map<string, Index>) {
    return new Map(indexMap);
  }

  indexLemmaSearch(query: string[]) {
    const output = new Map<string, Map<string, Index>>();
    query.forEach((lemma) => {
      if (lemma !== "" && this.indexLemmaIndex.get(lemma) !== undefined) {
        output.set(lemma, Database.copyIndex(this.indexLemmaIndex.get(lemma)!));