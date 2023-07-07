const express = require("express");

const router = express.Router();



// controller
const userController = require('../controller/userController')
// Signup Route
router.post("/signup", userController.signupRoute);
//Login
router.post("/login",userController.loginRoute )
//Get all user
router.get("/get-alluser",userController.getAllUser )

module.exports = router;
