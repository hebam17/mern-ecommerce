const express = require("express");

const userRouter = express.Router();
const { generateToken } = require("../utils");
const expressAsyncHandler = require("express-async-handler");

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: User.isAdmin,
          token: generateToken(user),
        });
      }
      return;
    }
    res.status(401).send({ messafe: "Invalid email or password!" });
  })
);

module.exports = userRouter;
