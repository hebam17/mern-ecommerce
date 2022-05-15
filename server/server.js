const express = require("express");
const data = require("./data");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const seedRouter = require("./routes/SeedRoutes");
const productRouter = require("./routes/ProductRoutes");
const userRouter = require("./routes/UserRoutes");

// Initiate the environment variables
dotenv.config();

// Connect to the db
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to db!");
  })
  .catch((err) => console.log(err.message));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seeds", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
