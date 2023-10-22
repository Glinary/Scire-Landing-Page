import { Button, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from "./theme";

const questions = [
  {
    question:
      "If you wash your face and don't apply any products, how does your skin behave 30 minutes after?",
    options: [
      "It feels dry",
      "It feels calm, smooth, and soft",
      "It feels uneven (oily in some parts and dry on the other parts)",
      'It feels shiny and oily"',
    ],
  },
  {
    question: "What does your skin typically look like at the end of the day?",
    options: [
      "My forehead and nose are very shiny and oily but my cheeks are matte.",
      "Crazy oily.",
      "Dull and tired. It feels mostly dry.",
      "It looks normal. Not overly dry or oily.",
    ],
  },
];

function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [email, setEmail] = useState("");

  const handleAnswer = (answer) => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleStartTest = () => {
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

  // When email form is submitted
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    console.log(email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // When all questions have been asked
  if (currentQuestion >= questions.length) {
    return (
      <div>
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

  const { question, options } = questions[currentQuestion];

  // Display questions
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
        </div>
      </div>
    </div>
  );
}

export default Test;
