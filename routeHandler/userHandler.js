const express = require("express");

const router = express.Router();



// controller
const userController = require('../controller/userController')

// Signup Route
router.post("/signup", userController.signupRoute);


router.post("/login",userController.loginRoute )

module.exports = router;
