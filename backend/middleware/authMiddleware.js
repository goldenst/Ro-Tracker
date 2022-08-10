const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
// const { truncate } = require("fs");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      console.log('Error: AM 23')
      res.sendStatus(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.send(401);
    throw new Error("Not Authorized");
  }
});


module.exports = { protect }