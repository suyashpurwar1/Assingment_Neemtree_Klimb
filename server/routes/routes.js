const express = require("express");
const router = express.Router();
const cors = require("cors"); // Enable CORS
const readController = require("../controller/controller");
const multer = require("multer");

const upload = multer({
  dest: "./public/uploads", // Upload directory
  filename: (req, file, cb) => cb(null, file.originalname), // Keep original filename
});

// Enable CORS for all routes (adjust for specific routes if needed)
router.use(cors());

// Route to import CSV data with multer middleware and controller function
router.post("/importdata", upload.single("file"), readController.importData);

module.exports = router;
