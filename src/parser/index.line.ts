import configs from "./configs";
import Index from "./interace.index";
import Pointer from "./interface.pointer";

class IndexLine {
  line: Index;

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
      isComment: false,
    };
  }

  parse(line: string) {
    if (line.charAt(0) === " ") {
      this.line.isComment = true;
      return this.line;
    }

    const tokens = line.split(" ");
    this.line.lemma = tokens.shift()!;

    const posAbbr = tokens.shift()!;
  