const express = require("express");
const { getUser } = require("../services/users.service");
const { getSubscription } = require("../services/subscriptions.service");
const { getPreferences } = require("../services/preferences.service");

const router = express.Router();

// GET /user/subscription
router.get("/subscription", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Missing userId in query parameters" });
    }

    console.log(userId, "[userId]");

    const [user, subscription] = await Promise.all([
      getUser(userId),
      getSubscription(userId),
    ]);

    res.status(200).json({ user, subscription });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});

// POST /user/details
router.post("/details", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }
    const userInfo = await getUser(userId);
    console.log(userInfo, "[userInfo]");

    const [subscription, preferences] = await Promise.all([
      getSubscription(userId),
      getPreferences(userInfo[0].preference),
    ]);

    res.status(200).json({ user: userInfo, subscription, preferences });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});

module.exports = router;
