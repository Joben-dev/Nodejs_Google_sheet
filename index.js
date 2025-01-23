const express = require('express');
const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Your private key details
const credentials = {
  type: "service_account",
  project_id: "digital-shadow-448708-f3",
  private_key_id: "0da80e5f95fbde61a391f5df2897f87018ecc132",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDienOYLLSXJKan\nbKUEeNI+1SDbjPhndN2i6NM8nIqwTaQ7SUfSCS5I965+HlQsmpNJeTPJSpc8LTzu\nQccmrQy8DeN2kfuLcSLmtC/zS9X8TX93QfGELAcAZkdX6DW2WKFRrPVe9yid0nZn\nJkWPI8EPsub2jOzwl6iSRNS3xPmf0G1lII9HQTz3FVeGyqB5Z2W86hrbrWu2reqs\nP/CxnJCAnTD7LLGbVToSK4kiBechWaYX4fgmgG4eqhZmqox76bKAgovMSQrRIbcw\nJLB1R9myvIBd+rWqRNsSAuCyHYZOCe1DtRy7Lfh+nYz8BGBi3BXbUO7+88n9PghQ\nuQEc+g4nAgMBAAECggEAJsSkVffNIBRPjNhdtRLDlqrgGYUbnoYUTIdDZZw8Z2qb\nAuUL7MnSiP4Q+hjR+uKo9MpREZN5qPzrcbOD1jyIMgbEma7qmteOjGRq0uB37F0N\nxUneAGyS9EAN1V/0Fdc9IiCTziJL6xw0VXrpLFQH/9p1i93az2J+oi8zJJQM0QzH\nsB9zcvW8LyGgJwBC/8dxjZ9EgyIziBTGcZSrNHxS/3zFf+BvGB+aVNInZE0XWMrQ\nFK9HskakUUjuhDp6zI1RUwFAbqhtFs4cZbJDoVCrewD09XF5X0eo2Xzv2Wic2mjl\nJ5EGjDJKME6EhI6vFVYQr2Y9pLwb5vlvNh8za83UdQKBgQD73d0XC9yZeIQCQIN2\nRipsu78lfH3n0MuQeVOWUevCLeoj3SCb0/lHSFv6dkGz9+7lts6HVse/AI7PtOne\n5L1e8d+IjRRifQckx82w1M2TVOsvmDgp6+L/ULykgSEN0hCDlkWgqzfqzX3WQl35\nA+ADZFK9YRQvifgyFaHQ0fSSlQKBgQDmMe1TGGsJRa7jpGYVz17CvQhz0Q+quvFA\nvFbj+LebRNGs3I6RPfhdhy2mAT+ao6VPIFcgOSamGwgZ1szULW/CvNJUixJ60j7C\nSYS7kOht1Ckl/+2iGdeGIg531WDeyIoNa1ijxkfl52sFnynXMoGTq1qWuvCOF3Zk\nc6aNBRAKywKBgDxSVrE+VgcrpfIkIVgiVebU0GLZ/g2XJCnl5O8Lj7th48HTJAwu\nKHW6Ds1dpT7FEqJRtgUT86L7Lzjvy1Nm1TP4GeFKaKdt6lgUwl6nmNTAcdNkUY84\nv5UGcSe1BYWZ2fqp8uMYHrxNmuXF31vUYcJuNKLGrV71XEwigi7RGhJBAoGAGSRe\n3XKPTkX0Ihz0oXEy0mY/JBczdNxSOVXYz7F8rFLJ6+1zDN4N4HlBPR5pygQRrCDG\nI1japc3SBrB1Ur9bs5NYDa/a5ttLy4CoJKxhFo3TqLjZRZk49weFOQVvPSX+HhUZ\na1nexHeQMt79fOmhSXWvwULNv1dEsRgImuJwrB0CgYAFHykGwGZtatSHpIl/HH+t\nx7N2TpBUcsXsUsE4bayp/bcj/4QHw+ASHFT41F37CcOFND+2l4GXMHSqGN4Goorr\nrFtyTU0jZCgYspIKfwXqVelS1YYhjKm2DPDle6Qy9tVe/Krl9fHES+OWwGBnloiM\n0cuJfNbWdYbPwNMGWUJ3IA==\n-----END PRIVATE KEY-----\n",
  client_email: "ven-488@digital-shadow-448708-f3.iam.gserviceaccount.com",
  client_id: "112081121325257519516",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/ven-488%40digital-shadow-448708-f3.iam.gserviceaccount.com",
};

// Authenticate
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Initialize Sheets API
const sheets = google.sheets({ version: "v4", auth });

// Spreadsheet ID and Range
const spreadsheetId = "1N-XuverLTVGuFLjCDWl3AymQP_UBWUEzbQ02W4IKB0M"; // Your spreadsheet ID

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
