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

    result = dictionary.searchFor(["preposterous"]);
    console.log(result.get("preposterous").get("adjective"));
    console.log(JSON.stringify(result.get("preposterous").get("adjective"), null, '\t'));

    result = dictionary.searchSimpleFor(["preposterous"]);
    console.log(result);

    result = dictionary.wordsStartingWith("prestig");
    console.log(result)

    result = dictionary.wordsEndingWith("sterous");
    console.log(result)

    result = dictionary.wordsIncluding("grating");
    console.log(result);

    result = dictionary.wordsWithCharsIn("toaddndyrnrtssknwfsaregte");
    console.log(result)

    result = dictionary.wordsUsingAllCharactersFrom("indonesia");
    console.log(result);
};

await start()

export {}
```

Get started!
```js
bun run index.ts
```

There are some more [examples here](https://github.com/lifewhere/english-dictionary-enhanced/blob/master/src/index.test.ts).

The dictionary may take about 2000ms to load the data into memory, it doesn't use an external database/redis yet (nor is that planned, since most queries are fast enough, and the underlying data doesn't change probably more than once a year).

As of version 1.2.0, most lookups are very fast:

```txt
bun test v1.1.3 (2615dc74)

src/index.