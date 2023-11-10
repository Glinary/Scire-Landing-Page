/*
Dependencies under server directory:
"npm init -y"
"npm i express"
"npm i dotenv"
"npm i express-session"
"npm i cookie-parser"
"npm install googleapis@95.0.0"
"npm install nodemailer"
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
const nodemailer = require('nodemailer');
const app = express()
const serviceAccountKeyFile = "./dazzling-pier-398716-de8cf8bc5f4c.json";
const sheetId = process.env.SHEET_ID;
const tabName = process.env.TAB_NAME;
const range = process.env.RANGE;
const APP_PASSWORD = process.env.APP_PASSWORD;
const APP_EMAIL = process.env.APP_EMAIL;

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

async function sendToEmail(email, skin_type, acne_prone, sun_sensitive) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: APP_EMAIL,
      pass: APP_PASSWORD
    }
  });

  // Create a template for the email text
  var emailText = `
    Your results:
    Skin Type: ${skin_type}
    Acne Prone: ${acne_prone}
    Sun Sensitive: ${sun_sensitive}
  `;

  var mailOptions = {
    from: APP_EMAIL,
    to: email, 
    subject: 'ScireEssentials: Test Results',
    text: emailText
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.use(cookieParser());

// Use the express-session with proper settings (cookie was set to expire to 24 hours)
app.use(session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000}
}));

// Use the bodyParser
app.use(bodyParser.json())

// template test to see if the back-end works via a get request
app.get('/api', (req, res)=> {
    res.send("From server")
})

// get the answers of the user from each question
app.get('/api/getAnswers', (req, res)=> {
  let option0 = req.session.option0;
  let option1 = req.session.option1;
  let option2 = req.session.option2;
  let option3 = req.session.option3;
  let option4 = req.session.option4;

  console.log("GETANSWERSGOT", option0, option1, option2, option3, option4);

  const responseData = {
    option0,
    option1,
    option2,
    option3,
    option4
  };

  //TODO: fix this part. It is getting called twice from getAnswers() from Main.js
  console.log("I am at get /api/getAnswers");
  res.json(responseData);
})

// get the test results of the user after the quiz
app.get('/api/getTestResults', (req, res)=> {
  let skin_type = req.session.skin_type;
  let acne_prone = req.session.acne_prone;
  let sun_sensitive = req.session.sun_sensitive;

  const responseData = {
    skin_type,
    acne_prone,
    sun_sensitive
  };

  console.log("I am at get /api/getTestResults");
  res.json(responseData);
})

// test the first post request upon starting the quiz
app.post('/api/start', (req, res)=> {
  let {sessionId} = req.body;

  console.log("sessionId: " + req.sessionID)
  res.json({"message":"Session successfully connected"})
})

// stores the response of the user in each question
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
  req.session.save();
  console.log("Real sessionId: " + req.sessionID)
})

// store the test results of the user upon finishing the quiz
app.post('/api/storeResults', (req, res)=> {
  let {skin_type, acne_prone, sun_sensitive} = req.body
  
  req.session.skin_type = skin_type;
  req.session.acne_prone = acne_prone;
  req.session.sun_sensitive = sun_sensitive;
  req.session.save();

  console.log("Results stored successfully to session:", req.sessionID);
})

// stores the email of the user in the google sheets
//TODO: post /api/storeEmail will not read in the future if user presses back at least once
app.post('/api/storeEmail', (req, res)=> {
  console.log("I am at the store Email post request");
  let {email} = req.body
  console.log("Real sessionId: " + req.sessionID)
  console.log("email: " + email)
  res.json({"message":"storeEmail()"})
  storeEmail(email).catch(console.dir);
})

// sends the results to the email of the user
app.post('/api/sendEmail', (req, res)=> {
  let {email, skin_type, acne_prone, sun_sensitive} = req.body;

  console.log("/api/sendEmail got", skin_type, acne_prone, sun_sensitive);
  sendToEmail(email, skin_type, acne_prone, sun_sensitive);
  console.log("Email sent");
})

app.listen(6000, ()=> console.log("Server started at port 6000"))
