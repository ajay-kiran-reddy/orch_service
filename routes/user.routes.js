const express = require("express");
const { getUser } = require("../services/users.service");
const { getSubscription } = require("../services/subscriptions.service");
const { getPreferences } = require("../services/preferences.service");

const router = express.Router();

/**
 * @swagger
 * /user/subscription:
 *   get:
 *     summary: Retrieve user and subscription details
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User and subscription details
 */
// GET /user/subscription
router.get("/subscription", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Missing userId in query parameters" });
    }

    const [user, subscription] = await Promise.all([
      getUser(userId),
      getSubscription(userId),
    ]);

    res.status(200).json({ ...user, subscription, preference: undefined });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});

/**
 * @swagger
 * /user/details:
 *   post:
 *     summary: Retrieve user details, including preferences and subscription status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               preference:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.post("/details", async (req, res) => {
  try {
    const { userId, preference } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    const [userInfo, subscription, preferences] = await Promise.all([
      getUser(userId),
      getSubscription(userId),
      getPreferences(preference),
    ]);

    res
      .status(200)
      .json({ ...userInfo, preference: undefined, subscription, preferences });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});

module.exports = router;
