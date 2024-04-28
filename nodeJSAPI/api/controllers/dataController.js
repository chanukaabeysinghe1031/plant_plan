const Data = require("../models/data");
const Email = require("../models/email");
const { CourierClient } = require("@trycourier/courier");

// ************************* To add data **************************

const sendNotification = async (title, body) => {
  try {
    // Retrieve the email address from the database
    const existingEmail = await Email.findOne();
    if (!existingEmail) {
      return res
        .status(404)
        .json({ status: "Unsuccessful", message: "Email address not found" });
    }

    // Extract email address
    const recipientEmail = existingEmail.email;

    // Send notification
    const courier = new CourierClient({
      authorizationToken: "pk_prod_X3NTBPJ9184VA7J9ACPJ87P1TBQ8",
    });

    const response = await courier.send({
      message: {
        to: { email: recipientEmail },
        content: {
          title: title,
          body: body,
        },
        routing: { method: "single", channels: ["email"] },
      },
    });

    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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
      .then(async (responsePost) => {
        if (temperature < 24) {
          await sendNotification(
            "Low Temperature",
            "Temperature level is low. Please take action."
          );
        }

        if (humidity < 70) {
          await sendNotification(
            "Low Humidity",
            "Humidity level is low. Please take action."
          );
        }

        if (moisture < 60) {
          await sendNotification(
            "Low Moisture",
            "Moisture level is low. Please take action."
          );
        }

        if (light < 70) {
          await sendNotification(
            "Low Light",
            "Light level is low. Please take action."
          );
        }

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
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate + "T23:59:59.999Z"), // End of the day
      };
    } else if (startDate) {
      // If only start date is provided
      query.timestamp = { $gte: new Date(startDate) };
    } else if (endDate) {
      // If only end date is provided
      query.timestamp = {
        $lte: new Date(endDate + "T23:59:59.999Z"), // End of the day
      };
    }

    const data = await Data.find(query);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.json({ success: false, message: "Error fetching data" });
  }
};

// Define the route to delete a data row by its object ID
exports.deleteData = async (req, res) => {
  try {
    // Extract the object ID from the request parameters
    const { id } = req.body;

    // Use Mongoose to find the data row by its object ID and delete it
    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      // If the data row with the provided object ID is not found, return a 404 response
      return res
        .status(404)
        .json({ success: false, message: "Data row not found" });
    }

    // If the data row is successfully deleted, return a success response
    res.json({ success: true, message: "Data row deleted successfully" });
  } catch (error) {
    // If an error occurs during the deletion process, return a 500 response
    console.error("Error deleting data:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting data",
      error: error.message,
    });
  }
};
