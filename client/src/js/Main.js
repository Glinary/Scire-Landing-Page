import { Button, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from "./theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "./Header";
import axios from 'axios';

// The main quiz section

// list of all questions
const questions = [
  {
    question:
      "If you wash your face and don't apply any products, how does your skin behave 30 minutes after?",
    options: [
      "It feels dry",
      "It feels calm, smooth, and soft",
      "It feels uneven (oily in some parts and dry on the other parts)",
      "It feels shiny and oily",
    ],
  },
  {
    question: "What does your skin typically look like at the end of the day?",
    options: [
      "My forehead and nose are very shiny and oily but my cheeks are matte.",
      "Crazy oily.",
      "Tight or splotchy. Like the desert. I need to put moisturizer on ASAP!",
      "Dull and tired. It feels mostly dry.",
      "My complexion is only slightly oily at the end of the day.",
      "I have some redness and irritation when exposed to skincare products or other environmental factors.",
      "It looks normal. Not overly dry or oily.",
    ],
  },
  {
    question: "Describe your pores.",
    options: [
      "My pores are large, visible, and sometimes clogged all over my face.",
      "Depends on where they are on my face. My pores are medium to large around my T-zone.",
      "Small to medium-sized. My pores are small and not visible.",
      "They seem to change with the day. My pores are visible but small.",
    ],
  },
  {
    question: "How frequently do you have breakouts or active acne lesions?",
    options: ["Frequent", "Seldom"],
  },
  {
    question:
      "Have you ever had a sunburn or noticed pigmentation changes after sun exposure?",
    options: ["Yes", "No"],
  },
];

function connectToDatabase() {
  console.log("I am at connectToDatabase()");
  // let userData = {
  //   sessionId: "sampleSessionId",
  // };
  // fetch("/api/start", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userData),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  /// axios version
  axios.post('/api/start', {
    sessionId: "sampleSessionId"
  }).then(function(response) {
    console.log(response)
  })
  /// axios version
}

function storeResponse(currentQuestion, letter) {
  console.log("I am at storeResponse()");
  // let userData = {
  //   currentQuestion: currentQuestion,
  //   letter: letter,
  // };
  // fetch("/api/storeResponse", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userData),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  // axios version
  axios.post("/api/storeResponse", {
    currentQuestion: currentQuestion,
    letter: letter
  }).then(function (response) {
    console.log(response)
  })
  // axios version
}

async function storeEmail (email) {
  console.log("I am at storeEmail()");
  // let userData = {
  //   email: email,
  // };
  // await fetch("/api/storeEmail", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userData),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  // axios version
  axios.post("/api/storeEmail", {
    email: email
  }).then(function(response){
    console.log(response)
  })

  // axios version
}

// store the results and send the email
async function storeResults(email, skin_type, acne_prone, sun_sensitive) {
  console.log("I am at storeResults()");
  sendEmail(email, skin_type, acne_prone, sun_sensitive);
  // let userResults = {
  //   skin_type: skin_type,
  //   acne_prone: acne_prone,
  //   sun_sensitive: sun_sensitive
  // };
  // fetch("/api/storeResults", {
  //   method: 'post',
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userResults),
  // }).then((response)=> response.json()).then((data)=>{
  //   console.log(data)
  // })

  axios.post("/api/storeResults", {
    skin_type: skin_type,
    acne_prone: acne_prone,
    sun_sensitive: sun_sensitive
  }).then(function(response) {
    console.log(response)
  })

}

async function sendEmail(email, skin_type, acne_prone, sun_sensitive) {
  console.log("I am at sendEmail()");
  // let userResults = {
  //   email: email,
  //   skin_type: skin_type,
  //   acne_prone: acne_prone,
  //   sun_sensitive: sun_sensitive
  // };
  // fetch("/api/sendEmail", {
  //   method: 'post',
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userResults),
  // }).then((response)=> response.json()).then((data)=>{
  //   console.log(data)
  // })

  axios.post("/api/sendEmail", {
    email: email,
    skin_type: skin_type,
    acne_prone: acne_prone,
    sun_sensitive: sun_sensitive
  }).then(function(response) {
    console.log(response)
  })
}

// Process a get request to /api/getAnswers and return the JSON result

function getInitial() {
  return 0
}

