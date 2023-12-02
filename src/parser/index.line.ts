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
