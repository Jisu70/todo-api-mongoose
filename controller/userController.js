const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/schemas/userSchema");
const { route } = require("../routeHandler/todoHandler");
const User = new mongoose.model("User", userSchema);


/**
 * 
 * handling a signup request and creating a new user in a database
 * @param {*} req 
 * @param {*} res 
 */
const signupRoute = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup  was Successfully!",
    });
  } catch {
    res.status(500).json({
      error: "Signup  was failed !",
    });
  }
};

const loginRoute = async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // Generate Token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
          message: "Signup  was Successfully!",
        });
      } else {
        res.status(401).json({
          "error": "Authetication failed!"
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication was failed!",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authentication was failed!",
    });
  }
};

// Get all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find().populate("todos");
    res.status(200).json({ message: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There was a server side error" });
  }
};






module.exports = {
  signupRoute,
  loginRoute,
  getAllUser
};
