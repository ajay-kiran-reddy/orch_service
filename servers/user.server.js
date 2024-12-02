const express = require("express");
const app = express();
const data = require("../mock/users.json");

app.get("/user/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const user = data.find((d) => d.user_id === userId);
  res.json(user);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
module.exports = app;
