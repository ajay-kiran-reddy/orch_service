const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.PREFERENCE_SERVICE_URL;

const getPreferences = async (preference) => {
  const response = await axios.get(`${BASE_URL}/preferences/${preference}`);
  return response.data;
};

module.exports = { getPreferences };
