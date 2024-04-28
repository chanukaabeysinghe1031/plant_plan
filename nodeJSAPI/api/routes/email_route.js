const express = require("express");
const router = express.Router();
const { saveEmail, getEmail } = require("../controllers/emailController");

router.post("/saveEmail", saveEmail);
router.post("/getEmail", getEmail);
module.exports = router;
