const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectDB = require("./db/connection");
const cors = require("cors");

// ROUTES
app.get("/", (req, res) => {
  res.send("This is Plant Plan API");
});

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define sensor data schema

const dataRouter = require("./api/routes/data_route");
const emailRouter = require("./api/routes/email_route");

app.use("/api/data", dataRouter);
app.use("/api/email", emailRouter);

// Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
