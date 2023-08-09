const express = require("express");
const router = express.Router();

const { signup, sendotp, login, changePassword } = require("../controllers/Auth");

// Route for user signup
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/login", login);
router.post("/changepassword", changePassword)


module.exports = router;