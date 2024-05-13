const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser"); // Parse request bodies
const apiRouter = require("./routes/routes"); // Routes from reader.routes.js

// Load environment variables (.env)
require("dotenv").config();

// Parse urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes from reader.routes.js
app.use("/", apiRouter);

// Execute configuration from reader.config.js
require(path.join(__dirname, "./config/config"))();

// Start server on environment port
app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
