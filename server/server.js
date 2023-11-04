/*
Dependencies under server directory:
"npm init -y"
"npm i express"
"npm i dotenv"
"npm install mongodb"
"npm i express-session"
"npm i cookie-parser"
"npm run dev"

Dependencies under client directory:
"npm install"
"npm start"
*/

// Get the content from the .env file
require('dotenv').config()
DB_URI = process.env.DB_URI

// Connect to Express, MongoDB, and get bodyParser
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = DB_URI



// Connect to MongoClient
async function run() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      //await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

// Connect to MongoClient and save email to database
async function storeEmail(email) {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    let db = client.db('landing_page');
    let emails = db.collection('emails');
    let temp = await emails.findOne({'email': email})
    if (temp) {
      console.log("email already exists")
    } else {
      await emails.insertOne({'email': email})
    }
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log("Successfully saved data to MongoDB");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
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

app.post('/api/start', (req, res)=> {
    let {sessionId} = req.body
    console.log("Real sessionId: " + req.sessionID)
    console.log("sessionId: " + sessionId)
    res.json({"message":"connectToDatabase()"})
    run().catch(console.dir);
})

app.post('/api/next', (req, res)=> {
  let {sessionId} = req.body
  console.log("Real sessionId: " + req.sessionID)
  console.log("sessionId: " + sessionId)
  res.json({"message":"connectToDatabase()"})
  run().catch(console.dir);
})

app.post('/api/storeEmail', (req, res)=> {
  let {email} = req.body
  console.log("Real sessionId: " + req.sessionID)
  console.log("email: " + email)
  res.json({"message":"storeEmail()"})
  storeEmail(email).catch(console.dir);

})

app.listen(5000, ()=> console.log("Server started at port 5000"))
