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
const ElasticEmail = require('@elasticemail/elasticemail-client');


// Get secret files
const serviceAccountKeyFile = "./dazzling-pier-398716-de8cf8bc5f4c.json";
const sheetId = process.env.SHEET_ID;
const tabName = process.env.TAB_NAME;
const range = process.env.RANGE;
const APP_EMAIL = process.env.APP_EMAIL;
const MAILER_API = process.env.MAILER_API;

const app = express();
const path = require('path')
const emailClient = ElasticEmail.ApiClient.instance;
const apikey = emailClient.authentications['apikey'];
apikey.apiKey = MAILER_API;

const serviceAccountCredentials = {
  "type": "service_account",
  "project_id": "dazzling-pier-398716",
  "private_key_id": "de8cf8bc5f4c3957634d6d34d13bbada5263d3ee",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgV8OyBKz3b/VO\n7YWJaiR0iCRvEU3JAF2G/DOkVMgWgSgQ88UAV510NpTq6a+ATpl51dstmofPaw52\n2YuIhbwwjYXAqalDbjN/YUo7m5jf1N+dH+ToG3WrrKM9CvG1OBRVm1Nb+twG9WHh\nZES/qwnnM0l9uNDCOSmlgDN+pKkkyUrK8LvibygMwhj70qHPGcYKXZAkmH7z+5FR\ngmpQUYXHaAi8BbfPsRKMLBqtPOnSrgpyJvaCCnFK+EniBH7hvjAkqcvBoVKtOfbI\n1xl/Ffdxr+Bz6QCdT7A7+nC0KX8WTb2agtgSOLklX40kQGG6rBgoRwgfQI5XDf+T\nATD3hRHxAgMBAAECggEACC9LhXgkM1bTVVDXGV9U+ydoZOD1vIqV3vHelHU/Y4rM\nwmmSW2PW68F+B2AFNiIn+UjzGSPVJp0aRv3C2HVAm2jeY1wNP9eKa3BKPAh+OFRU\n4C+ks08lKOFAh16Z2Om13DWxgd6SHnLfYlC9LVz5HIVDfiG7BAr/2PjnaAxr21qn\nK1rR0MBFTY0R9A1GZr/AXfSdgf2HUEBdgsm/SVKxW2asFzF+ZwcM5xEDb8NNIRV3\nQqYJqsAl3uDnxj9g2PSS6aiJnwVK3CIYcgsRFgkiDHumCoIMlTDqjEhGMNKD9SUe\nvcQH13lAJCelYNB8NW+kwd1cu4UWeIWhH+gHm/5F7QKBgQD9Zv81MSRNWdsVYW4y\nhy1sFqHtbzMeSvz9q4tUEdK88ieZlsZcVjPdfJX2+VooJbPCGpAhG3HuxnhLPegw\n4sZ3vjV3N3YvFir+cDl5dTwICE5UvdtvG7Xa5/XEqd3nuJxj3MIrQ1sUQaPFvssI\nfV5g3ZTFtX3veO+Sl1nALSF7OwKBgQDipIG6jzxJiJIOFSzRWlKWzFVxZHLV7F/t\nWuH8ik0/BrbMhfl8Ln4tqSGYblHMO/T/2EDS9frWxwNnjS5+/1nPEuSdZLQy9lqa\n98Vwz3nHaMViXbZMUIKgoSBaH2tOmJJrhtngygmwuxIEzd1PLvjltHeFqiCgn129\np7IzAoFcwwKBgH5NDNzdToPDSqBAfKVwnOIn8bOfXjI2HBzvmLVhYNFOPRCfhuTV\nDmrRwwljRV2HVS5lAPuPa10gzSprg8SB83wRcSKnoR9dBDbnhq4UEcTLJwezzaB2\nhlDClsvcAr+RU1mu2ZSosMfK468XJqlnm1faeWGF0Ww/seE10MUpeWurAoGBAI1S\nKLZMlDoB15jCaWTNXkw7c1e2W8i6kIIvNlTDZDFVnWxgadWeI/2SxakHuSeRh050\n6M7ipJuCEsRiC0kTLkvpqvXdkmNoq8yPjOSv6m6GDPYuGvrxBNLmRYcMqlui1UIJ\nHxiEwpAZxb2LJGE4l+ibpB+LmratSMV2qK4X9NQDAoGAJOcTjuGtQKGa+/m5azFo\n0IBIpJwpyy838YgmpZGet1IG9fKYeW/K+XjfO+nlYKAM1kOfywuBfPJug4oLGfzd\nJfKVskPNMp5ll6rR0A8CqAtIJzlVsZZQ9D3pYtqkJ9z7zQVxdHMmQLcCF11QPyXu\nXn22ZKeuuJaRR/TpkwVBXz8=\n-----END PRIVATE KEY-----\n",
  "client_email": "scire-essentials-emails@dazzling-pier-398716.iam.gserviceaccount.com",
  "client_id": "105219823529752569805",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/scire-essentials-emails%40dazzling-pier-398716.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Connect to the Google Sheet Client
async function getGoogleSheetClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountCredentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();
    return google.sheets({
      version: "v4",
      auth: authClient,
      protocol: "https",
    });
  } catch (e) {
    console.error("Error in getGoogleSheetClient:", e.message);
    throw e;
  }
}


