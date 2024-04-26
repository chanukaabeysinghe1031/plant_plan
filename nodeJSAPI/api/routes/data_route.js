const router = require("express").Router();
const { addData, getLatestData } = require("../controllers/dataController");

router.post("/addData", addData);
router.post("/getLatestData", getLatestData);

module.exports = router;
