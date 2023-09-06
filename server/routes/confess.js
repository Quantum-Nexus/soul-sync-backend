const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { addConfession, allConfessions } = require("../controllers/Confession");

router.post("/addconfession", auth, addConfession);
router.get("/allconfession", allConfessions);

module.exports = router;