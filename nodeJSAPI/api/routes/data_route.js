const router = require("express").Router();
const {
  addData,
  getLatestData,
  getAllData,
  deleteData,
} = require("../controllers/dataController");

router.post("/addData", addData);
router.post("/getLatestData", getLatestData);
router.post("/getAllData", getAllData);
router.post("/deleteData", deleteData);

module.exports = router;
