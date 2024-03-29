const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.secret, { expiresIn: "1h" });
};

//login  user creation
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: "error for the login" });
  }
};

//signup User creation
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