// Append new data to Google Sheet
async function writeGoogleSheet(
  googleSheetClient,
  sheetId,
  tabName,
  range,
  data
) {
  try {
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
  } catch (error) {
    console.error("Error in writeGoogleSheet:", error.message);
    console.error("Request:", error.config);
    console.error("Response:", error.response ? error.response.data : 'No response');
    throw error;
  }
}

// Call the function to store Email in Google Sheet using Google API
async function storeEmail(email) {
    try {
  let client = await getGoogleSheetClient();
   let data = [[email]];
   await writeGoogleSheet(client, sheetId, tabName, range, data);
     } catch (e) {
         console.error("storeEmail error:", e);
     }
}

// Call the function to send an Email using nodemailer library
async function sendToEmail(email, skin_type, acne_prone, sun_sensitive) {
  try {

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
              color: #004438;
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
              padding: 1rem 0.65rem;
              margin: 2.5rem 1.5rem 0rem 1.5rem;
              border-radius: 8px;
              font-family: var(--font3);
              font-weight: 300;
              font-size: 70%;
              min-width: 220px;
              color: #004438;
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
              padding: 0.85rem 0.2rem 0.2rem 0.65rem;
            }
    
            .featured {
              height: fit-content;
              width: 100%;
              background-color: #fdfaf3;
              border-top: 0.8rem solid rgb(243, 236, 236);
            }
    
            .f-title {
              width: 100%;
              color: #004438;
              padding: 2rem 0rem;
              font-size: 1.5em;
              font-family: var(--font3);
            }
    
            .products {
              height: fit-content;
              width: 100%;
              padding-bottom: 2rem;
            }
    
            .f1 {
              width: 80%;
              height: fit-content;
              padding: 1rem 0rem;
              display: flex;
              box-sizing: border-box;
            }
    
            .fimg {
              height: 5rem;
              width: auto;
              padding: 0.35rem;
              border: 1px solid rgb(0, 62, 50, 0.3);
            }
    
            .fimg img {
              position: relative;
              height: inherit;
              width: auto;
            }
    
            .desc {
              width: 100%;
              height: 5rem;
              padding: 0.4rem 0rem;
              background-color: rgb(243, 236, 236);
              overflow-x: hidden;
              color: #004438;
            }
    
            .desc h1 {
              font-size: 1.45em;
              padding-top: 1rem;
              margin: 0;
            }
    
            .desc p {
              text-align: center;
              font-size: 0.65em;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <center class="wrapper">
            <div class="main-wrapper">
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
                  <div class="res-exp"> // TODO: CHANGE THIS DESC
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
              <div class="featured">
                <div class="f-title">Featured Products</div>
                <div class="products">
                  <div class="f1">
                    <div class="fimg">
                      <img src="https://i.ibb.co/SVdnnHJ/DSCF3358.jpg" alt="" />
                    </div>
                    <div class="desc">
                      <h1>Handyong</h1>
                      <p>Elemi Fresh Bar Soap</p>
                    </div>
                  </div>
                  <div class="f1">
                    <div class="fimg">
                      <img src="https://i.ibb.co/XFGQ3XQ/DSCF3335.jpg" alt="" />
                    </div>
                    <div class="desc">
                      <h1>Oryol</h1>
                      <p>Elemi Rejuvinating Bar Soap</p>
                    </div>
                  </div>
                  <div class="f1">
                    <div class="fimg">
                      <img src="https://i.ibb.co/ssVRXmq/DSCF3357.jpg" alt="" />
                    </div>
                    <div class="desc">
                      <h1>Magayon</h1>
                      <p>Elemi Glow Bar Soap</p>
                    </div>
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
    
    `;

    const emailsApi = new ElasticEmail.EmailsApi();

    const emailData = {
      Recipients: [
          {
              Email: `${email}`,
              Fields: {
                  name: "SkinGenius Quiz Taker"
              }
          }
      ],
      Content: {
          Body: [
              {
                  ContentType: "HTML",
                  Charset: "utf-8",
                  Content: emailTemplate
              }
          ],
          From: `${APP_EMAIL}`,
          Subject: "Skin Genius Test Result"
      }
  };

  const callback = (error, data, response) => {
      if (error) {
          console.error(error);
      } else {
          console.log('API called successfully.');
          console.log('Email sent.');
      }
  };

  await emailsApi.emailsPost(emailData, callback);
  
  } catch (e) {
        console.error("Error sending mail:", e);
  }
}

app.set('trust proxy', 1)
app.use(cookieParser());

// Use the express-session with proper settings (cookie was set to expire to 24 hours)
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none'
    },
  })
);

// Use the bodyParser
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

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
    try {
  //console.log("I am at the store Email post request");
  let { email } = req.body;
  //console.log("Real sessionId: " + req.sessionID);
  //console.log("email: " + email);
  res.json({ message: "storeEmail()" });
  storeEmail(email).catch(console.dir);
    } catch (e) {
        console.error("storeEmail error:", e);
    }
});

// sends the results to the email of the user
app.post("/api/sendEmail", (req, res) => {
  let { email, skin_type, acne_prone, sun_sensitive } = req.body;

  //console.log("/api/sendEmail got", skin_type, acne_prone, sun_sensitive);
  sendToEmail(email, skin_type, acne_prone, sun_sensitive);
  //console.log("Email sent");
  res.json({ message: "sendEmail()" });
});

app.listen(3000, () => console.log("Server started at port 3000"));
