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
      isComment: false,
    };
  }

  parse(line: string) {
    if (line.charAt(0) === " ") {
      this.line.isComment = true;
      return this.line;
    }

    const glossarySplit = line.split("|");
    if (glossarySplit.length > 1) {
      glossarySplit[1].split(";").forEach((part) => {
        this.line.glossary.push(part.trim());
      });
    }

    const meta = glossarySplit[0].split(" ")