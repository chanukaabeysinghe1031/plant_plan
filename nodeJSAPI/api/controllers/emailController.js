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
exports.getEmail = async (req, res) => {
  try {
    const existingEmail = await Email.findOne();
    if (!existingEmail) {
      return res
        .status(404)
        .json({ success: false, message: "Email address not found" });
    }
    res.json({ success: true, email: existingEmail.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Unsuccessful",
      message: "Error fetching email address",
      error: error.message,
    });
  }
};
