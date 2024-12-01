const express = require("express");
const app = express();
const data = require("../mock/subscriptions.json");

app.get("/subscription/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  res.json(data.filter((d) => d.userId === userId));
});

const PORT = 3002;
app.listen(PORT, () =>
  console.log(`Subscription service running on port ${PORT}`)
);
