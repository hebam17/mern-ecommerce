const jwt = require("jsonwebtoken");

module.exports = generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: User.isAdmin,
    },
    process.env.process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