function Test() {
  // Declaration of variables
  const [currentQuestion, setCurrentQuestion] = useState(getInitial());
  const [showTest, setShowTest] = useState(false);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState([]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [skinType, setSkinType] = useState(null);
  const [acneProne, setAcneProne] = useState(null);
  const [sunSensitive, setSunSensitive] = useState(null);




  // When the start test button is clicked
  const handleStartTest = () => {
    console.log("I am at handleStartTest()");
    connectToDatabase();
    setShowTest(true);
  };

  // Landing page shown before the test starts
  if (!showTest) {
    return (
      <div id="landing-page">
        <Header />
        <div className="flex flex-row justify-center mb-24">
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="primary"
              className="text-emerald-900"
              onClick={handleStartTest}
            >
              Start Test
            </Button>
          </ThemeProvider>
        </div>

        <div id="whitespace" className="h-40">
        </div>
      </div>
    );
  }

  // When a test option is clicked
  const handleAnswer = (option) => {
    console.log("I am at handleAnswer")
    const index = options.indexOf(option);
    const letter = String.fromCharCode(index + 65);
    setAnswers([...answers, letter]);
    storeResponse(currentQuestion, letter);
    setCurrentQuestion(currentQuestion + 1);
  };

  // // Goes back 1 question
  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
    setAnswers(answers.slice(0, -1));
  };

  // When email form is submitted
  const handleEmailSubmit = async (event) => {
    console.log("I am  at handleEmailSubmit");
    event.preventDefault();
    await storeEmail(email);
    await processAnswers();
    console.log(email);
    setEmailSubmitted(true);
  };

  // When email input is changed
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // const getAnswers = async () => {
  //   // await fetch("/api/getAnswers", {
  //   //   method: "get",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // }).then((response) => response.json()).then((data)=> {
  //   //   setQ(data);
  //   // });

  //   axios.get("/api/getAnswers").then(function(response) {
  //     console.log(response)
  //   })
  // }

    // Process the answers and return the final result
  const processAnswers = async () => {
    let skin_type, acne_prone, sun_sensitive;
    
    axios.get("/api/getAnswers").then(function(response) {
      const q1 = response.data.option0
      const q2 = response.data.option1
      const q3 = response.data.option2
      const q4 = response.data.option3
      const q5 = response.data.option4

      if (q1 === "A") {
        if (q2 === "C" || q2 === "D") {
          skin_type = "Dry";
        } else if (q2 === "G") {
         skin_type = "Normal";
        } else if (q2 === "A" || q2 === "B" || q2 === "E") {
          skin_type = "Combination";
        } else if (q2 === "F") {
          skin_type = "Sensitive";
        }
      } else if (q1 === "B") {
        if (q2 === "B") {
          if (q3 === "A") {
            skin_type = "Oily";
          } else {
            skin_type = "Normal";
          }
        } else if (q2 === "C" || q2 === "D") {
          if (q3 === "B") {
            skin_type = "Combination";
          } else {
            skin_type = "Dry";
          }
        } else if (q2 === "A" || q2 === "E") {
          skin_type = "Combination";
        } else if (q2 === "F") {
          skin_type = "Sensitive";
        } else if (q2 === "G") {
          skin_type = "Normal";
        }
      } else if (q1 === "C") {
        if (q2 === "F") {
          skin_type = "Sensitive";
            } else if (q2 === "B") {
          if (q3 === "A" || q3 === "B") {
            skin_type = "Oily";
          } else if (q3 === "C" || q3 === "D") {
            skin_type = "Combination";
          }
        } else {
          skin_type = "Combination";
        }
      } else if (q1 === "D") {
        if (q2 === "F") {
          skin_type = "Sensitive";
        } else if (q2 === "A" || q2 === "E") {
          skin_type = "Combination";
        } else if (q2 === "G") {
          if (q3 === "A" || q3 === "B") {
            skin_type = "Oily";
          } else {
            skin_type = "Combination";
          }
        } else {
          skin_type = "Oily";
        }
      }
  
      if (q4 === "A") {
        acne_prone = "Acne Prone";
      } else {
        acne_prone = "Not Acne Prone";
      }
  
      if (q5 === "A") {
        sun_sensitive = "Sun Sensitive";
      } else {
        sun_sensitive = "Not Sun Sensitive";
      }
  
      storeResults(email, skin_type, acne_prone, sun_sensitive);
          
      setSkinType(skin_type);
      setAcneProne(acne_prone);
      setSunSensitive(sun_sensitive);
  
      console.log("Results stored as:", skin_type, acne_prone, sun_sensitive);
    })
  };

  // When all questions have been asked
  if (currentQuestion >= questions.length) {
    if (!emailSubmitted) {
      return (
        <div id="email-input">
          <Header />
          
          <h2>Enter your email to save your result</h2>
          <form onSubmit={handleEmailSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <button type="submit" disabled={email.trim() === ""}>
              Submit
            </button>
          </form>
        </div>
      );
    } else {
      return <div>{
          // Return results if email has been submitted
          (
            
            <div id='results'>
              <Header />
              <p>
                Thank you for answering the questions!
                <br />
                Here's your assessment:
                <br />
                Skin Type: {skinType}
                <br />
                Acne Prone: {acneProne}
                <br />
                Sun-Sensitive: {sunSensitive}
                <br />
                If you have any more questions or need further assistance, feel free
                to ask!
                <br />
              </p>
            </div>
          )
        }</div>;
    }
  }

  // Render the current question and options
  const { question, options } = questions[currentQuestion];
  
  // Display the current question and options
  return (
    <div id="quiz-page" className="pb-8">
      <Header />
      <div className="flex rounded-lg bg-emerald-900 mt-8 mx-20">
        {/* progress */}
        <div>Guidelines Test Result</div>

        {/* question */}
        <div className="flex-1 bg-white m-5 rounded-md">
          <div className="px-80">
            <h2 className="font-bold text-center py-4">{question}</h2>
            <ul>
              {options.map((option) => (
                // wrap li in button
                <button
                  className="block w-full rounded-md bg-emerald-600 my-5 px-12 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                  key={option}
                  onClick={() => handleAnswer(option)}
                >
                  <li>{option}</li>
                </button>
              ))}
            </ul>

            {currentQuestion > 0 && (
              <ThemeProvider theme={theme}>
                <Button
                  variant="text"
                  className="my-5 font-semibold text-emerald-700 hover:text-emerald-800"
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </ThemeProvider>
            )}
          </div>
          <div id="main-filler"></div>
        </div>
      </div>
    </div>
  );
}

export default Test;
