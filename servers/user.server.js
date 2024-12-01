const express = require("express");
const app = express();
const data = require("../mock/users.json");

app.get("/user/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  res.json(data.filter((d) => d.user_id === userId));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
