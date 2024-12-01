const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.USER_SERVICE_URL;

const getUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};

module.exports = { getUser };
