const mongoose = require("mongoose");

const URI =
  "mongodb+srv://admin:admin@cluster0.gf9rrpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("PLANT PLAN DATABASE CONNECTION HAS BEEN SET UP!");
};

module.exports = connectDB;
