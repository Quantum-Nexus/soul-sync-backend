const express = require("express");
const router = express.Router();

const { fetchallusers, addconnection } = require("../controllers/Data");
const { auth } = require("../middleware/auth");

router.get("/fetchallusers", fetchallusers);
router.post("/addconnection", addconnection);

module.exports = router;