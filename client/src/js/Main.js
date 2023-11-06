import { Button, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from "./theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  let userData = {
    sessionId: "sampleSessionId",
  };
  fetch("/api/start", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function storeResponse(currentQuestion, letter) {
  console.log("I am at storeResponse()");
  let userData = {
    currentQuestion: currentQuestion,
    letter: letter,
  };
  fetch("/api/storeResponse", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function storeEmail(email) {
  console.log("I am at storeEmail()");
  let userData = {
    email: email,
  };
  fetch("/api/storeEmail", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function sendEmail(email, skin_type, acne_prone, sun_sensitive) {
  console.log("I am at sendEmail()");
  let userData = {
    email: email,
    skin_type,
    acne_prone,
    sun_sensitive
  };
  fetch("/api/sendEmail", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function Test() {
  // Declaration of variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
    );
  }

  // When a test option is clicked
  const handleAnswer = (option) => {
    console.log("I am at handleAnswer");
    const index = options.indexOf(option);
    const letter = String.fromCharCode(index + 65);
    setAnswers([...answers, letter]);
    storeResponse(currentQuestion, letter);
    setCurrentQuestion(currentQuestion + 1);
  };

  // When email form is submitted
  const handleEmailSubmit = (event) => {
    console.log("I am  at handleEmailSubmit");
    event.preventDefault();
    storeEmail(email);
    console.log(email);
    setEmailSubmitted(true);
  };

  // When email input is changed
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Goes back 1 question
  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
    setAnswers(answers.slice(0, -1));
  };

  // Process a get request to /api/getResults and return the JSON result
  function getAnswers() {
    return fetch("/api/getResults", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  // Process the answers and return the final result
  const processAnswers = (answers) => {
    let skin_type, acne_prone, sun_sensitive;

    getAnswers()
      .then((data) => {
        // Get answers to each question
        const q1 = answers[0]
        const q2 = answers[1]
        const q3 = answers[2]
        const q4 = answers[3]
        const q5 = answers[4]

        console.log("I GOTTTT q1", q1);
        console.log("I GOTTTT q2", q2);
        console.log("I GOTTTT q3", q3);
        console.log("I GOTTTT q4", q4);
        console.log("I GOTTTT q5", q5);

        if (q1 === "A") {
          if (q2 === "C" || q2 === "D") {
            skin_type = "Dry";
            console.log("SKIN TYPE ISSSS:", skin_type);
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

        setSkinType(skin_type);
        setAcneProne(acne_prone);
        setSunSensitive(sun_sensitive);

        console.log("Results stored as:", skin_type, acne_prone, sun_sensitive);
        sendEmail(email, skin_type, acne_prone, sun_sensitive);

      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    // Return results if email has been submitted
    return (
      <div>
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
    );
  };

  // When all questions have been asked
  if (currentQuestion >= questions.length) {
    if (!emailSubmitted) {
      return (
        <div>
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
      return <div>{processAnswers(answers)}</div>;
    }
  }

  // Render the current question and options
  const { question, options } = questions[currentQuestion];

  // Display the current question and options
  return (
    <div className="flex rounded-lg bg-emerald-900 m-8 mx-20">
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
      </div>
    </div>
  );
}

export default Test;
