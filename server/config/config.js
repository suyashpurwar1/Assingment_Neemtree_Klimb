const mongoose = require("mongoose");

// Get MongoDB connection string securely
const connection_string = process.env.MONGODB_URL;

// Connect to MongoDB database
module.exports = () => {
  try {
    mongoose.connect(connection_string);
    console.log("Database connected"); // Success message
  } catch (err) {
    console.error("Database connection error:", err);
    throw err; // Re-throw for handling
  }
};
