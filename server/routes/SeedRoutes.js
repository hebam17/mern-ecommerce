const express = require("express");
const data = require("../data");
const Product = require("../models/ProductModel.js");
const User = require("../models/UserModel.js");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  // Products seed
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);

  // User seed
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

module.exports = seedRouter;
