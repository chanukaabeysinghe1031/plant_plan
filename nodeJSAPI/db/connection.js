const mongoose = require("mongoose");

// user name = plantplan123
//password = 7wrNRC3HyyKjLeaU
const URI =
  "mongodb+srv://plantplan123:7wrNRC3HyyKjLeaU@cluster0.0fqmnis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("PLANT PLAN DATABASE CONNECTION HAS BEEN SET UP!");
};

module.exports = connectDB;
