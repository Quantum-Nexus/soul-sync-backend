const express = require("express");
const router = express.Router();

const { fetchallusers } = require("../controllers/Data");

router.get("/fetchallusers", fetchallusers);

module.exports = router;