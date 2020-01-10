const mongoose = require("mongoose");
require("dotenv").config();

// this is basically a dict
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log("Connecting...");
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);

    // Exit with code 1
    process.exit(1);
  }
};

module.exports = connectDB;
