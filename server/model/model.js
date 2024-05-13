const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This schema defines the structure of documents in the "CandidateList" collection
// within a MongoDB database.

const candidateSchema = new Schema(
  {
    // Required Candidate Details (As per Database)
    "Name of the Candidate": { type: String, required: true },
    Email: { type: String, required: true },
    "Mobile No.": { type: String, required: true },
    "Date of Birth": { type: String, required: true },
    "Work Experience": { type: String, required: true },
    "Resume Title": { type: String, required: true },
    "Current Location": { type: String, required: true },
    "Postal Address": { type: String, required: true },

    // Optional Candidate Details
    "Current Employer": { type: String},
    "Current Designation": { type: String },
  },
  { timestamps: false, versionKey: false } // Automatic timestamps and versioning disabled
);

module.exports = mongoose.model("CandidateList", candidateSchema);
