const express = require("express");
const _ = require("lodash");
const app = express();
const port = 3000;
const getInput = (qs) => {
  if (!qs.words) {
    return [];
  }

  return qs.words.split(",");
};
const getMap = (word) => {
  const map = {};
  let char;

  for (let i = 0; i < word.length; i++) {
    char = word[i];

    if (!map[char]) {
      map[char] = 0;
    }

    map[char]++;
  }

  return map;
};

app.get("/v1/anagrams", (req, res) => {
  const input = getInput(req.query).map((w) => w.toLowerCase());
  // [ 'ate', 'bar', 'loop', 'pool', 'tea', 'pet', 'bar' ]
  const maps = input.map(getMap);
  // [ { a: 1, t: 1, e: 1 }, ... ]
  const usedIndices = {};
  const output = [];
  let currMatchingWords;

  for (let i = 0; i < input.length; i++) {
    if (usedIndices[i]) {
      continue;
    }

    currMatchingWords = [input[i]];

    for (let j = i + 1; j < input.length; j++) {
      if (usedIndices[j]) {
        continue;
      }

      if (_.isEqual(maps[i], maps[j])) {
        currMatchingWords.push(input[j]);
        usedIndices[j] = true;
      }
    }

    output.push(currMatchingWords);
  }

  res.json({
    anagrams: output,
  });
});

app.get("/v2/anagrams", (req, res) => {
  const input = getInput(req.query);
  // [ 'pot', 'Top', 'opt', 'owl', 'Low', 'owL' ]
  const maps = input.map(getMap);
  // [ { p: 1, o: 1, t: 1 }, ... ]
  const usedIndices = {};
  const output = [];
  let currMatchingWords;

  for (let i = 0; i < input.length; i++) {
    if (usedIndices[i]) {
      continue;
    }

    currMatchingWords = [input[i]];

    for (let j = i + 1; j < input.length; j++) {
      if (usedIndices[j]) {
        continue;
      }

      if (_.isEqual(maps[i], maps[j])) {
        currMatchingWords.push(input[j]);
        usedIndices[j] = true;
      }
    }

    output.push(currMatchingWords);
  }

  res.json({
    anagrams: output,
  });
});

/*

Notes on time and space complexities:
- Using two loops takes O(n^2) time and I don't see how to avoid using two loops.
- The comparison in the inner loop is done in constand time since there is a fixed number of letters in the alphabet, and thus doesn't add to the time complexity.
- O(n) space is used.

*/

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
