const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth")

const { updateProfile, myprofile } = require("../controllers/Profile");

// router.put("/updateProfile", updateProfile)
router.put("/updateProfile", auth, updateProfile)
router.get("/myProfile",auth, myprofile)



module.exports = router;
