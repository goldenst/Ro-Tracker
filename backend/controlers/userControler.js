const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { MongoNetworkError } = require("mongodb");

// @desc    POST :Register New User
// @route   /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // destructer from req.body
  const { name, email, password } = req.body;
  // validate
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all Fields");
  }

  // find if user exists
  const userExsists = await User.findOne({
    email,
  });

  if (userExsists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  // Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    POST: Login User
// @route   /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user
  const user = await User.findOne({
    email,
  });
  // validate user and password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credintals");
  }
});

// @desc    Get: Current User
// @route   /api/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})
// Generate Token
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
