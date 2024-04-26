const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  moisture: {
    type: Number,
    required: true,
  },
  light: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Data", dataSchema);
