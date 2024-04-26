const Email = require("../models/email");
const { CourierClient } = require("@trycourier/courier");

// Save or update email address
exports.saveEmail = async (req, res) => {
  const { email } = req.body;

  try {
    let existingEmail = await Email.findOne();

    if (!existingEmail) {
      // If no existing email, create a new one
      existingEmail = new Email({ email: email });
    } else {
      // If email exists, update it
      existingEmail.email = email;
    }

    await existingEmail.save();

    res.json({ success: true, message: "Email address saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Unsuccessful",
      message: "Error saving email address",
      error: error.message,
    });
  }
};

// ************************* To send notification **************************
exports.sendNotification = async (req, res) => {
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

    // Check if all required data is present
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({
        status: "Unsuccessful",
        message: "All the data must be entered.",
      });
    }

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
    res.json({ status: "Success", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Unsuccessful",
      message: "Error sending notification",
      error: error.message,
    });
  }
};
