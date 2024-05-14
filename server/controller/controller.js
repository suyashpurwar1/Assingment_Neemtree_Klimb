const CandidateModel = require("../model/model");
const xlsx = require("xlsx");
const xls = require("xlsjs");
const csv = require("csvtojson");
const async = require("async");

class ReaderController {
  async importData(req, res) {
    try {
      let jsonData;
      let fileExtension;

      // Check file extension
      if (req.file.originalname.endsWith(".xlsx")) {
        // Read XLSX data
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        jsonData = xlsx.utils.sheet_to_json(sheet);
        fileExtension = "XLSX";
      } else if (req.file.originalname.endsWith(".xls")) {
        // Read XLS data
        const workbook = xls.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        jsonData = xls.utils.sheet_to_json(sheet);
        fileExtension = "XLS";
      } else if (req.file.originalname.endsWith(".csv")) {
        // Read CSV data
        jsonData = await csv().fromFile(req.file.path);
        fileExtension = "CSV";
      } else {
        throw new Error("Unsupported file format");
      }

      // Get the total number of rows
      const totalRows = jsonData.length;

      // Initialize counters for rows added, skipped, and not processed
      let rowsAdded = 0;
      let rowsSkipped = 0;
      let rowsNotProcessed = 0;

      // Loop through each candidate data
      await async.eachSeries(jsonData, async (candidate) => {
        const email = candidate.Email;

        // Check for duplicate email
        const existing = await CandidateModel.findOne({ Email: email });
        if (existing) {
          console.log(`Skipping duplicate: ${email}`);
          rowsSkipped++;
          return; // Skip duplicate
        }

        // Create and save new candidate
        try {
          const newCandidate = new CandidateModel(candidate);
          await newCandidate.save();
          console.log(`Saved candidate: ${email}`);
          rowsAdded++;
        } catch (err) {
          console.error(`Error saving candidate: ${err.message}`);
          rowsNotProcessed++;
        }
      });

      // Respond with success or error
      res.status(200).json({
        success: true,
        msg: `Candidates imported from ${fileExtension}`,
        totalRows,
        rowsAdded,
        rowsSkipped,
        rowsNotProcessed,
      });
    } catch (err) {
      res.status(400).json({ success: false, msg: err.message });
    }
  }
}

module.exports = new ReaderController();

// I added 3 variable one is rowsSkipped that count dupicate , other is rowsAdded that count rows saved in mongoDB database
// last is rowsNotProcessed it count row is not processed due to model miss match and missing required model.