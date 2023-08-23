const express = require("express");
const router = express.Router();

const { signup, sendotp, login, changePassword } = require("../controllers/Auth");
const { auth } = require("../middleware/auth");

// Route for user signup
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/login", login);
router.post("/changepassword", auth, changePassword)



module.exports = router;