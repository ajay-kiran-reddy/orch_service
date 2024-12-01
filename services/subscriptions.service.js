const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.SUBSCRIPTION_SERVICE_URL;

const getSubscription = async (userId) => {
  const response = await axios.get(`${BASE_URL}/subscription/user/${userId}`);
  return response.data;
};

module.exports = { getSubscription };
