import configs from "./configs";
import Data from "./interface.data";

class DataLine {
  line: Data;

  constructor() {
    this.line = {
      offset: 0,
      pos: "",
      wordCount: 0,
      words: [],
      pointerCnt: 0,
      pointers: [],
      glossary: [],
      i