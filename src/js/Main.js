import { Button, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from "./theme";

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
    question: "Have you ever had a sunburn or noticed pigmentation changes after sun exposure?",
    options: ["Yes", "No"],
  },
];

function Test() {
  // Declaration of variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState([]);

  // When the start test button is clicked
  const handleStartTest = () => {
    setShowTest(true);
  };


  // Landing page shown before the test starts
  if (!showTest) {
    return (
      <div className="flex flex-row justify-center">
        <ThemeProvider theme={theme}>
          <button onClick={handleStartTest}>Start Test</button>
        </ThemeProvider>
      </div>
    );
  }

  // When a test option is clicked
  const handleAnswer = (option) => {
    const index = options.indexOf(option);
    const letter = String.fromCharCode(index + 65);
    setAnswers([...answers, letter]);
    setCurrentQuestion(currentQuestion + 1);
  };

  // When email form is submitted
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    console.log(email);
  };

  // When email input is changed
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Process the answers and return the final result
  const processAnswers = (answers) => {
    // Get answers to each question
    const q1 = answers[0]
    const q2 = answers[1]
    const q3 = answers[2]
    const q4 = answers[3]
    const q5 = answers[4]
    let skin_type, acne_prone, sun_sensitive;
  
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
  
    // Return results
    return (
      <div>
        <p>
          Thank you for answering the questions!<br/>
          Here's your assessment:<br/>
          Skin Type: {skin_type}<br/>
          Acne Prone: {acne_prone}<br/>
          Sun-Sensitive: {sun_sensitive}<br/>
          If you have any more questions or need further assistance, feel free to ask!<br/>
        </p>
      </div>
    );
  };

  // When all questions have been asked
  if (currentQuestion >= questions.length) {
    return (
      <div>
        {processAnswers(answers)}
        <h2>Want to save your result? We'll gladly email you</h2>
        <form onSubmit={handleEmailSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  // Render the current question and options
  const { question, options } = questions[currentQuestion];

  // Display the current question and options
  return (
    <div>
      <h2>{question}</h2>
      <ul>
      {options.map((option) => (
        <li key={option}>
          <button onClick={() => handleAnswer(option)}>{option}</button>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default Test;
