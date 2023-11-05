/*
Dependencies under server directory:
"npm init -y"
"npm i express"
"npm i dotenv"
"npm i express-session"
"npm i cookie-parser"
"npm install googleapis@95.0.0"
"npm run dev"

Dependencies under client directory:
"npm install"
"npm start"
*/

// Get the content from the .env file
require('dotenv').config()

// Connect to Express, GoogleAPI, and get bodyParser
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const app = express()
const serviceAccountKeyFile = "./dazzling-pier-398716-de8cf8bc5f4c.json";
const sheetId = process.env.SHEET_ID;
const tabName = process.env.TAB_NAME;
const range = process.env.RANGE;

async function getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
}

async function writeGoogleSheet(googleSheetClient, sheetId, tabName, range, data) {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      "majorDimension": "ROWS",
      "values": data
    },
  })
}

async function storeEmail(email) {
  let client = await getGoogleSheetClient();
  let data = [[email]];
  writeGoogleSheet(client, sheetId, tabName, range, data);
}

app.use(cookieParser());

// Use the express-session with proper settings (cookie was set to expire to 24 hours)
app.use(session({
    secret: "some secret",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000}
}));

// Use the bodyParser
app.use(bodyParser.json())

app.get('/api', (req, res)=> {
    res.send("From server")
})

app.get('/api/getResults', (req, res)=> {
  let option0 = req.session.option0;
  let option1 = req.session.option1;
  let option2 = req.session.option2;
  let option3 = req.session.option3;
  let option4 = req.session.option4;

  const responseData = {
    option0,
    option1,
    option2,
    option3,
    option4
  };

  //TODO: fix this part. It is getting called twice from getAnswers() from Main.js
  console.log("I am at get /api/getResults");
  res.json(responseData);
})

app.post('/api/start', (req, res)=> {
    console.log("sessionId: " + req.sessionID)
    res.json({"message":"Session successfully connected"})
})

app.post('/api/storeResponse', (req, res)=> {
  let {currentQuestion, letter} = req.body
  switch (currentQuestion) {
    case 0:
      req.session.option0 = letter;
      console.log("I stored " + req.session.option0 + " to option0");
      break;
    case 1:
      req.session.option1 = letter;
      console.log("I stored " + req.session.option1 + " to option1");
      break;
    case 2:
      req.session.option2 = letter;
      console.log("I stored " + req.session.option2 + " to option2");
      break;
    case 3:
      req.session.option3 = letter;
      console.log("I stored " + req.session.option3 + " to option3");
      break;
    case 4:
      req.session.option4 = letter;
      console.log("I stored " + req.session.option4 + " to option4");
      break;
  }
  console.log("Real sessionId: " + req.sessionID)
})

//TODO: post /api/storeEmail will not read in the future if user presses back at least once
app.post('/api/storeEmail', (req, res)=> {
  console.log("I am at the store Email post request");
  let {email} = req.body
  console.log("Real sessionId: " + req.sessionID)
  console.log("email: " + email)
  res.json({"message":"storeEmail()"})
  storeEmail(email).catch(console.dir);
})

app.listen(5000, ()=> console.log("Server started at port 5000"))
