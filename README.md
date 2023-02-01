# express-google-sheets-appender
This code creates an Express.js server that listens on port 5000 and exposes a single endpoint /addRow that accepts a POST request with a JSON payload.

When a POST request is made to the endpoint, the server retrieves Google Sheets API credentials and client, and checks the Class Data sheet's first column (A) to see if the first value of the values payload array is already present. If it is, the server returns a 404 response with a message of "Ticker already present.".

If the first value is not present, the server appends the values array as a new row to the Class Data sheet, with the second value being a Google Finance formula that takes the first value as its input. The server returns the response from the Google Sheets API call to append the values.

To run this project, you will need to have Node.js and npm (Node Package Manager) installed on your machine.

Follow these steps to run the project:

1. Open a terminal or command prompt and navigate to the directory containing the code.

2. Run the following command to install the required packages:

npm install express googleapis

3. Place your Google Sheets API credentials in a file named credentials.json in the same directory as the code.

4. Run the following command to start the server:

node index.js

5. You should see the message Rodando na porta 5000 (running on port 5000), indicating that the server has started successfully.

6. You can now make a POST request to the /addRow endpoint with a JSON payload that contains a values array. For example, using a tool such as Postman or curl, you could make a POST request to http://localhost:5000/addRow with a payload of { "values": [ "GOOG", "10", "2022-01-01" ] }.
