const express = require("express");
const app = express();
const port = 3000;

app.get("/v1/anagrams", (req, res) => {
  res.json("v1 anagrams!");
});

app.get("/v2/anagrams", (req, res) => {
  res.json("v2 anagrams!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
