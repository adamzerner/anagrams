const express = require("express");
const _ = require("lodash");
const app = express();
const port = 3000;
const getWords = (qs) => {
  if (!qs.words) {
    return [];
  }

  return qs.words.split(",");
};
const getMap = (word) => {
  // mapping of letters to count of the letter in the word
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
const getAnagrams = (words) => {
  /*

  Notes on time and space complexities:
  - Using two loops takes O(n^2) time and I don't see how to avoid using two loops.
  - The comparison in the inner loop is done in constant time since there is a fixed number of letters in the alphabet, and thus doesn't add to the time complexity.
  - O(n) space is used.

  */

  const maps = words.map(getMap);
  const usedIndices = {};
  const anagrams = [];
  let currMatchingWords;

  for (let i = 0; i < words.length; i++) {
    if (usedIndices[i]) {
      continue;
    }

    currMatchingWords = [words[i]];

    for (let j = i + 1; j < words.length; j++) {
      if (usedIndices[j]) {
        continue;
      }

      if (_.isEqual(maps[i], maps[j])) {
        currMatchingWords.push(words[j]);
        usedIndices[j] = true;
      }
    }

    anagrams.push(currMatchingWords);
  }

  return anagrams;
};

app.get("/v1/anagrams", (req, res) => {
  const words = getWords(req.query).map((w) => w.toLowerCase());
  const anagrams = getAnagrams(words);

  res.json({
    anagrams,
  });
});

app.get("/v2/anagrams", (req, res) => {
  const words = getWords(req.query);
  const anagrams = getAnagrams(words);

  res.json({
    anagrams,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
