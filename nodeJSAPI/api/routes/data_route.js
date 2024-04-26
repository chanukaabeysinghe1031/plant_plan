const router = require("express").Router();
const {
  addData,
  getLatestData,
  getAllData,
} = require("../controllers/dataController");

router.post("/addData", addData);
router.post("/getLatestData", getLatestData);
router.post("/getAllData", getAllData);

module.exports = router;
