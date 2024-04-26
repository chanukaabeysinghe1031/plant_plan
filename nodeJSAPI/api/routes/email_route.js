const express = require("express");
const router = express.Router();
const {
  saveEmail,
  sendNotification,
} = require("../controllers/emailController");

router.post("/saveEmail", saveEmail);
router.post("/sendNotification", sendNotification);

module.exports = router;
