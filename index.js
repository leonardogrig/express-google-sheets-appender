const express = require("express");
const { google } = require("googleapis");

const app = express();
app.use(express.json());

async function getGoogleSheetsAPI() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });
  return { auth, googleSheets };
}

app.post("/addRow", async (req, res) => {
  const { auth, googleSheets } = await getGoogleSheetsAPI();
  const spreadsheetId = "spreadsheetidhere";
  const { values } = req.body;

  const { data: existingValues } = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Class Data!A1:A",
  });

  if (existingValues.values.includes(values[0])) {
    return res.status(404).json({ message: "Ticker already present." });
  }

  const rowNumber = existingValues.values.length;
  values.splice(1, 0, `=GOOGLEFINANCE(A${rowNumber + 1})`);
  const row = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "CLASS DATA",
    valueInputOption: "USER_ENTERED",
    resource: { values: [values] },
  });

  res.send(row.data);
});

app.listen(5000, () => console.log("Running on port 5000"));
