![](assets/wordnet-readme-logo.png)

English-Dictionary-Enhanced is a node.js module that makes word meanings, relations, and more available in a package.

## About

This package uses the [en-wordnet](https://github.com/lifewhere/english-dictionary-enhanced) package to make words, their meanings, and relationships available in your node.js project. It also provides helper functions for diversified means of accessing the bibliographical data.

![](https://img.shields.io/github/license/lifewhere/english-dictionary-enhanced.svg)

## Quick Start

You can install the package via `bun` or `npm` or `yarn`, along with one of the wordnet databases:

```
bun init
bun add -d @types/bun
bun install english-dictionary-enhanced
vi index.ts
```

After adding it, you can initialize the dictionary, like this:

```js
const wordnet = require("en-wordnet").default;
import Dictionary from "english-dictionary-enhanced";

const start = async () => {
    const dictionary = new Dictionary(wordnet.get("3.0"));
    await dictionary.init();

    let result = dictionary.searchFor(["yet"]);
    console.log(result);