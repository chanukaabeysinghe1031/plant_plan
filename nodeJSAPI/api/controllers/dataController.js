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

exports.getAllData = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    let query = {};

    // If both start and end dates are provided
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      // If only start date is provided
      query.timestamp = { $gte: new Date(startDate) };
    } else if (endDate) {
      // If only end date is provided
      query.timestamp = { $lte: new Date(endDate) };
    }

    const data = await Data.find(query);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.json({ success: false, message: "Error fetching data" });
  }
};
