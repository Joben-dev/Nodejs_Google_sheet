const express = require('express');
const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
const sheetId = process.env.spreadsheet
// Middleware to parse JSON requests
app.use(express.json());

// Your private key details
const credentials = require('./static/credentials.json')

// Authenticate
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Initialize Sheets API
const sheets = google.sheets({ version: "v4", auth });

// Spreadsheet ID and Range
const spreadsheetId = sheetId; // Your spreadsheet ID

async function appendToSheet(data) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1", // Target sheet name
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [data], // Data to append
      },
    });
    console.log("Data appended:", response.data);
  } catch (error) {
    console.error("Error appending to sheet:", error);
  }
}

app.post("/", (req, res) => {
  const { name } = req.body;
  setTimeout(() => {
    appendToSheet([name]) // Append name to the sheet
    .then(() => res.send("Data added successfully"))
    .catch((error) => res.status(500).send(error.message));
  },200)
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
