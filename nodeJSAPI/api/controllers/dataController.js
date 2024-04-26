const Data = require("../models/data");
const { CourierClient } = require("@trycourier/courier");

// ************************* To add data **************************
exports.addData = async (req, res) => {
  const { temperature, humidity, moisture, light } = req.body;

  if (temperature == "" || humidity === "" || moisture === "" || light === "") {
    res.json({
      Status: "Unsuccessful",
      Message: "All the data must be entered.",
    });
  } else {
    const data = new Data({
      temperature,
      humidity,
      moisture,
      light,
    });

    data
      .save()
      .then((responsePost) => {
        res.json({ success: true, message: "Sensor data saved successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          Status: "Unsuccessful",
          Message: "Happened saving the  data in " + "DB.",
          error: error.Message,
        });
      });
  }
};

// ************************* To get latest saved data **************************
exports.getLatestData = async (req, res) => {
  try {
    const latestData = await Data.findOne().sort({ _id: -1 }).limit(1);
    if (!latestData) {
      return res
        .status(404)
        .json({ status: "Unsuccessful", message: "No sensor data found" });
    }
    res.json({
      status: "Success",
      data: latestData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Unsuccessful",
      message: "Error retrieving sensor data",
      error: error.message,
    });
  }
};
