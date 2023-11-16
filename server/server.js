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
"npm install axios"
"npm start"
*/

// Get the content from the .env file
require("dotenv").config();

// Connect dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

// Get secret files
const serviceAccountKeyFile = "./dazzling-pier-398716-de8cf8bc5f4c.json";
const sheetId = process.env.SHEET_ID;
const tabName = process.env.TAB_NAME;
const range = process.env.RANGE;
const APP_PASSWORD = process.env.APP_PASSWORD;
const APP_EMAIL = process.env.APP_EMAIL;

const app = express();

// Connect to the Google Sheet Client
async function getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: "v4",
    auth: authClient,
  });
}

// Append new data to Google Sheet
async function writeGoogleSheet(
  googleSheetClient,
  sheetId,
  tabName,
  range,
  data
) {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      majorDimension: "ROWS",
      values: data,
    },
  });
}

// Call the function to store Email in Google Sheet using Google API
async function storeEmail(email) {
  let client = await getGoogleSheetClient();
  let data = [[email]];
  writeGoogleSheet(client, sheetId, tabName, range, data);
}

// Call the function to send an Email using nodemailer library
async function sendToEmail(email, skin_type, acne_prone, sun_sensitive) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: APP_EMAIL,
      pass: APP_PASSWORD,
    },
  });

  var emailTemplate = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <!-- <link rel="stylesheet" href="emailtemp.css" /> -->
          <style type="text/css">
            @import url("https://fonts.googleapis.com/css2?family=Antonio:wght@100;200;300;400;500;600;700&family=Koulen&family=League+Spartan:wght@300;400&display=swap");
            :root {
              --main-yellow: #da9b2a;
              --main-green: #004438;
              --font1: "Koulen", sans-serif;
              --font2: "Antonio", sans-serif;
              --font3: "League Spartan", sans-serif;
            }
            body {
              margin: 0;
              padding: 0;
              position: relative;
              background-color: #f2f2f2f2;
              color: #004438;
            }

            .wrapper {
              width: 100%;
              height: max-content;
              position: relative;
              background-color: #f2f2f2f2;
              z-index: 100;
            }

            .main-wrapper {
              width: 100%;
              position: relative;
              max-width: 500px;
              background-color: #ffffff;
              overflow: hidden;
              box-sizing: border-box;
              z-index: 100;
            }

            .header-logo {
              width: 100%;
              height: 4rem;
              background-color: #da9b2a;
              position: relative;
              z-index: 100;
            }

            .header-logo img {
              width: 4rem;
            }

            .add-fl {
              z-index: 1;
            }

            .add-fl img {
              position: absolute;
              width: 18rem;
              top: -1.8rem;
              right: -5rem;
              z-index: 1;
            }

            .result-wrapper {
              position: relative;
              width: 100%;
              height: fit-content;
              background-color: #fdfaf3;
            }

            .greet {
              position: relative;
              margin: 0;
              padding-top: 3rem;
              font-family: var(--font3);
              z-index: 100;
            }

            .result-wrapper p {
              position: relative;
              margin: 5px;
              font-family: "League Spartan", sans-serif;
              font-weight: 300;
              z-index: 100;
            }

            .result {
              margin-top: 3rem;
              font-family: var(--font2);
              width: max-content;
            }

            .result h1 {
              font-size: 1.5em;
            }

            .result-list {
              text-align: left;
              height: fit-content;
              width: 100%;
            }

            .add-wrapper {
              display: flex;
              height: fit-content;
            }

            .res-exp {
              height: fit-content;
              border: 1px solid #004438;
              padding: 1rem;
              margin: 1rem;
              border-radius: 8px;
              font-family: var(--font3);
              font-weight: 300;
              font-size: 70%;
              min-width: 220px;
            }

            .add-model {
              height: 10.5rem;
            }
            .add-model img {
              height: 10.5rem;
              width: auto;
              z-index: 1;
            }

            .footer-wrapper {
              position: relative;
              background-color: #da9b2a;
              width: 100%;
              height: fit-content;
              display: flex;
              padding: 0 1rem;
              z-index: 100;
              box-sizing: border-box;
              margin-top: 0rem;
            }

            .footer-logo img {
              width: 6rem;
            }

            .soc-links {
              width: 100%;
              text-align: right;
            }
            .soc-links img {
              width: 1.35rem;
              text-align: right;
              padding: 0.55rem 0.2rem;
            }
          </style>
        </head>
        <body>
          <center class="wrapper">
            <div class="main-wrapper">
              <!--
              <div class="add-fl">
                <img
                  src="https://i.ibb.co/QdK7DWc/Alstroemeria-Flowers.png"
                  alt=""
                />
              </div> -->
              <div class="header-logo">
                <img
                  src="https://i.ibb.co/9Gsf1FB/scire-essentials-master-file-Seal-green.png"
                  alt="scire logo"
                />
              </div>

              <div class="result-wrapper">
                <h1 class="greet">SkinGenius</h1>
                <p>The beginning of your skin care journey</p>
                <div class="result">
                  <h1>Your Skin Test Result:</h1>
                  <div class="result-list">
                    <p>Skin Type: ${skin_type}</p>
                    <!--Add variable here - Skin Type -->
                    <p>Acne Prone: ${acne_prone}</p>
                    <!--Add variable here - Acne Prone -->
                    <p>Sun Sensitive: ${sun_sensitive}</p>
                    <!--Add variable here - Sun Sensitive-->
                  </div>
                </div>           

                <div class="add-wrapper">
                  <div class="res-exp">
                    Your skin type is oily which means that Dolor nostrud proident
                    elit mollit ex occaecat lorem ullamco et tempor amet laborum
                    dolore non ullamco cillum id enim. Officia cupidatat magna
                    exercitation nisi pariatur magna quis
                  </div>
                  <div class="add-model">
                    <img src="https://i.ibb.co/wJxt5FV/result-model.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="footer-wrapper">
                <div class="footer-logo">
                  <img
                    src="https://i.ibb.co/vhQykTr/scire-essentials-master-file-Lockup-horizontal-green.png"
                    alt=""
                  />
                </div>
                <div class="soc-links">
                  <img
                    src="https://i.ibb.co/G5BCtxW/facebook.png"
                    alt="facebook"
                    border="0"
                  />
                  <img
                    src="https://i.ibb.co/RYZQqZC/email.png"
                    alt="email"
                    border="0"
                  />
                </div>
              </div>
            </div>
          </center>
        </body>
      </html>
    </html>
  `
  
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
    subject: "ScireEssentials: Test Results",
    text: emailText,
    html: emailTemplate,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.use(cookieParser());

// Use the express-session with proper settings (cookie was set to expire to 24 hours)
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Use the bodyParser
app.use(bodyParser.json());

// template test to see if the back-end works via a get request
app.get("/api", (req, res) => {
  res.send("From server");
});

// get the answers of the user from each question
app.get("/api/getAnswers", (req, res) => {
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
    option4,
  };

  //console.log("I am at get /api/getAnswers");
  res.json(responseData);
});

// get the test results of the user after the quiz
app.get("/api/getTestResults", (req, res) => {
  //console.log("I am at getTestResults")
  let skin_type = req.session.skin_type;
  let acne_prone = req.session.acne_prone;
  let sun_sensitive = req.session.sun_sensitive;

  const responseData = {
    skin_type,
    acne_prone,
    sun_sensitive,
  };

  //console.log("I am at get /api/getTestResults");
  res.json(responseData);
});

// test the first post request upon starting the quiz
app.post("/api/start", (req, res) => {
  let { sessionId } = req.body;

  //console.log("sessionId: " + req.sessionID);
  res.json({ message: "Session successfully connected" });
});

// stores the response of the user in each question
app.post("/api/storeResponse", (req, res) => {
  let { currentQuestion, letter } = req.body;
  switch (currentQuestion) {
    case 0:
      req.session.option0 = letter;
      //console.log("I stored " + req.session.option0 + " to option0");
      break;
    case 1:
      req.session.option1 = letter;
      //console.log("I stored " + req.session.option1 + " to option1");
      break;
    case 2:
      req.session.option2 = letter;
      //console.log("I stored " + req.session.option2 + " to option2");
      break;
    case 3:
      req.session.option3 = letter;
      //console.log("I stored " + req.session.option3 + " to option3");
      break;
    case 4:
      req.session.option4 = letter;
      //console.log("I stored " + req.session.option4 + " to option4");
      break;
  }
  req.session.save();
  //console.log("Real sessionId: " + req.sessionID);

  res.json({ message: "storeResponse()" });
});

// store the test results of the user upon finishing the quiz
app.post("/api/storeResults", (req, res) => {
  let { skin_type, acne_prone, sun_sensitive } = req.body;

  req.session.skin_type = skin_type;
  req.session.acne_prone = acne_prone;
  req.session.sun_sensitive = sun_sensitive;
  req.session.save();

  //console.log("Results stored successfully to session:", req.sessionID);
  res.json({ message: "storeResults()" });
});

// stores the email of the user in the google sheets
//TODO: post /api/storeEmail will not read in the future if user presses back at least once
app.post("/api/storeEmail", (req, res) => {
  //console.log("I am at the store Email post request");
  let { email } = req.body;
  //console.log("Real sessionId: " + req.sessionID);
  //console.log("email: " + email);
  res.json({ message: "storeEmail()" });
  storeEmail(email).catch(console.dir);
});

// sends the results to the email of the user
app.post("/api/sendEmail", (req, res) => {
  let { email, skin_type, acne_prone, sun_sensitive } = req.body;

  //console.log("/api/sendEmail got", skin_type, acne_prone, sun_sensitive);
  sendToEmail(email, skin_type, acne_prone, sun_sensitive);
  //console.log("Email sent");
  res.json({ message: "sendEmail()" });
});

app.listen(6000, () => console.log("Server started at port 6000"));
