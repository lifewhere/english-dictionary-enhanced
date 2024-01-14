
import readline from "readline";
import fs from "fs";
import IndexLine from "../parser/index.line";
import DataLine from "../parser/data.line";

const fileTypes = ["index", "data"];
const wordTypes = ["adj", "adv", "noun", "verb"];

class Reader {
  db: any;
  isReady: boolean;
  readRemaining: number;

  constructor(db: any) {
    this.db = db;
    this.isReady = false;
    this.readRemaining = 8;