const express = require("express");
const app = express();
const data = require("../mock/preferences.json");

app.get("/preferences/:preference", (req, res) => {
  console.log(req.params, "[preference]");
  res.json(data[req.params.preference]);
});

const PORT = 3003;
app.listen(PORT, () =>
  console.log(`Preference service running on port ${PORT}`)
);
module.exports = app;
